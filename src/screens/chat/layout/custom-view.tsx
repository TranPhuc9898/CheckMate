import {
  Linking,
  Platform,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";

// Lib
import Icon from "react-native-vector-icons/FontAwesome5";
import { isIOS } from "libs/helper";
import MapView, { Marker } from "react-native-maps";
import { PRIMARY0_COLOR } from "libs/constants";
import React from "react";
export default class CustomView extends React.Component<{
  currentMessage: any;
  containerStyle: StyleProp<ViewStyle>;
  mapViewStyle: StyleProp<ViewStyle>;
}> {
  static defaultProps = {
    currentMessage: {},
    containerStyle: {},
    mapViewStyle: {},
  };

  openMapAsync = async () => {
    const { currentMessage: { location = {} } = {} } = this.props;
    // open google map
    const url = Platform.select({
      ios: `comgooglemaps://?center=${location.latitude},${location.longitude}&q=${location.latitude},${location.longitude}&zoom=14&views=traffic"`,
      android: `geo://?q=${location.latitude},${location.longitude}`,
    });
    Linking.canOpenURL(url).then((canOpen) => {
      if (canOpen) {
        Linking.openURL(url);
      } else if (isIOS) {
        // open apple map
        Linking.openURL(
          `maps:0,0?q=${location.latitude},${location.longitude}`
        );
      } else {
        // open web
        Linking.openURL(
          `http://maps.google.com/?q=${location.latitude},${location.longitude}`
        );
      }
    });
  };

  render() {
    const { currentMessage, containerStyle, mapViewStyle } = this.props;
    if (currentMessage.location) {
      return (
        <MapView
          style={[styles.mapView, mapViewStyle]}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.003,
          }}
          provider="google"
          loadingEnabled={true}
          onPress={this.openMapAsync}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <Marker
            coordinate={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
            }}
          >
            <Icon
              name="map-marker-alt"
              size={20}
              color={PRIMARY0_COLOR}
            />
          </Marker>
        </MapView>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
});
