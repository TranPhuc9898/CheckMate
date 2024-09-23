/**
 * @author HuuToan
 * @email [huutoan.nguyen@btaskee.com]
 * @create date 2022-10-11 17:00:42
 * @modify date 2022-10-11 17:00:42
 * @desc [Reset data test case Indonesia]
 */
const {
  initData,
  loginWithPhoneAndPassword,
} = require("../../step-definitions");

describe("FILE: indonesia/app/init-data.spec.js - Reset data test case Indonesia", () => {
  beforeEach(async () => {
    await device.launchApp();
  });

  it("LINE 18 - Reset data test case Indonesia", async () => {
    await initData('resetData');
    await initData('user/createUser', {
      phone: '077777777',
      isoCode: 'ID',
      resetUser: true,
      type: "ASKER",
      name: "Asker ID"
    });

    // User 0834567891 - dịch vụ dọn dẹp nhà
    await initData('user/createUser', {
      phone: '0834567891',
      isoCode: 'ID',
      name: "Tasker ID Cleaning",
      resetUser: true,
    });
    await initData("id/user/addUserToService", {
      phone: "0834567891",
      type: "INSERT",
      serviceName: "CLEANING",
    });

    // User 0834567892 - dịch vụ vệ sinh máy lạnh
    await initData('user/createUser', {
      phone: '0834567892',
      isoCode: 'ID',
      name: "Tasker ID AC",
      resetUser: true,
    });
    await initData("id/user/addUserToService", {
      phone: "0834567892",
      type: "INSERT",
      serviceName: "AIR_CONDITIONER_SERVICE",
    });

    // User 0834567899 - dịch vụ deep cleaning
    await initData('user/createUser', {
      phone: '0834567899',
      isoCode: 'ID',
      name: "Tasker Deep Cleaning",
      resetUser: true,
    });
    await initData("id/user/addUserToService", {
      phone: "0834567892",
      type: "INSERT",
      serviceName: "DEEP_CLEANING",
    });

    await device.reloadReactNative();
    await loginWithPhoneAndPassword("0834567891", "123456", "ID");
  });

});
