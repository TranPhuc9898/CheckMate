/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-03-02 11:11:08
 * @modify date 2023-03-02 11:11:08
 * @desc [Show error screen when error occurs]
 */

import { Box, Card, TransitionView } from "components";
import { FC, useState, useEffect } from "react";
import ChooseCity from "./choose-city";
import ChooseDistrict from "./choose-district";
import ChooseService from "./choose-service";
import ConfirmChoose from "./confirm-choose";
import styles from "./styles";
import { InteractionManager } from "react-native";

interface IErrorScreen {
  getUserInfo?: (value) => void;
  getAllWorkingPlaces?: () => void;
  setCitySelected?: (value) => void;
  setChooseService?: (value) => void;
  getServicesByCity?: (value) => void;
  setDistrictSelected?: (value) => void;
  getTrainingStep?: () => void;
  allWorkingPlaces?: any;
  citySelected?: any;
  districtSelected?: any;
  services?: any;
  locale?: string;
}

const ErrorScreen: FC<IErrorScreen> = ({
  getUserInfo,
  getAllWorkingPlaces,
  setDistrictSelected,
  getServicesByCity,
  setChooseService,
  setCitySelected,
  getTrainingStep,
  allWorkingPlaces,
  citySelected,
  districtSelected,
  services,
  locale,
}) => {
  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() =>
      getAllWorkingPlaces()
    );
    return () => interactionPromise.cancel();
  }, []);

  const [step, setStep] = useState(1);
  const [servicesByCity, setServicesByCity] = useState<{}[]>([]);

  return (
    <Box
      center
      flex
      style={styles.boxContainer}
    >
      <TransitionView
        duration={600}
        index={1}
        animation="zoomIn"
        style={styles.transactionView}
      >
        <Card style={styles.boxCard}>
          <Box flex>
            {step === 1 ? (
              <ChooseCity
                setCitySelected={(value) => setCitySelected(value)}
                setDistrictSelected={setDistrictSelected}
                setChooseService={setChooseService}
                value={citySelected?.name}
                data={allWorkingPlaces?.cities || []}
                citySelected={citySelected}
                setStep={setStep}
                step={step}
              />
            ) : null}
            {step === 2 ? (
              <ChooseDistrict
                setDistrictSelected={setDistrictSelected}
                citySelected={citySelected}
                districtSelected={districtSelected}
                step={step}
                setStep={setStep}
              />
            ) : null}
            {step === 3 ? (
              <ChooseService
                servicesByCity={servicesByCity}
                getServicesByCity={getServicesByCity}
                setServicesByCity={setServicesByCity}
                setChooseService={setChooseService}
                locale={locale}
                services={services}
                citySelected={citySelected}
                step={step}
                setStep={setStep}
              />
            ) : null}

            {step === 4 ? (
              <ConfirmChoose
                districtSelected={districtSelected}
                servicesByCity={servicesByCity}
                locale={locale}
                step={step}
                setStep={setStep}
                services={services}
                citySelected={citySelected}
                getUserInfo={getUserInfo}
                getTrainingStep={getTrainingStep}
              />
            ) : null}
          </Box>
        </Card>
      </TransitionView>
    </Box>
  );
};

export default ErrorScreen;
