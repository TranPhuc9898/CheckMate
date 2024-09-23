/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-25 13:49:20
 * @modify date 2022-10-25 13:49:20
 * @desc [Render button]
 */

import { FC, useContext } from "react";
import { Button } from "@src/components";
import { borderRadius, colors } from "libs/theme";
import { LocalizationContext } from "libs/context";

interface IButtonTaskFinished {
  taskId: string;
  navigation: any;
  detail: any;
}

const ButtonTaskFinished: FC<IButtonTaskFinished> = (props) => {
  // Get data from props
  const { detail, navigation, taskId } = props;
  const I18n = useContext(LocalizationContext);

  return (
    <Button
      testID="btnPickUpClothes"
      size="lg"
      buttonStyle={{
        backgroundColor: colors.secondary,
        borderRadius: borderRadius.s,
      }}
      onPress={() =>
        navigation.navigate("ConfirmCollectedClothes", {
          detailLaundry: detail,
          taskId: taskId,
        })
      }
      title={I18n.t("LAUNDRY.PICK_UP_CLOTHES")}
    />
  );
};

export default ButtonTaskFinished;
