import React, { useState, useCallback } from "react";
import { Dimensions } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { Box, Text, Button } from "@src/components";
import styles from "./styles";
import { spacing } from "libs/theme";
import YoutubePlayer, { stateProps } from "@src/components/youtube-player";
import _ from "lodash";

const { width } = Dimensions.get("window");
const WIDTH_PLAYER = width - spacing.l * 4;
const HEIGT_PLAYER = Math.round(WIDTH_PLAYER / (16 / 9)); //Tỉ lệ 16:9

interface VideoTest {
  youtubeVideoId: string;
}

interface IProps {
  data: [VideoTest] | [];
}

const Video = ({ data }: IProps) => {
  const [seenVideo, setSeenVideo] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

  const I18n = React.useContext(LocalizationContext);

  const onChangeState = useCallback((state) => {
    if (state === stateProps.ended) {
      setDisabledButton(false);
    }
  }, []);
  // Lấy youtubeVideoId trong list đầu tiên, chỉ hỗ trợ xem 1 video
  const youtubeVideoId = _.get(data, "[0].youtubeVideoId", "");

  if (!youtubeVideoId) {
    return null;
  }
  // Đã xem hết video
  if (seenVideo) {
    return null;
  }

  return (
    <Box style={styles.video}>
      <YoutubePlayer
        height={HEIGT_PLAYER}
        width={WIDTH_PLAYER}
        videoId={youtubeVideoId}
        onChangeState={onChangeState}
      />
      <Text
        style={styles.txtDescriptionVideo}
        center
        italic
        color="primary"
      >
        {I18n.t("TRAINING_INPUT.DES_SEE_TEST")}
      </Text>
      <Button
        size="md"
        style={styles.btnTakeTest}
        disabled={disabledButton}
        title={I18n.t("TRAINING_INPUT.TAKE_THE_TEST")}
        onPress={() => setSeenVideo(true)}
      />
    </Box>
  );
};

export default Video;
