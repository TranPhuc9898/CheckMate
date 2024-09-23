/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-13 10:32:17
 * @modify date 2022-10-13 10:32:17
 * @desc [Show type house and duration]
 */

import { useContext, useEffect, useState } from "react";
import { Box, Container, Icon, Image, Text } from "@src/components";
import { LocalizationContext } from "libs/context";
import { FlatList, ImageBackground, Modal, TouchableOpacity } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import styles from "./styles";
import { isEmpty } from "lodash";

const numColumns = 2;

const RoomDetail = ({ route }) => {
  const I18n = useContext(LocalizationContext);
  const { roomDetail } = route?.params;
  const [showImageFull, setShowImageFull] = useState(false);
  const [imagesZoom, setImagesZoom] = useState([]);
  const [key, setKey] = useState(0);

  // Format data image
  useEffect(() => {
    let imagesNew = [];
    roomDetail?.images?.map((element, index) => {
      imagesNew.push({
        url: element,
        key: index,
      });
    });
    setImagesZoom(imagesNew);
  }, []);

  // Render image full
  const _renderItem = ({ source }) => {
    return (
      <Box flex>
        <Image
          source={{
            uri: source?.uri,
          }}
          style={styles.imageFull}
        />
      </Box>
    );
  };

  if (isEmpty(roomDetail)) {
    return null;
  }

  return (
    <Container headerShow={true}>
      <Box flex>
        {/* Background image */}
        <ImageBackground
          source={{
            uri: roomDetail?.images ? roomDetail?.images[0] : null,
          }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <Box
            flex
            margin="m"
            style={styles.flexEnd}
          >
            {/* Content room */}
            <Box style={styles.contentRoom}>
              <Text
                bold
                color="primary"
                style={styles.roomName}
              >
                {I18n.t("TASK_DETAIL.NAME_ROOM", { t: roomDetail?.name })}
              </Text>
              <Text color="white">
                {I18n.t("TASK_DETAIL.AREA_ROOM", { t: roomDetail?.area })}
              </Text>
              {roomDetail?.note ? (
                <Text color="white">
                  {I18n.t("TASK_DETAIL.NOTE_ROOM", { t: roomDetail?.note })}
                </Text>
              ) : null}
            </Box>
          </Box>
        </ImageBackground>
        <Box flex>
          <FlatList
            data={imagesZoom}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <TouchableOpacity
                testID={`itemImage${item.key}`}
                onPress={() => {
                  setShowImageFull(true);
                  setKey(item?.key);
                }}
                style={styles.imageFlatList}
              >
                <Image
                  source={{ uri: item.url }}
                  style={styles.imageFull}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
            numColumns={numColumns}
          />
        </Box>
      </Box>
      {/* See image full */}
      <Modal
        visible={showImageFull}
        transparent={true}
      >
        <ImageViewer
          renderArrowRight={() => <Icon name="right" />}
          renderArrowLeft={() => <Icon name="left" />}
          enablePreload={true}
          enableSwipeDown={true}
          onCancel={() => setShowImageFull(false)}
          index={key}
          renderImage={_renderItem}
          imageUrls={imagesZoom}
        />

        <TouchableOpacity
          testID="iconClose"
          style={styles.iconCloseStyle}
          onPress={() => setShowImageFull(false)}
        >
          <Icon name="cancel" />
        </TouchableOpacity>
      </Modal>
    </Container>
  );
};

export default RoomDetail;
