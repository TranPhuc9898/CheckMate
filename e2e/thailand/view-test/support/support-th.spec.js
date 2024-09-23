/**
 * @author HuuToan
 * @email [huutoan.nguyen@btaskee.com]
 * @create date 2023-03-03 11:00:00
 * @modify date 2023-03-03 11:00:00
 * @desc [Tasker see Support Screen]
 * case 1: LINE 21 - Tasker see Support Screen and Line button
 */

const {
  tapId,
  expectElementVisible,
  tapHeaderBack,
  scrollTo,
} = require("../../../step-definitions");

describe("FILE: thailand/view-test/support/support-th.spec.js - Tasker see and press Support Screen", () => {
  beforeEach(async () => {
    await device.launchApp();
  });
  it("LINE 21 - Tasker see and press Support Screen", async () => {

    await device.reloadReactNative();
    await tapId("TabAccount");
    await scrollTo('scrollViewAccount', 'bottom');
    await tapId("btnSupport");

    // Screen
    await expectElementVisible("Hỗ trợ", "text");
    await expectElementVisible("Hỗ trợ công việc hằng ngày", "text");
    await expectElementVisible("Tổng đài không hỗ trợ ngoài giờ làm việc.", "text");
    await expectElementVisible("btnCallSupport");
    await expectElementVisible("btnLine");
    await scrollTo('scrollViewSupport', 'bottom');
    await expectElementVisible("Hỗ trợ vấn đề về nhân sự", "text");
    await expectElementVisible("(mở, khóa tài khoản, xin tạm nghỉ...)", "text");
    await expectElementVisible("btnCallSupport_1");
    await expectElementVisible("btnLine_1");
    await tapHeaderBack()
  });
});
