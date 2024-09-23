import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import "react-native-get-random-values";
// Component
import { Alert, Box, Container, Image, Text, Websocket } from "@src/components";
import {
  ASKER,
  BLACK_COLOR,
  CHAT_LEFT_COLOR,
  CHAT_RIGHT_COLOR,
  TASKER,
} from "@src/libs/constants/index";
import { colors, spacing } from "@src/libs/theme";
import { LocalizationContext } from "libs/context";
import {
  formatDate,
  getAvatar,
  getUserIdGlobal,
  handleError,
} from "libs/helper";
import { setLoading } from "redux/slice/app-slice";
import { trackingViewChat } from "@src/libs/tracking/track-clever-tap";

import HeaderChat from "./component/header-chat";
// Screen
import CustomView from "./custom-view";
import SendImage from "./send-image";
import SendLocation from "./send-location";
// Lib
import { IRespond } from "libs/helper";
import _ from "lodash";
import config from "react-native-config";
import {
  Bubble,
  Composer,
  GiftedChat,
  Message,
  MessageText,
  Send,
  Time,
} from "react-native-gifted-chat";

import { v4 as uuidv4 } from "uuid";
// API
import getAPIChat from "apis/chat/get-chat-message";
import styles from "./styles";

import translatedChat from "apis/chat/translated-chat-message";
import Icon from "components/icon";
import BtnSuggestMessage from "screens/chat/layout/component/suggest-message-chat";
import getSendChat, { IParamSendChat } from "apis/chat/send-message";
import { store } from "redux/store";
import { getBottomSpace } from "react-native-iphone-x-helper";
import getEndPoint from "apis/socket/chat";
import HeaderSystem from "components/header-system";
import ContentModalCall from "screens/task-detail/layout/components/content-modal-call";
import moment from "moment";

