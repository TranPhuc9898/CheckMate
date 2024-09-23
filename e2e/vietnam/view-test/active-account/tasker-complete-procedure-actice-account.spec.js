/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-04-05 13:51:09
 * @modify date 2023-04-05 13:51:09
 * @desc [Tasker complete procedure active account]
 */
/**
 * case 1: Tasker register without test
 * case 2: Tasker register have admission test
 * case 3: Tasker register pass admission test
 * case 4: Tasker register have training basic test
 * case 5: Tasker register pass training basic test
 */

const {
  tapId,
  scroll,
  swipe,
  initData,
  tapHeaderBack,
  expectElementVisible,
  expectElementNotExist,
  fetchApi,
  loginWithPhoneAndPassword,
} = require('../../../step-definitions');

describe('FILE: vietnam/flow-test/active-account/tasker-complete-procedure-actice-account.spec.js - Tasker complete procedure active account', () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData("vn/user/addUserToService", {
      phone: "0834567891",
      type: "INSERT",
      serviceName: "CLEANING",
    });
    await initData('/user/updateUser', {
      phone: '0834567891',
      isoCode: "VN",
      dataUpdate: {
        status: "UNVERIFIED"
      }
    });
    await initData("update-user/unset-fields", { phone: "0834567891", isoCode: "VN", fields: ["checkInput"] });
    await initData('vn/training/resetData', {});
    await device.reloadReactNative();
    try {
      await loginWithPhoneAndPassword("0834567891", "123456");
    } catch (error) {
      
    }
  });

  afterEach(async () => {
    await initData('/user/updateUser', {
      phone: '0834567891',
      isoCode: "VN",
      dataUpdate: {
        status: "ACTIVE"
      }
    });
  })

  it('LINE 55 - Tasker register without test', async () => {
    await expectElementNotExist("indicator");
    await expectElementVisible("processingBackground");
    await swipe("scrollVertical", "up");
    await expectElementVisible("stepActiveAccount");
    await expectElementNotExist("stepAdmissionTest");
    await expectElementNotExist("stepTrainingBasic");
    await expectElementVisible("btnUploadProfile");
    await tapId("btnUploadProfile");
    await expectElementVisible("Cập nhật hồ sơ", "text");
  });

  it('LINE 67 - Tasker register have admission test', async () => {
    await initData('vn/training/create-training-test', {});
    await device.reloadReactNative();
    await expectElementVisible("indicator");
    await expectElementVisible("processingBackground");
    await swipe("scrollVertical", "up");
    await expectElementVisible("stepAdmissionTest");
    await expectElementNotExist("stepTrainingBasic");
    await expectElementVisible("btnTestAdmissionTestNow");
    await tapId("btnTestAdmissionTestNow");
    await expectElementVisible("Bài kiểm tra", "text");
    await tapHeaderBack();
    await swipe("scrollHorizontal", "left");
    await expectElementNotExist("stepTrainingBasic");
    await expectElementVisible("stepActiveAccount");
    await expectElementNotExist("btnUploadProfile");
    await expectElementVisible("iconLock");
  });

  it('LINE 86 - Tasker register pass admission test', async () => {
    await initData('vn/training/create-training-test', {});
    await initData('vn/training/create-training-history', { phone: "0834567891", status: "PASS", type: "TRAINING_INPUT" })
    await device.reloadReactNative();
    await expectElementVisible("indicator");
    await expectElementVisible("processingBackground");
    await swipe("scrollVertical", "up");
    await expectElementVisible("stepAdmissionTest");
    await expectElementNotExist("stepTrainingBasic");
    await expectElementNotExist("btnTestAdmissionTestNow");
    await expectElementVisible("btnSuccess");
    await swipe("scrollHorizontal", "left");
    await expectElementNotExist("stepTrainingBasic");
    await expectElementVisible("stepActiveAccount");
    await expectElementVisible("btnUploadProfile");
    await expectElementNotExist("iconLock");
  });

  it('LINE 105 - Tasker register have training basic test', async () => {
    await initData('vn/training/create-training-test', {});
    await initData('vn/training/insert-training-basic', {});
    await initData('vn/training/create-training-history', { phone: "0834567891", status: "PASS", type: "TRAINING_INPUT" });
    await device.reloadReactNative();
    await expectElementVisible("indicator");
    await expectElementVisible("processingBackground");
    await swipe("scrollVertical", "up");
    await expectElementVisible("stepAdmissionTest");
    await expectElementNotExist("btnTestAdmissionTestNow");
    await expectElementVisible("btnSuccess");
    await scroll("scrollHorizontal", 300, "right");
    await expectElementVisible("stepTrainingBasic");
    await expectElementVisible("btnTestBasicTrainingNow");
    await scroll("scrollHorizontal", 300, "right");
    await expectElementVisible("stepActiveAccount");
    await expectElementNotExist("btnUploadProfile");
    await expectElementVisible("iconLock");
  });

  it('LINE 125 - Tasker register pass training basic test and profile was approved', async () => {
    await initData('vn/training/create-training-test', {});
    await initData('vn/training/insert-training-basic', {});
    await initData('vn/training/create-training-history', { phone: "0834567891", status: "PASS", type: "TRAINING_INPUT" });
    await initData('vn/training/create-training-history', { phone: "0834567891", status: "PASS", type: "TRAINING_BASIC" });
    // Get user
    const user = await initData("user/get-user", {phone: "0834567891", isoCode: "VN"});
    await device.reloadReactNative();
    await expectElementVisible("indicator");
    await expectElementVisible("processingBackground");
    await swipe("scrollVertical", "up");
    await expectElementVisible("stepAdmissionTest");
    await expectElementNotExist("btnTestAdmissionTestNow");
    await expectElementVisible("btnSuccess");
    await scroll("scrollHorizontal", 300, "right");
    await expectElementVisible("stepTrainingBasic");
    await expectElementVisible("btnBasicTrainingSuccess");
    await scroll("scrollHorizontal", 300, "right");
    await expectElementVisible("stepActiveAccount");
    await expectElementVisible("btnUploadProfile");
    await tapId("btnUploadProfile");
    await expectElementVisible("Cập nhật hồ sơ", "text");
    // Call api update image
    await fetchApi("v3/api-tasker-vn/update-tasker-profile", {
      "taskerId": user._id,
      "identityCard": [
          "https://toanphambucket.s3.amazonaws.com/mystore%2Fidentityx64351ae5cb10700adcfd4728-iesve",
          "https://toanphambucket.s3.amazonaws.com/mystore%2Fidentityx64351ae5cb10700adcfd4728-njenm"
      ],
      "household": [
          "https://toanphambucket.s3.amazonaws.com/mystore%2Fidentityx64351ae5cb10700adcfd4728-guflv",
          "https://toanphambucket.s3.amazonaws.com/mystore%2Fidentityx64351ae5cb10700adcfd4728-hkfg"
      ]
    });
    await tapHeaderBack();
    await swipe("scrollVertical", "up");
    await expectElementVisible("btnUpdateProfileSuccess");
    await swipe("scrollVertical", "down");
    await expectElementVisible("titleProcessing");
    await expectElementVisible("btnMakeAppointmentDisabled");
    // Call api update status profile
    await fetchApi("v2/backend-user/update-tasker-profile", {
      "taskerId": user._id,
      "identityCardStatus": "APPROVED",
      "householdStatus": "APPROVED"
    });
    await device.reloadReactNative();
    // Make appointment
    await expectElementVisible("titleApproved");
    await tapId("btnMakeAppointment");
    await expectElementVisible("titleChooseDateTime");
    await tapId("btnNext");
    await expectElementVisible("titleChooseAddress");
    await tapId("checkbox_0");
    await tapId("btnConfirm");
    await expectElementVisible("titleMakeAppointmentSuccess");
    await expectElementVisible("dateAppointment");
    await expectElementVisible("phoneNumberAppointment");
    await expectElementVisible("addressAppointment");
    await expectElementVisible("btnChat");
    await expectElementVisible("btnCall");
  });

  it('LINE 125 - Tasker register pass training basic test, identifyCard ', async () => {
    await initData('vn/taskerProfile/reset-data', {});
    await initData('vn/training/create-training-test', {});
    await initData('vn/training/insert-training-basic', {});
    await initData('vn/training/create-training-history', { phone: "0834567891", status: "PASS", type: "TRAINING_INPUT" });
    await initData('vn/training/create-training-history', { phone: "0834567891", status: "PASS", type: "TRAINING_BASIC" });
    // Get user
    const user = await initData("user/get-user", {phone: "0834567891", isoCode: "VN"});
    await device.reloadReactNative();
    await expectElementVisible("indicator");
    await expectElementVisible("processingBackground");
    await swipe("scrollVertical", "up");
    await swipe("scrollHorizontal", "left");
    await expectElementVisible("stepActiveAccount");
    await expectElementVisible("btnUploadProfile");
    await tapId("btnUploadProfile");
    await expectElementVisible("Cập nhật hồ sơ", "text");
    // Call api update image
    await fetchApi("v3/api-tasker-vn/update-tasker-profile", {
      "taskerId": user._id,
      "identityCard": [
          "https://toanphambucket.s3.amazonaws.com/mystore%2Fidentityx64351ae5cb10700adcfd4728-iesve",
          "https://toanphambucket.s3.amazonaws.com/mystore%2Fidentityx64351ae5cb10700adcfd4728-njenm"
      ],
      "household": [
          "https://toanphambucket.s3.amazonaws.com/mystore%2Fidentityx64351ae5cb10700adcfd4728-guflv",
          "https://toanphambucket.s3.amazonaws.com/mystore%2Fidentityx64351ae5cb10700adcfd4728-hkfg"
      ]
    });
    await tapHeaderBack();
    await swipe("scrollVertical", "up");
    await expectElementVisible("btnUpdateProfileSuccess");
    await swipe("scrollVertical", "down");
    await expectElementVisible("titleProcessing");
    await expectElementVisible("btnMakeAppointmentDisabled");
    // Call api update status profile
    // await fetchApi("v2/backend-user/update-tasker-profile", {
    //   "taskerId": user._id,
    //   "identityCardStatus": "APPROVED",
    //   "householdStatus": "REJECTED"
    // });
    // await device.reloadReactNative();
    // await swipe("scrollVertical", "up");
    // await swipe("scrollHorizontal", "left");
    // await tapId("btnUploadProfile");
    // await expectElementVisible("cardIdentity_approved");
    // await expectElementVisible("cardHouseHold_rejected");
  });
})
