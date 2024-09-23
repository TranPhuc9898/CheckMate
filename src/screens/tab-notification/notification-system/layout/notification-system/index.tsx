import { Box, Card, Divider, Image, MarkDown, Text } from "components";
import { LocalizationContext } from "libs/context";
import { handleNotification } from "libs/helper";
import _ from "lodash";
import { useContext, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Pagination } from "react-native-snap-carousel";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import { store } from "redux/store";
import { setListNotificationSystem } from "screens/tab-notification/slice";
import CarouselNotification from "../../component/carousel";
import styles, { ITEM_WIDTH, SLIDER_WIDTH } from "./styles";
import readNotificationAPI, { IParamNotificationIsRead } from "apis/notification/read-notification";

interface INotificationSystem {
  description?: string;
  image?: string;
  navigateTo?: string;
  title?: string;
  _id: string;
  isRead?: boolean;
  thumbnail?: string;
}

const IMAGE_EMPTY = require("@src/assets/images/thumbnail-default.png");

// Screen Carousel
const NotificationSystem = () => {
  const { listNotificationSystem } = useSelector(
    (state: RootState) => state.notification
  );
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
  const I18n = useContext(LocalizationContext);

  // Render Image
  const renderImage = (image) => {
    // Check image
    if (image) {
      return { uri: image };
    }
    return IMAGE_EMPTY;
  };

  const _onPressItemNotification = async (notify: any) => {
    // Điều hướng thông báo
    handleNotification(notify);
    // Nếu không có _id hoặc đã đọc rồi-> kết thúc
    if (!notify?._id || notify?.isRead) {
      return;
    }
    // Kiểm tra vị trí thông báo ở local
    const index = listNotificationSystem?.findIndex((item) => item?._id === notify?._id);
    // Đánh dấu đã đọc
    if (index !== -1) {
      let notificationSystemClone = _.cloneDeep(listNotificationSystem);
      notificationSystemClone[index].isRead = true;
      store.dispatch(setListNotificationSystem(notificationSystemClone));
    }
    const params: IParamNotificationIsRead = {
      notificationId: notify?._id,
    };
    // Gọi api đánh dấu đã đọc
    await readNotificationAPI(params.notificationId);
    return;
  }

  // _Render Item
  const _renderItem = ({
    item,
    index,
  }: {
    item: INotificationSystem;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => _onPressItemNotification(item)}
        key={index}
        testID={"btnNotificationSystem_" + index}
        style={styles.wrapItemNotifySystem}
      >
        <Box row alignCenter>
          {/*  Image */}
          <Box center style={styles.wrapImage}>
            <Image
              source={renderImage(item?.thumbnail)}
              style={styles.image}
            />
          </Box>
          {/* Text  */}
          <Box
            flex
            style={styles.text}
          >
            <Text
              color={Boolean(item?.isRead) ? "grey1" : "black"}
              variant="h4"
              numberOfLines={2}
            >
              {item.title || I18n.t("NOTIFICATION.TAB_NOTIFICATION")}
            </Text>
            <Box style={styles.wrapContentNotificationSystem}>
              {/* <MarkDown
                text={item.description}
                textStyle={Boolean(item?.isRead) ? styles.txtMarkDownRead : styles.txtMarkDown}
              /> */}
              <Text numberOfLines={2} style={Boolean(item?.isRead) ? styles.txtMarkDownRead : styles.txtMarkDown}>{item.description}</Text>
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>
    );
  };

  // Check empty data
  if (_.isEmpty(listNotificationSystem)) {
    return null;
  }

  return (
    <Card
      flex
      style={styles.cardStyle}
    >
      <Text bold style={styles.txtTitle}>
        {I18n.t("NOTIFICATION.SYSTEM_NOTIFICATION")}
      </Text>

      {/* Gạch Ngang */}
      <Divider
        style={styles.dividerStyle}
      />
      <CarouselNotification
        ref={isCarousel}
        data={listNotificationSystem}
        renderItem={_renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        itemHeight={ITEM_WIDTH}
      />
      {/* Dot */}
      <Box style={styles.pagination}>
        <Pagination
          containerStyle={styles.containerStylePagination}
          dotsLength={listNotificationSystem?.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={styles.dotStyle}
          tappableDots={false}
          inactiveDotStyle={styles.inactiveDotStyle}
          inactiveDotOpacity={0.2}
          inactiveDotScale={0.9}
        />
      </Box>
    </Card>
  );
};

export default NotificationSystem;
