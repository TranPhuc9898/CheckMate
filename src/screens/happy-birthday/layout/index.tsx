import { Box, Card, Container, Image, Text } from "components";
import { FC, useEffect } from "react";
import styles from "./styles";
import { ScrollView } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
const imageHappyBirthday = require("@src/assets/images/alert/happy-birthday.png");
import Sound from "react-native-sound";
import readNotificationAPI from "apis/notification/read-notification";
import _ from "lodash";

const HappyBirthdayTasker: FC<{ route: any }> = ({ route }) => {
  const description = route?.params?.data.description;
  const notifyId = route?.params?.data._id;

  const setReadNotification = async () => {
    return await readNotificationAPI(notifyId);
  };

  useEffect(() => {
    // Read notification happy birthday
    setReadNotification();
  }, []);

  useEffect(() => {
    var sound = new Sound("happybirthday.mp3", Sound.MAIN_BUNDLE, (error) => {
      // Play the sound with an onEnd callback
      sound.play();
    });
    // Reduce the volume by half
    sound.setVolume(0.5);
    return () => {
      sound.stop();
    }
  })
  return (
    <Container headerShow={true}>
      <Card flex>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <Box flex center>
            <Image
              source={imageHappyBirthday}
              style={styles.imageStyle}
            />
            <Text>{_.isEmpty(description) ? null : description}</Text>
          </Box>
        </ScrollView>
        <ConfettiCannon
          count={100}
          origin={{ x: 0, y: -10 }}
        />
      </Card>
    </Container>
  )
}
export default HappyBirthdayTasker;