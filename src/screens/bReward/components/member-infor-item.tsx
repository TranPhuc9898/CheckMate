import React from "react";
import { TouchableOpacity } from "react-native";
import { Box, Card, Image, Text } from "@src/components";
import styles from "../layout/styles";

interface IMemberInforItem {
  onPress?: any;
  title?: string;
  action?: string;
  image?: any;
  testID?: string;
}

const MemberInforItem: React.FC<IMemberInforItem> = ({
  title,
  action,
  image,
  onPress,
  testID
}) => {

  return (
    <Card>
      <Box row between>
        <Box between>
          <Text bold>{title}</Text>
          <Box row>
            <TouchableOpacity
              testID={testID}
              onPress={onPress}
              style={styles.btnAction}
            >
              <Text
                bold
                fontSize="m"
                color="white"
              >
                {action}
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
        {image ? (
          <Image
            source={image}
            style={styles.imageInfoItem}
          />
        ) : null}
      </Box>
    </Card>
  );
};

export default MemberInforItem;
