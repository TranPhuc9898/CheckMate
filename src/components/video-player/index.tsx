/**
 * @author Duc Anh Pham
 * @email ducanh.pham@btaskee.com
 * @create date 2023-03-29 17:26
 * @modify date 2023-03-29 17:26
 * @desc [description]
 */

import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import Video from "react-native-video";

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
};

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
const VideoPlayer = ({ width, height, onLoad, onEnd }: IProps) => {
  const [onReady, setOnReady] = useState(false);
  const onError = (err) => {
    alert(JSON.stringify(err))
  }

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

      <Video
        source={{ uri: "http://localhost:3000/videos/null" }} // Can be a URL or a local file.
        ref={(ref) => {
          this.player = ref;
        }} // Store reference
        onBuffer={this.onBuffer} // Callback when remote video is buffering
        onError={onError} // Callback when video cannot be loaded
        onLoad={() => setOnReady(true)}
        onEnd={onEnd}
        style={styles.backgroundVideo}
      />
    </Box>
  );
};

export default VideoPlayer;
