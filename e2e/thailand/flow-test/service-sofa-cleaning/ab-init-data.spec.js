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

describe("FILE: thailand/flow-test/service-sofa-cleaning/ab-init-data.spec.js - Init data before run test", () => {
  beforeEach(async () => {
    await device.launchApp();
  });

  it("LINE 19 - Reset data", async () => {
    // User 0834567895 - dịch vụ SofaCleaning
    await initData('user/createUser', {
      phone: '0834567895',
      isoCode: 'TH',
      name: "Tasker Sofa",
      resetUser: true,
    });
    await initData("th/user/addUserToService", {
      phone: "0834567895",
      type: "INSERT",
      serviceName: "SofaCleaning",
    });
    await initData("update-user/financialAccount", {
      phone: "0834567895",
      isoCode: "TH",
      financialAccountData: { TH_FMainAccount: 50000, TH_Promotion: 5000 },
    });

    await device.reloadReactNative();
    try {
      await logout();
    } catch (error) {
    }
    await loginWithPhoneAndPassword("0834567895", "123456", "TH");
  });

});
