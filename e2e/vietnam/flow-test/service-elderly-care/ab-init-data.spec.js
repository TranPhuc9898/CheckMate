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

describe("FILE: vietnam/flow-test/service-elderly-care/ab-init-data.spec.js - Init data before run test", () => {
  beforeEach(async () => {
    await device.launchApp();
  });

  it("LINE 19 - Reset data", async () => {
    await initData('user/createUser', {
      phone: '0834567894',
      isoCode: 'VN',
      name: "Tasker Patient Care",
      resetUser: true,
    });
    // User 0834567894 - dịch vụ elderly care
    await initData("vn/user/addUserToService", {
      phone: "0834567894",
      type: "INSERT",
      serviceName: "ELDERLY_CARE",
    });
    await initData("update-user/financialAccount", {
      phone: "0834567894",
      isoCode: "VN",
      financialAccountData: { FMainAccount: 50000, Promotion: 5000 },
    });

    await device.reloadReactNative();
    try {
      await logout();
    } catch (error) {
    }
    await loginWithPhoneAndPassword("0834567894", "123456", "VN");
  });

});
