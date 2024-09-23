import { useEffect, useState } from "react";
import WebView from "react-native-webview/index";
import _ from "lodash";
import { Container } from "components";
import { ActivityIndicator } from "react-native";
import styles from "./styles";
import { colors } from "libs/theme";
import Spin from "./spin";

export default function ({ navigation, route }) {
  const title = _.get(route, "params.title", null);
  const uri = _.get(route, "params.url", null);
  const [process, setProcess] = useState(0);

  useEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation]);

  const ActivityIndicatorElement = () => {
    return (
      <ActivityIndicator
        color={colors.primary}
        size="large"
        style={styles.activityContainer}
      />
    );
  };
  return (
    <Container isFullScreen>
      <WebView
        source={{ uri }}
        useWebKit={true}
        javaScriptEnabled={true}
        javaScriptEnabledAndroid
        renderLoading={ActivityIndicatorElement}
        startInLoadingState={true}
        domStorageEnabled={true}
        onLoadProgress={({ nativeEvent }) => {
          setProcess(nativeEvent.progress);
        }}
      />
      <Spin process={process}/>
    </Container> 
  );
}
