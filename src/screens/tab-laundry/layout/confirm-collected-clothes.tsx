/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-13 10:32:17
 * @modify date 2022-10-13 10:32:17
 * @desc [Show laundry detail]
 */

import { FC, useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CheckBox,
  Container,
  Divider,
  PriceItem,
  Text,
} from "@src/components";
import _ from "lodash";
import {
  getCountry,
  getTextWithLocale,
  getUserIdGlobal,
  handleError,
  IRespond,
} from "libs/helper";
import { LocalizationContext } from "libs/context";
import collectClothesAPI, {
  IParamCollectClothes,
} from "apis/tasks/collect-clothes";
import { store } from "redux/store";
import { setLoading } from "redux/slice/app-slice";
import { ScrollView } from "react-native";
import styles from "./styles";

const ConfirmCollectedClothes: FC<{
  navigation: any;
  route: any;
}> = ({ navigation, route }) => {
  const { detailLaundry, taskId } = route?.params;
  const [pickedClothes, setPickedClothes] = useState([]);
  const [disabledBtnCollect, setDisabledBtnCollect] = useState(true);
  const I18n = useContext(LocalizationContext);
  const country = getCountry();

  // TÍnh tổnh số lượng
  let total = 0;
  for (const key in detailLaundry) {
    total +=
      detailLaundry[key]?.dataV2?.length ||
      detailLaundry[key]?.data?.length ||
      0;
  }

  // Func call api collect clothes
  const _onCollectClothes = async () => {
    // Init param doneTask
    const param: IParamCollectClothes = {
      taskId: taskId,
      userId: getUserIdGlobal(),
    };
    // Show loading
    await store.dispatch(setLoading(true));
    // Call api done task
    const result: IRespond = await collectClothesAPI(param);
    // Show loading
    await store.dispatch(setLoading(false));
    // Success
    if (result.isSuccess) {
      return navigation.popToTop();
    }
    // Throw error
    return handleError(result?.error);
  };

  // Handle choose service
  const handlePickUp = (item: string) => {
    const newPickedClothes = [...pickedClothes];
    // Check item has exist
    const clothesIndex = _.findIndex(
      pickedClothes,
      (element: string) => element === item
    );
    // if item is exist, replace item
    if (clothesIndex !== -1) {
      newPickedClothes.splice(clothesIndex, 1);
    } else {
      // Data not exist, push new item to array
      newPickedClothes.push(item);
    }
    setPickedClothes(newPickedClothes);
    // Kiểm tra đã chọn đủ hết chưa
    if (newPickedClothes.length === total) {
      setDisabledBtnCollect(false);
    } else {
      setDisabledBtnCollect(true);
    }
  };

  // Render detail type of clothes
  const _listClothes = (clothes: any) => {
    if (_.isEmpty(clothes)) {
      return null;
    }
    return clothes?.map((item, index) => {
      let isChecked = _.includes(pickedClothes, item?.type);
      return (
        <Box key={item?.type + index}>
          <Divider />
          <Box
            row
            alignCenter
            style={styles.boxClothes}
          >
            <Box
              flex
              style={styles.lineClothes}
            >
              <Text
                color="grey0"
                fontSize="m"
                bold
              >
                {getTextWithLocale(item?.text)}
              </Text>
              <Text
                color="grey0"
                fontSize="m"
              >
                x{item?.quantity}
                <Text
                  color="grey0"
                  fontSize="m"
                >
                  {getTextWithLocale(item?.unit)}
                </Text>
              </Text>
            </Box>
            <PriceItem
              cost={item?.price}
              priceStyle={styles.priceStyle}
              currencyStyle={styles.currencyStyle}
            />
            <CheckBox
              testID={item?.type + index}
              checked={isChecked}
              onPress={() => handlePickUp(item?.type)}
            />
          </Box>
        </Box>
      );
    });
  };

  // Render content
  const _renderContent = ({ text, data }) => {
    if (_.isEmpty(data)) {
      return null;
    }
    return (
      <Box>
        <Text
          bold
          color="primary"
        >
          {getTextWithLocale(text)}
        </Text>
        <Box style={styles.boxTitle}>{_listClothes(data)}</Box>
      </Box>
    );
  };

  return (
    <Container headerShow={true}>
      {/* Laundry detail */}
      <Card flex>
        <ScrollView>
          {/* Washing detail */}
          {_renderContent({
            text: detailLaundry?.washing?.text,
            data: detailLaundry?.washing?.dataV2,
          })}
          {/* Dry cleaning detail */}
          {_renderContent({
            text: detailLaundry?.dryClean?.text,
            data: detailLaundry?.dryClean?.data,
          })}
          {/* Others detail */}
          {_renderContent({
            text: detailLaundry?.others?.text,
            data: detailLaundry?.others?.dataV2,
          })}
        </ScrollView>
      </Card>
      <Button
        testID="btnConfirmCollected"
        buttonStyle={styles.btnStyle}
        title={I18n.t("DIALOG.BUTTON_CONFIRM")}
        disabled={disabledBtnCollect}
        onPress={_onCollectClothes}
      />
    </Container>
  );
};

export default ConfirmCollectedClothes;
