import { store } from "redux/store";
import { RootState } from "redux/slice";
import { useSelector } from "react-redux";
import { useContext, useEffect, useRef, useState } from "react";
import { LocalizationContext } from "libs/context";
import { hideModalAlert } from "redux/slice/app-slice";
import { Button, Box, Text } from "components";
import Lottie from "components/lottie";
import Sound from "react-native-sound";
import styles, { width } from "./styles";
import InfoLevel from "./components/info-level";
import BonusDetail from "./components/bonus-detail";
import { Carousel } from "react-native-snap-carousel";
import { spacing } from "libs/theme";

const ModalAlertLevelUp = () => {
  const I18n = useContext(LocalizationContext);
  const { data } = useSelector((state: RootState) => state.app?.modalAlert);
  const [index, setIndex] = useState(0);
  const [dataReward, setDataReward] = useState([]);
  const swipeRef = useRef(null);

  // Chuyển data lại thành array
  const _formatData = () => {
    // Lấy data bonus
    let newData = data?.bonus;
    // Nếu không có thông tin level thì giữ nguyên
    if (!data?.text && !data?.title) {
      return setDataReward(newData);
    }
    // Nếu có thì slide đầu tiên là thông tin level
    const firstItem = {
      icon: data?.icon,
      text: data?.text,
      title: data?.title,
    };
    return setDataReward([firstItem, ...newData]);
  }

  useEffect(() => {
    // Format data bonus
    _formatData();
    var sound = new Sound("levelup.mp3", Sound.MAIN_BUNDLE, (error) => {
      // Play the sound with an onEnd callback
      sound.play();
    });
    // Reduce the volume by half
    sound.setVolume(0.5);
    return () => {
      sound.stop();
    };
  }, []);

  const handleOnPress = () => {
    // tính Số lượng step
    const totalStep = !data?.title && !data?.text ? data?.bonus?.length - 1 : data?.bonus?.length;
    if (index === totalStep) {
      return store.dispatch(hideModalAlert());
    }
    // Play sound
    var sound = new Sound("receivinggifts.mp3", Sound.MAIN_BUNDLE, (error) => {
      // Play the sound with an onEnd callback
      sound.play();
    });
    // Reduce the volume by half
    sound.setVolume(0.5);
    // Swipe to next step
    swipeRef.current.snapToItem(index + 1);
    // Save index
    return setIndex(index + 1);
  };

  const _renderTitleButton = () => {
    // tính Số lượng step
    const totalStep = !data?.title && !data?.text ? data?.bonus?.length - 1 : data?.bonus?.length;
    if (index === totalStep) {
      return I18n.t("DIALOG.BUTTON_CLOSE");
    }
    if (index === 0) {
      return I18n.t("JOURNEY.TITLE_BUTTON_SEE_REWARD");
    }
    return I18n.t("JOURNEY.TITLE_BUTTON_NEXT_REWARD")
  }

  const _renderItem = ({item, index}) => {
    // Nếu là cấp cuối cùng thì chỉ hiển thị quà
    if (!data?.title && !data?.text) {
      return <BonusDetail data={item} />;
    }
    // Màn hình đầu tiên hiển thị thông tin hạng tiếp theo
    if (index === 0) {
      return <InfoLevel data={item} />;
    }
    // Hiển thị thông tin quà tặng
    return <BonusDetail data={item} />;
  }

  return (
    <Box
      flex
      center
      style={styles.container}
    >
      <Box flex style={styles.containerContent}>
        <Box center>
          <Box style={styles.headerBell}>
            <Lottie
              style={styles.lottieBell}
              source={require("assets/lottie/bell.json")}
              autoPlay={true}
              loop={true}
            />
          </Box>
        </Box>
        <Carousel
          ref={swipeRef}
          data={dataReward}
          renderItem={_renderItem}
          sliderWidth={width - 2*spacing.xxl}
          itemWidth={width - 2*spacing.xxxl}
          layout={"default"}
          activeSlideAlignment={"start"}
          firstItem={0}
          hasParallaxImages={true}
          scrollEnabled={false}
        />
        <Box center>
          <Button
            size="md"
            onPress={() => handleOnPress()}
            buttonStyle={styles.btnConfirm}
            title={_renderTitleButton()}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default ModalAlertLevelUp;
