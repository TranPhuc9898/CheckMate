/**
 * @author HuuToan
 * @email [huutoan.nguyen@btaskee.com]
 * @create date 2023-03-03 11:00:00
 * @modify date 2023-03-03 11:00:00
 * @desc [Tasker see Reward Screen]
 * case 1: Line 23 - Tasker see Reward Screen
 */

const {
  tapId,
  expectElementVisible,
  initData,
  waitForElement,
  tapHeaderBack,
  expectElementNotExist,
} = require("../../../step-definitions");

describe("FILE: thailand/view-test/reward/reward-th.spec.js - Tasker see Reward Screen", () => {
  beforeEach(async () => {
    await device.launchApp();
  });
  it("LINE 23 - Tasker see Reward Screen", async () => {
    await initData("Reward/Reward-th", {
      isViewed: false,
      phone: "0834567891"
    });
    await device.reloadReactNative();
    await waitForElement("btnRewardScreen", 2000);
    await tapId("btnRewardScreen");
    // Screen
    await expectElementVisible("Nhận thưởng chi tiết", "text");
    await expectElementVisible("Chúc mừng bạn!", "text");
    // Tap ra ngoài để xem còn thấy nút reward không
    await tapHeaderBack();
    await expectElementNotExist("btnRewardScreen");
  });
});
