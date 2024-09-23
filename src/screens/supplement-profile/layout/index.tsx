import { useContext } from "react";
import styles from "./styles";
// Component
import { Box, Container, Text, Button } from "components";
import CardProfile from "../component/card-profile";
// Libs
import { IRespond, handleError, navigateTo } from "libs/helper";
// Other Libs
import { LocalizationContext } from "libs/context";
// Redux
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import { setLoading } from "redux/slice/app-slice";
import { store } from "redux/store";
import updateTaskerProfile, {
  IParamUpdateTaskerProfile,
} from "apis/user/update-tasker-profile";

const SupplementProfile = ({ navigation, route }) => {
  const I18n = useContext(LocalizationContext);
  // Redux
  const uploadImage = useSelector((state: RootState) => state.uploadImage);

  const { taskerProfileInfo } = useSelector((state: RootState) => state.app);

  // Check Image 4 services
  const checkImageHouseHold = Boolean(
    uploadImage?.householdFrontImage && uploadImage?.householdBackImage
  );
  const checkImageIdentity = Boolean(
    uploadImage?.identityFrontImage && uploadImage?.identityBackImage
  );

  const checkImageCurriculum = Boolean(
    uploadImage?.curriculumFrontImage && uploadImage?.curriculumBackImage
  );

  const checkImageCertification = Boolean(
    uploadImage?.certificateFrontImage && uploadImage?.certificateBackImage
  );

  const checkButtonDisable = () => {
    const houseHold =
      taskerProfileInfo?.approvedFields?.includes("HOUSE_HOLD") ||
      checkImageHouseHold;
    const identity =
      taskerProfileInfo?.approvedFields?.includes("IDENTITY_CARD") ||
      checkImageIdentity;
    if (houseHold && identity) {
      return false;
    }
    return true;
  };

  const _updateTaskerProfile = async () => {
    // Show loading
    await store.dispatch(setLoading(true));
    // Call API
    let params: IParamUpdateTaskerProfile = {};
    if (checkImageIdentity) {
      params.identityCard = [
        uploadImage?.identityFrontImage,
        uploadImage?.identityBackImage,
      ];
    }
    if (checkImageHouseHold) {
      params.household = [
        uploadImage?.householdFrontImage,
        uploadImage?.householdBackImage,
      ];
    }
    if (checkImageCurriculum) {
      params.curriculumVitae = [
        uploadImage?.curriculumFrontImage,
        uploadImage?.curriculumBackImage,
      ];
    }
    if (checkImageCertification) {
      params.confirmationConduct = [
        uploadImage?.certificateFrontImage,
        uploadImage?.certificateBackImage,
      ];
    }
    // check OTP
    const respond: IRespond = await updateTaskerProfile(params);
    // Hide loading
    await store.dispatch(setLoading(false));
    // Success
    if (respond?.isSuccess) {
      navigation.popToTop();
      route.params?.callback();
      return;
    }
    // Error
    return handleError(respond?.error);
  };

  const cardProfile = () => {
    return (
      <>
        <CardProfile
          testID="cardIdentity"
          textTitle={"SUPPLEMENT_INFO.TEXT_IDENTITY"}
          textSup={"SUPPLEMENT_INFO.TEXT_REQUIRE"}
          isChecked={checkImageIdentity}
          onPress={() => {
            navigateTo("ActiveAccount");
          }}
          name={"IDENTITY_CARD"}
        />
        <CardProfile
          testID="cardHouseHold"
          textTitle={"SUPPLEMENT_INFO.TEXT_RESIDENCY"}
          textSup={"SUPPLEMENT_INFO.TEXT_REQUIRE"}
          onPress={() => {
            navigateTo("HouseHold");
          }}
          isChecked={checkImageHouseHold}
          name={"HOUSE_HOLD"}
        />
        <CardProfile
          testID="cardCurriculum"
          textTitle={"SUPPLEMENT_INFO.TEXT_CURRICULUM"}
          textSup={"SUPPLEMENT_INFO.TEXT_OPTIONAL"}
          styleTextSup={styles.text}
          isChecked={checkImageCurriculum}
          onPress={() => {
            navigateTo("CurriculumVitae");
          }}
        />
        <CardProfile
          testID="cardCertificate"
          textTitle={"SUPPLEMENT_INFO.TEXT_CERTIFICATE"}
          textSup={"SUPPLEMENT_INFO.TEXT_OPTIONAL"}
          styleTextSup={styles.text}
          isChecked={checkImageCertification}
          onPress={() => {
            navigateTo("CertificateConduct");
          }}
        />
      </>
    );
  };

  return (
    <Container>
      <Box flex>
        <Box style={styles.textSup}>
          <Text
            color="white"
            fontSize="l"
            style={{ textAlign: "center" }}
          >
            {I18n.t("SUPPLEMENT_INFO.TEXT_SUPPLEMENT_NOTE")}
          </Text>
        </Box>

        {/* Card Profile */}
        <Box>{cardProfile()}</Box>

        {/* Button */}
      </Box>

      <Button
        testID="btnSupplementProfile"
        onPress={_updateTaskerProfile}
        size={"lg"}
        buttonStyle={styles.btnSupplement}
        title={I18n.t("PROCEDURE_ACTIVE_ACCOUNT.BUTTON_UPDATE_PROFILE")}
        disabled={checkButtonDisable()}
      />
    </Container>
  );
};

export default SupplementProfile;
