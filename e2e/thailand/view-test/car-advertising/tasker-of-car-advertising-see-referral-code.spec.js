/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-12-15 16:07:37
 * @modify date 2022-12-15 16:07:37
 * @desc [Tasker of car advertising see referral code]
 */

const {
  tapId,
  expectElementVisible,
  initData,
  loginWithPhoneAndPassword,
} = require("../../../step-definitions");

describe("FILE: flow-test/car-advertising/tasker-of-car-advertising-see-referral-code.spec.js - Tasker of car advertising see referral code", () => {
  beforeEach(async () => {
    await device.launchApp();
  });

  it("LINE 26 - Tasker accept task auto confirm and navigate to Chat", async () => {
    await initData("serviceChannel/update-serviceChannel", {
      type: "Insert",
      serviceName: "CAR_ADVERTISING",
      phone: "0834567891"
    });
    await device.reloadReactNative();
    try {
      await loginWithPhoneAndPassword("0834567891", "123456");
    } catch (error) {
      
    };
    await expectElementVisible("titleReferralCode");
    await expectElementVisible("referralCode");
    await expectElementVisible("btnShareReferral");
    await expectElementVisible("txtNumberCustomerEnteredCode");
    await initData("serviceChannel/update-serviceChannel", {
      type: "Remove",
      serviceName: "CAR_ADVERTISING",
      phone: "0834567891"
    });
  });
});
