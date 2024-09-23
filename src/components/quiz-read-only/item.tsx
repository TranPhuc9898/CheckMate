import React, { useState, useCallback } from "react";
import { TouchableOpacity, ScrollView, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
import { LocalizationContext } from "@src/libs/context";
import { Box, Text, Button } from "@src/components";
import styles from "./styles";
import { colors, spacing } from "libs/theme";
import YoutubePlayer, { stateProps } from "@src/components/youtube-player";
import Video from "components/video-player";

const { width } = Dimensions.get("window");
const WIDTH_PLAYER = width - spacing.l * 4;
const HEIGT_PLAYER = Math.round(WIDTH_PLAYER / (16 / 9)); //Tỉ lệ 16:9

const QuizItem = ({ quiz, currentIndex, setDisabledButtonNext }) => {
  // hiển thị nội dung của video
  const [isShowContent, setIsShowContent] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

  const I18n = React.useContext(LocalizationContext);

  const onChangeState = useCallback((state) => {
    if (state === stateProps.ended) {
      setDisabledButton(false);
    }
  }, []);

  const onShowSummary = useCallback(() => {
    // Mở nội dung tóm tắt
    setIsShowContent(true);
    // Mở nút tiếp tục để qua bài mới
    setDisabledButtonNext(false);
  }, []);

  const renderVideo = () => {
    return (
      <Box style={styles.video}>
        <YoutubePlayer
          height={HEIGT_PLAYER}
          width={WIDTH_PLAYER}
          videoId={quiz?.youtubeVideoId}
          onChangeState={onChangeState}
        />
      </Box>
    );
  };

  const renderContent = () => {
    return (
      <Box center>
        {/* Nội dung của video */}
        {isShowContent ? (
          <Animatable.View
            animation={"flipInY"}
            useNativeDriver
            duration={700}
          >
            <Box>
              <Text
                bold
                center
                style={styles.txtSummary}
                color="secondary"
              >
                {I18n.t("TRAINING_INPUT.SUMMARY").toUpperCase()}
              </Text>
              <Text style={styles.txtContent}>{quiz?.content}</Text>
            </Box>
          </Animatable.View>
        ) : (
          // Hiện nút xem tóm tắt
          <Box center>
            <Text
              color="primary"
              italic
              center
              style={styles.txtSeeVideo}
            >
              {I18n.t("TRAINING_INPUT.DESCRIPTION_PLAY_VIDEO")}
            </Text>
            <Button
              title={I18n.t("TRAINING_INPUT.SUMMARY")}
              onPress={() => onShowSummary()}
              disabled={disabledButton}
            />
          </Box>
        )}
      </Box>
    );
  };

  return (
    <ScrollView>
      <Box>
        <Text bold>{`${currentIndex + 1}. ${quiz?.question}`}</Text>
      </Box>
      {renderVideo()}
      {renderContent()}
    </ScrollView>
  );
};

export default QuizItem;
