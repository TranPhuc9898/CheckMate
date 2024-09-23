const {
  tapId,
  expectElementVisible,
  initData,
  tapText,
  waitForElement,
  swipe,
  typeToTextField,
} = require("../../../step-definitions");

describe("FILE: chat/chat.spec.js - Tasker press Notification", () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData("vn/user/addUserToService", {
      phone: "0834567891",
      type: "INSERT",
      serviceName: "CLEANING"
    });
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task1",
      //   acceptedTasker: "0834567899",
    });
    await initData("vn/task/createTask", {
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task2",
      // acceptedTasker: "0834567899",
    });
    await device.reloadReactNative();
  });
  it("LINE 34 - Tasker accept task and  press to Navigation Chat", async () => {
    // await waitForElement("newTask_My Task1", 1000);
    await tapId("newTask_My Task1");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await typeToTextField("Nhập tin nhắn", "123456");
    // Theo id của lib react native gifted chat
    await tapId("GC_SEND_TOUCHABLE");
    await expectElementVisible("123456", "text");
    // await expectElementVisible("Tasker 01", "text");
    await expectElementVisible(
      "Công ty TNHH bTaskee, Hẻm 284/25 Lý Thường Kiệt, phường 14, Quận 10, Thành phố Hồ Chí Minh, Việt Nam",
      "text"
    );
    await expectElementVisible(
      "Xin chào, tôi đã nhận làm công việc của bạn. Tôi sẽ đến đúng giờ.",
      "text"
    );
  });
});
