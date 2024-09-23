/**
 * @author Duc Anh Pham
 * @email ducanh.pham@btaskee.com
 * @create date 2023-03-29 17:26
 * @modify date 2023-03-29 17:26
 * @desc [description]
 */

import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

import { colors, spacing } from "libs/theme";
import Box from "components/box";
import styles from "./styles";

export const stateProps = {
  ended: "ended",
  paused: "paused",
  playing: "playing",
  buffering: "buffering",
  videoCue: "video cue",
  unstarted: "unstarted",
}

interface IProps {
  /**
   * width
   */
  width?: number;
  /**
   * height
   */
  height: number;
  videoId: string;
  onChangeState: (state: keyof typeof stateProps) => void;
}
/**
 * ### Props
 * - width
 * - height
 * - onChangeState: function(event: string): ended, paused, playing, buffering, video cue, unstarted
 * - videoId
 */
const Youtube = ({ width, height, onChangeState, videoId }: IProps) => {
  const [onReady, setOnReady] = useState(false);
  return (
    <Box style={[styles.container, { width, height }]}>
      {onReady ? null : (
        <Box
          center
          style={styles.loading}
        >
          <ActivityIndicator
            size="large"
            color={colors.white}
          />
        </Box>
      )}

      <YoutubePlayer
        height={height}
        width={width}
        videoId={videoId}
        onChangeState={onChangeState}
        webViewStyle={{ opacity: 0.99 }}
        onReady={() => setOnReady(true)}
      />
    </Box>
  );
};

export default Youtube;