const ChatScreen = (props) => {
  // Use From Redux
  // Init Hook
  const [messages, setMessages] = useState<any>([]);

  const [respond, setRespond] = useState<IRespond>({});
  const wSRef = useRef();
  const [translatingArr, setTranslatingArr] = useState([]); // To know which message is processing

  // dataRespond if data respond error go to screen empty just show alert Otherwise go to screen chat detail
  const [dataRespond, setDataRespond] = useState(false);

  const { navigation } = props;
  const [isConnected, setIsConnected] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const I18n = useContext(LocalizationContext);

  // set ID
  const askerId = _.get(respond, "data.askerInfo._id", "");
  const askerName = _.get(respond, "data.askerInfo.name", "");
  const askerAvatar = _.get(respond, "data.askerInfo.avatar", "");
  const taskPlace = _.get(respond, "data.task.address", "");
  const chatId = _.get(respond, "data._id", "");
  const taskerId = _.get(respond, "data.taskerInfo._id", "");
  const taskDate = _.get(respond, "data.task.date", "");
  const taskerLang = _.get(respond, "data.taskerInfo.language", "");
  const taskerName = _.get(respond, "data.taskerInfo.name", "");
  const phone = _.get(respond, "data.task.phone", "");
  const ref = useRef(null);
  const refTask = useRef(null);
  ref.current = messages;
  refTask.current = _.get(respond, "data.task", null);
  // API
  const initDataChat = async () => {
    // Show loading
    await store.dispatch(setLoading(true));
    const respond: IRespond = await getAPIChat(props?.route?.params?.taskId);
    // Hide loading
    await store.dispatch(setLoading(false));
    if (respond?.isSuccess) {
      setDataRespond(!dataRespond);
      // Push newChat
      setRespond(respond);
    } else {
      setDataRespond(dataRespond);
      // Show lỗi và goBack khi onClosed Alert
      const onClosed = () => navigation.goBack();
      handleError(respond?.error, onClosed);
    }
  };

  useEffect(() => {
    const newMessages = [];
    if (respond) {
      respond?.data?.messages?.forEach((mess) => {
        const _temp = convertMessagesToGiftChat(mess);
        newMessages.push(_temp);
      });
      setMessages(_.reverse(newMessages));
    }
  }, [respond]);
  // Get API

  const trackingViewScreenChat = () => {
    const messageOfTasker = _.find(
      ref.current,
      (message: any) => message.from === TASKER && !message.isPreparedMessage
    );
    const params = {
      serviceName: _.get(refTask, "current.serviceName", null),
      premium: _.get(refTask, "current.isPremium", null),
      sendMessage: messageOfTasker ? true : false,
    };

    trackingViewChat(params);
  };

  useEffect(() => {
    initDataChat();
    return () => {
      trackingViewScreenChat();
    };
  }, []);

  // Lấy thông tin của user để hiển thị trên Gift Chat
  const getUserIdToGiftChat = (messages) => {
    if (messages?.from === TASKER) {
      return messages?.userId || taskerId;
    }
    return askerId;
  };

  // Convert to local GiftChat
  const convertMessagesToGiftChat = (newMessages: any) => {
    const objMessage: any = {
      _id: newMessages?._id ? newMessages._id : uuidv4(),
      text: _.get(newMessages, "message", ""),
      from: newMessages?.from || "",
      user: {
        _id: getUserIdToGiftChat(newMessages),
      },
    };
    if (newMessages?.createdAt) {
      objMessage.createdAt = newMessages.createdAt;
    }
    if (newMessages?.from === TASKER) {
      objMessage.user = {
        _id: newMessages?.userId || newMessages?.user,
        avatar: newMessages?.avatar,
      };
    }
    if (newMessages?.translatedText) {
      objMessage.translatedText = newMessages.translatedText;
    }
    if (newMessages?.image) {
      objMessage.image = newMessages.image;
    }
    if (newMessages?.location) {
      objMessage.location = newMessages?.location;
    }
    if (newMessages?.video) {
      objMessage.video = newMessages?.video;
    }
    if (newMessages?.isPreparedMessage) {
      objMessage.isPreparedMessage = newMessages?.isPreparedMessage;
    }
    return objMessage;
  };

  // Convert message to message in respond
  const convertMessagesToRespond = (newMessages: any) => {
    const objMessage: any = {
      _id: newMessages?._id ? newMessages._id : uuidv4(),
      message: _.get(newMessages, "message", ""),
      user: newMessages?.userId || askerId,
    };
    if (newMessages?.from) {
      objMessage.from = newMessages.from;
    }
    if (newMessages?.createdAt) {
      objMessage.createdAt = newMessages.createdAt || moment().toDate();
    }
    if (newMessages?.translatedText) {
      objMessage.translatedText = newMessages.translatedText;
    }
    if (newMessages?.image) {
      objMessage.image = newMessages.image;
    }
    if (newMessages?.location) {
      objMessage.location = newMessages?.location;
    }
    if (newMessages?.video) {
      objMessage.video = newMessages?.video;
    }
    return objMessage;
  };

  //Send Mess không cần
  // const onSendGiftChat = useCallback((messagesObj = []) => {
  //   setMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, messagesObj)
  //   );
  // }, []);

  const onSendWithAPI = async (messageObj) => {
    const params: IParamSendChat = {
      chatId: chatId,
      messageTo: [askerId],
      data: {
        from: "TASKER",
        to: askerId, // Asker ID nhận message
        message: messageObj.text,
        userId: getUserIdGlobal(), // Tasker ID nhắn message
        isRead: false,
        userName: taskerName,
      },
    };

    // conver to image
    if (messageObj.image) {
      params.data.image = messageObj.image;
      delete params.data.message;
    }

    // conver to location
    if (messageObj.location) {
      params.data.location = messageObj.location;
      delete params.data.message;
    }

    // convert to video
    if (messageObj.video) {
      params.data.video = messageObj.video;
      delete params.data.message;
    }
    // send with API
    const respondSendMessage: IRespond = await getSendChat(params);
    if (respondSendMessage.isSuccess) {
      // Lưu lại message mới vào response
      const conversationNew = Object.assign({}, respond);
      conversationNew?.data?.messages.push(
        convertMessagesToRespond(params?.data)
      );
      return setRespond(conversationNew);
    }
    return handleError(respondSendMessage?.error);
  };

  const onSend = useCallback(
    (newMessages = []) => {
      onSendWithAPI(newMessages[0]);
    },
    [respond?.data?._id, respond?.data?.taskerInfo]
  );

  // Show Google map with location
  const _renderCustomView = (props) => {
    return <CustomView {...props} />;
  };

  const renderSend = () => {
    return <Box></Box>;
  };

  // Render Color-Text for TASKER,ASKER
  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: CHAT_LEFT_COLOR,
          },
          right: {
            backgroundColor: CHAT_RIGHT_COLOR,
          },
        }}
      />
    );
  };
  // Render Time For TASKER,ASKER
  const renderTime = (props: any) => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: {
            color: BLACK_COLOR,
            textAlign: "right", // or position: 'right'
          },
          right: {
            color: BLACK_COLOR,
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return (
      <Icon
        name={"doubleDown"}
        size="l"
        color="black"
      />
    );
  };

  // Hiển thị các option camera, ảnh, vị trí theo từng trường hợp
  const renderOptionSendChat = (text: string) => {
    // Nếu nhật text -> show icon chatRight
    if (text) {
      return (
        <Box center>
          <Icon
            name="chatRight"
            color="primary"
            size="xxl"
          />
        </Box>
      );
    }
    // Hiển thị suggest -> null
    if (showSuggestions) {
      return null;
    }
    // Hiển thị 3 option camera, ảnh, vị trí
    return (
      <Box
        row
        center
        style={{
          paddingTop: spacing.l,
        }}
      >
        <SendImage
          isUsedCamera={true}
          onSendWithAPI={onSendWithAPI}
          config={config}
          user={taskerId}
        />
        <SendImage
          isUsedCamera={false}
          onSendWithAPI={onSendWithAPI}
          config={config}
          user={taskerId}
        />
        <SendLocation
          onSend={onSend}
          user={taskerId}
        />
      </Box>
    );
  };

  // Render BottomBar in Gifted Chat
  const renderInput = (props: any) => {
    return (
      <Box
        flex
        row
        center
        style={[
          {
            padding: spacing.l,
            paddingBottom: getBottomSpace()
              ? getBottomSpace() - spacing.s
              : spacing.l,
          },
          {
            flexDirection: showSuggestions ? "column" : "row",
            alignItems: showSuggestions ? "flex-end" : null,
          },
        ]}
      >
        {/* Function in  Mess (Camera,Picture,Location) */}
        {renderOptionSendChat(props?.text)}
        {!showSuggestions ? (
          //render TextInPut
          <Composer
            {...props}
            inlineImageLeft="ic_menu_black_24dp"
            inlineImagePadding={50}
            composerHeight={null}
            placeholder={I18n.t("CHAT.TYPE_A_MESSAGE")}
            textInputStyle={styles.composerStyle}
          />
        ) : null}
        <Box
          center
          style={styles.containerIconSuggest}
        >
          {!props.text ? (
            <TouchableOpacity
              testID={"btnSeeMessageSuggestion"}
              onPress={() => setShowSuggestions(!showSuggestions)}
              style={styles.wrap_iconPlus}
            >
              <Icon
                name={showSuggestions ? "keyboard" : "messageDot"}
                color="primary"
                size="xxl"
              />
            </TouchableOpacity>
          ) : null}
        </Box>
        {/* Button Send Mess */}
        <Box
          center
          style={styles.boxIconSend}
        >
          {props?.text?.trim().length > 0 ? (
            <Send {...props}>
              <Icon
                name="chatSend"
                color="primary"
                size="xxl"
              />
            </Send>
          ) : null}
        </Box>
        {/* Quick Mess */}
        {showSuggestions ? (
          <Box flex>
            {/* Suggestion Mess */}
            <BtnSuggestMessage
              onSend={onSend}
              setShowSuggestions={setShowSuggestions}
            />
          </Box>
        ) : null}
      </Box>
    );
  };

  // TransLateButton and CallAPI TrasnLate
  // Translate Button
  const _renderTranslateButton = (currentMessage) => {
    // Message had translate, no render button translate
    if (
      currentMessage?.translatedText ||
      currentMessage?.image ||
      currentMessage.video ||
      currentMessage.location
    ) {
      return null;
    }
    // let btnTitle = I18n.t("TRANSLATE_TO", { t: I18n.t(languageTasker.key) });
    let btnTitle = I18n.t(`CHOOSE_LANGUAGE.${taskerLang.toUpperCase()}`);
    const checkExist = _.findIndex(
      translatingArr,
      (e) => e == currentMessage?._id
    );
    if (checkExist !== -1) {
      btnTitle = I18n.t("CHAT.TRANSLATING");
    }

    return (
      <Box
        style={{
          alignSelf: "flex-start",
          paddingRight: spacing.m,
        }}
      >
        <TouchableOpacity
          onPress={() => _onPressTranslate(currentMessage)}
          style={styles.btnTranslateContainer}
        >
          <Text
            fontSize="m"
            color={"primary"}
          >
            {btnTitle}
          </Text>
        </TouchableOpacity>
      </Box>
    );
  };

  const _renderMessage = (props: any) => {
    const { currentMessage } = props;
    return (
      <Box>
        <Message {...props} />
        {/* Nếu tin nhắn từ ASKER và Ngôn ngữ của Asker khác ngôn ngữ hiện tại của Tasker thì hiển thị Nút Dịch */}
        {currentMessage?.from === ASKER &&
        I18n.locale !== respond?.data?.askerInfo?.language
          ? _renderTranslateButton(currentMessage)
          : null}
      </Box>
    );
  };

  const _renderMessageTranslate = (text) => {
    // Had message translate, render text translated
    return (
      <Box style={{ marginLeft: 10 }}>
        <Text style={styles.txtMessageTranslate}>{text}</Text>
      </Box>
    );
  };

  const _renderMessageText = (props) => {
    const { currentMessage } = props;
    return (
      <Box>
        <MessageText
          {...props}
          textStyle={{
            left: {
              color: BLACK_COLOR,
              allowFontScaling: false, // Disable font scaling
            },
            right: {
              color: BLACK_COLOR,
              allowFontScaling: false, // Disable font scaling
            },
          }} />
        {currentMessage?.translatedText && currentMessage?.from === ASKER
          ? _renderMessageTranslate(currentMessage.translatedText)
          : null}
      </Box>
    );
  };

  // Function to TransLate
  const _onPressTranslate = async (currentMessage) => {
    if (currentMessage?.text && currentMessage?._id && chatId) {
      setTranslatingArr([...translatingArr, [currentMessage?._id]]);
      const params = {
        chatId: chatId,
        text: currentMessage.text,
        messageId: currentMessage?._id,
      };
      const respondChat: IRespond = await translatedChat(
        params.chatId,
        params.text,
        params.messageId
      );

      if (respondChat && respondChat?.data?.translatedText) {
        const conversationNew = Object.assign({}, respond);

        const messageNewArr = [...conversationNew.data.messages];

        // Get index message in array

        const messageIndex = _.findIndex(messageNewArr, {
          _id: currentMessage?._id,
        });

        if (messageIndex !== -1) {
          // Update translatedText from google translate Api
          messageNewArr[messageIndex].translatedText =
            respondChat?.data?.translatedText;
          // Update messages newest to conversation
          conversationNew.data.messages = messageNewArr;

          // Update conversation
          setRespond(conversationNew);
        }
      } else {
        // translate error
        const translatingNewArr = [...translatingArr];
        // Remove id from arr translating
        _.remove(translatingNewArr, (e) => e == currentMessage?._id);
        setTranslatingArr(translatingNewArr);
      }
    }
  };

  const _onCall = () => {
    return Alert.alert.open({
      title: "TASK_DETAIL.TITLE_MODAL_CALL",
      message: <ContentModalCall phone={phone} />,
      actions: null,
    });
  };

  return (
    <Box flex>
      {dataRespond ? (
        <Container
          style={{ flex: 1 }}
          headerShow={false}
        >
          <HeaderSystem
            navigation={props?.navigation}
            headerTitle={I18n.t("CHAT.TITLE")}
            headerIcon={"phoneCall"}
            onPress={_onCall}
          />
          <HeaderChat
            item={respond?.data?.task}
            nameAsker={askerName}
            taskPlace={taskPlace}
            date={formatDate(taskDate, "date")}
          />

          <GiftedChat
            wrapInSafeArea={false}
            messages={messages}
            renderSend={() => renderSend()}
            renderTime={renderTime}
            renderBubble={renderBubble}
            renderAvatarOnTop={true}
            renderMessage={_renderMessage}
            renderMessageText={_renderMessageText}
            // render Tab Input
            renderComposer={(compose) => renderInput(compose)}
            /* Important ID if app TASKER (TASKER_ID) ASKER (ASKER_ID) */
            user={{
              _id: taskerId,
            }}
            renderAvatar={() => (
              <Image
                style={styles.avatar}
                source={getAvatar(askerAvatar)}
              />
            )}
            optionTintColor={colors.primary}
            scrollToBottomComponent={scrollToBottomComponent}
            showUserAvatar={false}
            onSend={onSend}
            quickReplyStyle={{ borderRadius: 2 }}
            quickReplyTextStyle={{
              fontWeight: "200",
            }}
            renderCustomView={_renderCustomView}
            keyboardShouldPersistTaps="never"
            scrollToBottom={true}
            infiniteScroll={true}
            alwaysShowSend={true}
            isCustomViewBottom
            minInputToolbarHeight={75}
            listViewProps={{
              contentContainerStyle: styles.listViewPropStyle,
            }}
            messagesContainerStyle={styles.messageContainerStyle}
          />
        </Container>
      ) : (
        <Container>
          <Box></Box>
        </Container>
      )}

      {/* Text Socket */}
      <Websocket
        ref={wSRef}
        url={getEndPoint()}
        onOpen={() => {
          setIsConnected(true);
        }}
        onMessage={(e: any) => {
          if (!e?.data || typeof e?.data !== "string") {
            return;
          }
          const mess: any = JSON.parse(e.data);
          setMessages((previousMessages) =>
            GiftedChat.append(
              previousMessages,
              convertMessagesToGiftChat(mess?.data)
            )
          );
          const conversationNew = Object.assign({}, respond);
          conversationNew?.data?.messages.push(
            convertMessagesToRespond(mess?.data)
          );
          setRespond(conversationNew);
        }}
        onError={(e) => {
          setIsConnected(false);
        }}
        onClose={(e) => {
          setIsConnected(false);
        }}
        reconnect // Will try to reconnect onClose
      />
    </Box>
  );
};
export default ChatScreen;
