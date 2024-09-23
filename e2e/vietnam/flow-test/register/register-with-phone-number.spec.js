/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-11 17:00:42
 * @modify date 2022-10-11 17:00:42
 * @desc [Register with phone number]
 * case 1: Tasker register with phone number
 * case 2: Tasker register with ID number exist
 * case 3: Tasker register with Phone number exist
 * case 4: Tasker register with Referral code not exist
 */

const { fetchApi, tapHeaderBack } = require('../../../step-definitions');
const {
  tapId,
  typeToTextField,
  fillActiveCode,
  expectElementVisible,
  initData,
  swipe,
  logout,
  tapText,
  expectElementNotExist,
  waitForElement,
  scroll,
} = require('../../../step-definitions');
  
describe('FILE: vietnam/flow-test/register/register-with-phone-number.spec.js - Register with phone number', () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData("user/deleteUser", {phone: "0834567810"});
    await device.reloadReactNative();
    try {
      await logout()
    } catch (error) {
    }
  });

  it('LINE 39 - Tasker register with phone number', async () => {
    await initData('vn/training/resetData', {});
    await initData('vn/training/create-training-test', {});
    const idTrainingBasic = await initData('vn/training/insert-training-basic', {});
    await device.reloadReactNative();
    // Registration
    await expectElementVisible("btnNextToRegister",2000);
    await tapId('btnNextToRegister');
    await typeToTextField('nameInput', 'Tasker Test');
    await typeToTextField('idNumberInput', '12345678910');
    await typeToTextField('phoneNumberInput', '0834567810');
    await typeToTextField('passwordInput', '123456');
    await swipe("scrollRegister", "up");
    await expectElementVisible("Mã giới thiệu (nếu có)","text");
    await expectElementVisible("btnYES",500);
    await expectElementVisible("btnNo",500);
    await tapId('btnNo');
    await expectElementVisible("Tiếp tục","text");
    await tapId('btnNextToOTP');
    await fillActiveCode('0834567810', "+84");
    // Choose city and service
    await expectElementVisible("titleChooseCity");
    await tapId("city_HCM");
    await tapId("district_Quận 1");
    await tapId("district_Quận 2");
    await tapId("btnNextStep");
    await tapId("service_CLEANING");
    await tapId("btnNextStep");
    await expectElementVisible("district_Quận 1");
    await expectElementVisible("district_Quận 2");
    await expectElementVisible("service_CLEANING");
    await tapId("btnConfirm");
    await expectElementVisible("txtUpdateSuccess");
    await tapId("btnDone");
    // Get user
    const user = await initData("user/get-user", {phone: "0834567810", isoCode: "VN"});
    // Training input
    await expectElementVisible("indicator");
    await expectElementVisible("processingBackground");
    await swipe("scrollVertical", "up");
    await expectElementVisible("stepAdmissionTest");
    await tapId("btnTestAdmissionTestNow");
    await waitForElement('Bài kiểm tra', 500, 'text');
    await waitForElement('btnStartTraining', 500);
    await tapId("btnStartTraining");
    await tapId("btnConfirmStartTraining");
    await waitForElement('answer-1-B', 500);
    await tapId("answer-1-A");
    await tapId("answer-2-B");
    await swipe("scrollQuiz", "up");
    await tapId("answer-3-B");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");
    await tapId("btnCloseAlert");
    await expectElementVisible("btnSuccess");
    // Training basic
    await scroll("scrollHorizontal", 300, "right");
    await expectElementVisible("stepTrainingBasic");
    await expectElementVisible("stepTrainingBasic");
    await tapId("btnTestBasicTrainingNow");
    await expectElementVisible("trainingItem_1");
    await tapId("trainingItem_1");
    await expectElementVisible("btnTrainingProgramVideo");
    await expectElementVisible("iconLock");
    await tapId("btnTrainingProgramVideo");
    // Call api finish training video
    await fetchApi("v3/api-tasker-vn/finish-training-video", {
      "trainingTaskerId": idTrainingBasic.id,
      "taskerId": user._id,
    });
    await tapHeaderBack();
    await tapHeaderBack();
    await tapId("trainingItem_1");
    await expectElementNotExist("iconLock");
    await tapId("btnTrainingProgramTest");
    await tapId("answer-1-A");
    await tapId("answer-2-B");
    await swipe("scrollQuiz", "up");
    await tapId("answer-3-B");
    await tapId("btnFinishTest");
    await tapId("btnCloseAlert");
    await expectElementVisible("iconTestPass");
    await tapHeaderBack();
    await tapHeaderBack();
    await tapId("TabHome");
    await expectElementVisible("btnBasicTrainingSuccess");
    // Update profile
    await scroll("scrollHorizontal", 300, "right");
    await expectElementVisible("stepActiveAccount");
    await expectElementVisible("btnUploadProfile");
    await tapId("btnUploadProfile");
    await expectElementVisible("cardIdentity");
    await expectElementVisible("cardHouseHold");
    await expectElementVisible("cardCurriculum");
    await expectElementVisible("cardCertificate");
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

  it('LINE 175 - Tasker register with phone number exist', async () => {
    await initData("user/deleteUser", {phone: "0834567899"});
    await initData('/user/createUser', {resetUser: true, phone: '0834567899', isoCode: 'VN', idNumber: "123456789"});
    await expectElementVisible("btnNextToRegister",2000);
    await tapId('btnNextToRegister');
    await typeToTextField('nameInput', 'Tasker Test');
    await tapId('idNumberInput');
    await typeToTextField('idNumberInput', '1234567810');
    await typeToTextField('phoneNumberInput', '0834567899');
    await typeToTextField('passwordInput', '123456');
    await expectElementVisible("btnYES",500);
    await expectElementVisible("btnNo",500);
    await tapId('btnNo');
    await tapId('btnNextToOTP');
    await expectElementVisible("Số điện thoại đã được đăng ký.", "text");
  });

  it('LINE 192 - Tasker register with TH number exist', async () => {
    await initData('/user/createUser', {resetUser: true, phone: '0834567899', isoCode: 'VN', idNumber: "123456789"});
    await expectElementVisible("btnNextToRegister",2000);
    await tapId('btnNextToRegister');
    await typeToTextField('nameInput', 'Tasker Test');
    await tapId('idNumberInput');
    await typeToTextField('idNumberInput', '123456789');
    await typeToTextField('phoneNumberInput', '0834567810');     
    await typeToTextField('passwordInput', '123456');
    await expectElementVisible("btnYES",500);
    await expectElementVisible("btnNo",500);
    await tapId('btnNo');
    await tapId('btnNextToOTP');
    await expectElementVisible("Số căn cước đã được sử dụng", "text");
  });

  it('LINE 208 - Tasker register with Referral code not exist', async () => {
    await expectElementVisible("btnNextToRegister",2000);
    await tapId('btnNextToRegister');
    await typeToTextField('nameInput', 'Tasker Test');
    await tapId('idNumberInput');
    await typeToTextField('idNumberInput', '1234567891');
    await typeToTextField('phoneNumberInput', '0834567810');
    await typeToTextField('passwordInput', '123456');
    await expectElementVisible("btnYES",500);
    await expectElementVisible("btnNo",500);
    await tapId('btnYES');
    await typeToTextField('referralCodeInput', '123456');
    await tapId('btnNextToOTP');
    await expectElementVisible("Mã giới thiệu không đúng", "text");
  });

})
