/**
 * @author HuuToan
 * @email [huutoan.nguyen@btaskee.com]
 * @create date 2022-10-11 17:00:42
 * @modify date 2022-10-11 17:00:42
 * @desc [Init data before run test]
 */
const {
  initData,
  loginWithPhoneAndPassword,
} = require("../../step-definitions");

describe("FILE: thailand/app/init-data.spec.js - Init data before run test", () => {
  beforeEach(async () => {
    await device.launchApp();
  });

  it("LINE 18 - Reset data", async () => {
    await initData('resetData');
    await initData('user/createUser', {
      phone: '077777777',
      isoCode: 'TH',
      resetUser: true,
      type: "ASKER",
      name: "Asker TH"
    });

    // User 0834567891 - dịch vụ dọn dẹp nhà
    await initData('user/createUser', {
      phone: '0834567891',
      isoCode: 'TH',
      name: "Tasker Cleaning",
      resetUser: true,
    });
    await initData("th/user/addUserToService", {
      phone: "0834567891",
      type: "INSERT",
      serviceName: "CLEANING",
    });

    // User 0834567892 - dịch vụ vệ sinh máy lạnh
    await initData('user/createUser', {
      phone: '0834567892',
      isoCode: 'TH',
      name: "Tasker AC Service",
      resetUser: true,
    });

    // User 0834567893 - dịch vụ child care
    await initData('user/createUser', {
      phone: '0834567893',
      isoCode: 'TH',
      name: "Tasker Child Care",
      resetUser: true,
    });

    // User 0834567894 - dịch vụ elderly care
    await initData('user/createUser', {
      phone: '0834567894',
      isoCode: 'TH',
      name: "Tasker Elderly Care",
      resetUser: true,
    });

    // User 0834567895 - dịch vụ Sofa Cleaning
    await initData('user/createUser', {
      phone: '0834567895',
      isoCode: 'TH',
      name: "Tasker Sofa Cleaning",
      resetUser: true,
    });

    // User 0834567896 - dịch vụ home cooking
    await initData('user/createUser', {
      phone: '0834567896',
      isoCode: 'TH',
      name: "Tasker Home Cooking",
      resetUser: true,
    });

    // User 0834567897 - dịch vụ house keeping
    await initData('user/createUser', {
      phone: '0834567897',
      isoCode: 'TH',
      name: "Tasker House Keeping",
      resetUser: true,
    });

    // User 0834567898 - dịch vụ patient care
    await initData('user/createUser', {
      phone: '0834567898',
      isoCode: 'TH',
      name: "Tasker Patient Care",
      resetUser: true,
    });

    // User 0834567899 - dịch vụ deep cleaning
    await initData('user/createUser', {
      phone: '0834567899',
      isoCode: 'TH',
      name: "Tasker Deep Cleaning",
      resetUser: true,
    });

    // User 0834567810 - dịch vụ house keeping
    await initData('user/createUser', {
      phone: '0834567810',
      isoCode: 'TH',
      name: "Tasker TH",
      resetUser: true,
    });

    // User 0834567811 - dịch vụ house keeping
    await initData('user/createUser', {
      phone: '0834567811',
      isoCode: 'TH',
      name: "Tasker TH",
      resetUser: true,
    });

    // User 0834567812 - dịch vụ house keeping
    await initData('user/createUser', {
      phone: '0834567812',
      isoCode: 'TH',
      name: "Tasker TH",
      resetUser: true,
    });

    await device.reloadReactNative();
    await loginWithPhoneAndPassword("0834567891", "123456", "TH");
  });

});
