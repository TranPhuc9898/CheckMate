const {
  tapId,
  expectElementVisible,
  initData,
  tapText,
  waitForElement,
  swipe,
  tapHeaderBack,
  typeToTextField,
} = require("../../../../step-definitions");

describe("FILE: notification/notification-chat/notification-chat.spec.js - Tasker press Notification", () => {
  beforeEach(async () => {
    await device.launchApp();
  });
  it("LINE 16 - Tasker accept task and  press to Navigation Chat", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      acceptedTasker: "0834567891",
    });
    await device.reloadReactNative();
    await tapId("TabMyTask");
    await tapId("weekdays_1");
    await waitForElement("confirmTask_My Task", 1000);
    await tapId("confirmTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await tapId("btn_chat");
    // Theo id của lib react native gifted chat
    await expectElementVisible(
      "Xin chào, tôi đã nhận làm công việc của bạn. Tôi sẽ đến đúng giờ.",
      "text"
    );
    await typeToTextField("Nhập tin nhắn", "123456");
    await expectElementVisible("123456", "text");
    // await expectElementVisible("Tasker 01", "text");
    await expectElementVisible(
      "Công ty TNHH bTaskee, Hẻm 284/25 Lý Thường Kiệt, phường 14, Quận 10, Thành phố Hồ Chí Minh, Việt Nam",
      "text"
    );
    // Theo id của lib react native gifted chat
    await tapId("GC_SEND_TOUCHABLE");
    await tapHeaderBack();
    await tapHeaderBack();
    await tapId("TabNotification");
    await tapId("btnNotificationItemChat0");
    await expectElementVisible("123456", "text");
  });
});
