
const {
    tapId,
    expectElementVisible,
    initData,
    tapText,
    waitForElement,
    swipe,
    tapHeaderBack,
    expectIdToHaveText,
    expectElementNotExist,
    loginWithPhoneAndPassword
  } = require("../../../step-definitions");

  describe("FILE: view-test/share/share-vn.spec.js - Tasker see Share Screen", () => {
    beforeEach(async () => {
        await device.launchApp();
    });
      // Thấy nút bật thông báo nhấn thì qua tới screen setting trong máy
    it("LINE 22 - See card in inbox tab, press and see the notification permission", async () => {
      await device.reloadReactNative();
      await waitForElement("TabNotification", 1000);
      await tapId("TabNotification");
      await expectElementVisible("Chức năng thông báo công việc đã TẮT", "text");
      await expectElementVisible("Bạn có thể bỏ lỡ những công việc hấp dẫn khi tắt thông báo. Mở tính năng thông báo ngay.", "text");
      await waitForElement("btnTurnOnNotification", 1000);
      await tapId("btnTurnOnNotification");
    });
    // Sau khi bật thông báo từ setting trong máy thì vào lại trang và không thấy card thông báo.
    it("LINE 32 - See card in inbox tab,expect not exist the notification permission", async () => {
        await device.reloadReactNative();
        await waitForElement("TabNotification", 1000);
        await tapId("TabNotification");
        await expectElementNotExist("Chức năng thông báo công việc đã TẮT", "text");
        await expectElementNotExist("Bạn có thể bỏ lỡ những công việc hấp dẫn khi tắt thông báo. Mở tính năng thông báo ngay.", "text");
        await expectElementNotExist("btnTurnOnNotification");
      });
  });