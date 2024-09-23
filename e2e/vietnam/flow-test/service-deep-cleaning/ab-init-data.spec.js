/**
 * @author HuuToan
 * @email [huutoan.nguyen@btaskee.com]
 * @create date 2022-10-11 17:00:42
 * @modify date 2022-10-11 17:00:42
 * @desc [Init data before run test]
 */
const {
  initData,
  logout,
  loginWithPhoneAndPassword,
} = require("../../../step-definitions");

describe("FILE: vietnam/flow-test/service-deep-cleaning/ab-init-data.spec.js - Init data before run test", () => {
  beforeEach(async () => {
    await device.launchApp();
  });

  it("LINE 19 - Reset data", async () => {
    await initData("vn/services/update", {
      serviceName: "DEEP_CLEANING",
      dataUpdate: {
        minAvgRating: 4.6,
        minTaskDone: 20,
      },
    });
    await initData('user/createUser', {
      phone: '0834567899',
      isoCode: 'VN',
      name: "Tasker Patient Care",
      resetUser: true,
    });
    // User 0834567899 - dịch vụ deep-cleaning
    await initData("vn/user/addUserToService", {
      phone: "0834567899",
      type: "INSERT",
      serviceName: "DEEP_CLEANING",
    });
    await initData("update-user/financialAccount", {
      phone: "0834567899",
      isoCode: "VN",
      financialAccountData: { FMainAccount: 50000, Promotion: 5000 },
    });

    await device.reloadReactNative();
    try {
      await logout();
    } catch (error) {
    }
    await loginWithPhoneAndPassword("0834567899", "123456", "VN");
  });

});
