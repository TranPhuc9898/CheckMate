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

describe("FILE: indonesia/flow-test/service-cleaning/ab-init-data.spec.js - Init data before run test", () => {
  beforeEach(async () => {
    await device.launchApp();
  });

  it("LINE 19 - Reset data", async () => {
    // User 0834567891 - dịch vụ dọn dẹp nhà
    await initData('user/createUser', {
      phone: '0834567891',
      isoCode: 'ID',
      name: "Tasker Cleaning",
      resetUser: true,
    });
    await initData("id/user/addUserToService", {
      phone: "0834567891",
      type: "INSERT",
      serviceName: "CLEANING",
    });
    await initData("update-user/financialAccount", {
      phone: "0834567891",
      isoCode: "ID",
      financialAccountData: { ID_FMainAccount: 50000, ID_Promotion: 5000 },
    });

    await device.reloadReactNative();
    try {
      await logout();
    } catch (error) {
    }
    await loginWithPhoneAndPassword("0834567891", "123456", "ID");
  });

});
