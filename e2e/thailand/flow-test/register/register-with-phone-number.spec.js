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

const {
  tapId,
  typeToTextField,
  fillActiveCode,
  expectElementVisible,
  initData,
  logout,
  swipe,
  tapText,
  expectElementNotExist,
} = require('../../../step-definitions');

describe('FILE: flow-test/register/register-with-phone-number.spec.js - Register with phone number', () => {
  beforeEach(async () => {
    await initData('resetData');
    await device.launchApp();
    await initData("user/deleteUser", { phone: "0834567810" });
    try {
      await logout()
    } catch (error) {
    }
    await device.reloadReactNative();
  });

  it('LINE 36 - Tasker register with phone number', async () => {
    await expectElementVisible("btnNextToRegister", 2000);
    await tapId('btnNextToRegister');
    await typeToTextField('nameInput', 'Tasker Test');
    await typeToTextField('idNumberInput', '12345678910');
    await typeToTextField('phoneNumberInput', '0834567810');
    await typeToTextField('passwordInput', '123456');
    await swipe("scrollRegister", "up");
    await expectElementVisible("Mã giới thiệu (nếu có)", "text");
    await expectElementVisible("btnYES", 500);
    await expectElementVisible("btnNo", 500);
    await tapId('btnNo');
    await expectElementVisible("Tiếp tục", "text");
    await tapId('btnNextToOTP');
    await fillActiveCode('0834567810', "+66");
  });

  it('LINE 53 - Tasker register with phone number exist', async () => {
    try {
      await tapText("Đóng")
    } catch (error) {
    }
    await initData("user/deleteUser", { phone: "0834567899" });
    await initData('/user/createUser', { resetUser: true, phone: '0834567899', isoCode: 'TH', idNumber: "123456789" });
    await expectElementVisible("btnNextToRegister", 2000);
    await tapId('btnNextToRegister');
    await typeToTextField('nameInput', 'Tasker Test');
    await tapId('idNumberInput');
    await typeToTextField('idNumberInput', '987654321');
    await typeToTextField('phoneNumberInput', '0834567899');
    await typeToTextField('passwordInput', '123456');
    await expectElementVisible("btnYES", 500);
    await expectElementVisible("btnNo", 500);
    await tapId('btnNo');
    await tapId('btnNextToOTP');
    await expectElementVisible("Số điện thoại đã được đăng ký.", "text");
  });

  it('LINE 70 - Tasker register with TH number exist', async () => {
    await initData('/user/createUser', { resetUser: true, phone: '0834567899', isoCode: 'TH', idNumber: "123456789" });
    await expectElementVisible("btnNextToRegister", 2000);
    await tapId('btnNextToRegister');
    await typeToTextField('nameInput', 'Tasker Test');
    await tapId('idNumberInput');
    await typeToTextField('idNumberInput', '123456789');
    await typeToTextField('phoneNumberInput', '0834567810');
    await typeToTextField('passwordInput', '123456');
    await expectElementVisible("btnYES", 500);
    await expectElementVisible("btnNo", 500);
    await tapId('btnNo');
    await tapId('btnNextToOTP');
    await expectElementVisible("Số căn cước đã được sử dụng", "text");
  });

  it('LINE 86 - Tasker register with Referral code not exist', async () => {
    await expectElementVisible("btnNextToRegister", 2000);
    await tapId('btnNextToRegister');
    await typeToTextField('nameInput', 'Tasker Test');
    await tapId('idNumberInput');
    await typeToTextField('idNumberInput', '1234567891');
    await typeToTextField('phoneNumberInput', '0834567810');
    await typeToTextField('passwordInput', '123456');
    await expectElementVisible("btnYES", 500);
    await expectElementVisible("btnNo", 500);
    await tapId('btnYES');
    await typeToTextField('referralCodeInput', '123456');
    await tapId('btnNextToOTP');
    await expectElementVisible("Mã giới thiệu không đúng", "text");
  });

})
