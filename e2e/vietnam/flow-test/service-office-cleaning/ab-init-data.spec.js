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
  tapText,
} = require("../../../step-definitions");

describe("FILE: vietnam/flow-test/service-office-cleaning/ab-init-data.spec.js - Init data before run test", () => {
  beforeEach(async () => {
    await device.launchApp();
  });

  it("LINE 19 - Reset data", async () => {
    await initData("vn/services/update", {
      serviceName: "OFFICE_CLEANING",
      dataUpdate: {
        minAvgRating: 4.6,
        minTaskDone: 20,
      },
    });
    await initData('user/createUser', {
      phone: '0834567813',
      isoCode: 'VN',
      name: "Tasker Patient Care",
      resetUser: true,
    });
    // User 0834567813 - dịch vụ office-cleaning
    await initData("vn/user/addUserToService", {
      phone: "0834567813",
      type: "INSERT",
      serviceName: "OFFICE_CLEANING",
    });
    await initData("update-user/financialAccount", {
      phone: "0834567813",
      isoCode: "VN",
      financialAccountData: { FMainAccount: 50000, Promotion: 5000 },
    });

    await device.reloadReactNative();
    try {
      await tapText("Đóng");
    } catch (error) {
    }
    try {
      await logout();
    } catch (error) {
    }
    await loginWithPhoneAndPassword("0834567813", "123456", "VN");
  });

});
