import { FunctionComponent, ComponentProps, useEffect, useState, useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { Box, Text, Icon, Alert, CheckBox, Divider } from "@src/components";
import { IRespond, handleError, getLocaleGlobal } from "libs/helper";
import { updateTaskerLanguageAPI } from "apis/user";
import styles from "./styles";
import { locales } from "@src/libs/config";
import { colors } from "libs/theme";

interface ILanguage extends ComponentProps<typeof View> {
  navigation?: any;
  user?: any;
  setLoading?: (isloading: boolean) => void;
  setLocale?: (language: string) => void;
  getUserInfo: any;
}

const LanguageScreen: FunctionComponent<ILanguage> = ({
  setLoading,
  user,
  setLocale,
  getUserInfo,
}) => {
  const I18n = useContext(LocalizationContext);
  const [arrLanguage, setArrLanguage] = useState([]);

  const updateTaskerLanguage = async (index) => {
    const language = locales[index];
    setLoading(true);
    const respond: IRespond = await updateTaskerLanguageAPI({
      language,
    });
    setLoading(false);
    if (respond.isSuccess) {
      setLocale(language);
      return getUserInfo();
    }
    handleError(respond?.error);
  };

  const onSelectItem = (index) => {
    Alert.alert.close();
    setTimeout(() => {
      updateTaskerLanguage(index);
    }, 300);
  };

  const getSelectLanguage = () => {
    const arr = locales.map((e) =>
      I18n.t(`CHOOSE_LANGUAGE.${e.toUpperCase()}`)
    );
    setArrLanguage(arr);
  };

  useEffect(() => {
    getSelectLanguage();
  }, []);

  const _handleOpenDropdown = () => {
    return Alert.alert.open({
      title: "CHOOSE_LANGUAGE.TITLE",
      message: (
        <Box>
          {arrLanguage.map((item, index) => (
            <Box key={item}>
              <CheckBox
                key={item}
                testID={item}
                size={20}
                title={item}
                checked={Boolean(index === locales.indexOf(getLocaleGlobal()))}
                onPress={() => onSelectItem(index)}
                textStyle={
                  Boolean(index === locales.indexOf(getLocaleGlobal())) ?
                  styles.txtCheckedStyle :
                  styles.txtStyle
                }
                containerStyle={styles.containerCheckBox}
                checkedColor={colors.primary}
                uncheckedColor={colors.primary3}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
              />
              {index < arrLanguage?.length - 1 && <Divider />}
            </Box>
          ))}
        </Box>
      )
    })
  }

  return (
    <Box>
      <Box
        row
        center
        style={styles.boxIteam}
      >
        <Text
          bold
          fontSize="xl"
          color="primary"
        >
          {I18n.t("SETTINGS.LANGUAGE")}
        </Text>
        <TouchableOpacity onPress={_handleOpenDropdown}>
          <Box row alignCenter style={styles.wrapDropdown}>
            <Text style={styles.txtLabel}>{arrLanguage[locales.indexOf(getLocaleGlobal())]}</Text>
            <Icon
              name={"down"}
              color="grey1"
              size="xl"
            />
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default LanguageScreen;
