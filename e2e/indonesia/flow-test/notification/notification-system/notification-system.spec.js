
const {
  tapId,
  expectElementVisible,
  initData,
  tapText,
  waitForElement,
  swipe,
  logout,
  tapHeaderBack,
  loginWithPhoneAndPassword
} = require("../../../../step-definitions");
const expect = require("chai").expect;

describe("FILE: vietnam/flow-test/thailand/notification/notification-system.spec.js - Tasker accept task and see notification system", () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData("id/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task",
    });
  });
  it("LINE 25 - Tasker accept task and see notification system", async () => {
    await initData("/notification/createNotificationSystem-th", {
      phone: '0834567891',
      description: "My Task",
    });
    await device.reloadReactNative();
    await expectElementVisible("Hộp thư", "text");
    await tapId("TabNotification");
    await tapId("TabNotificationSystem");
    await tapId("btnNotificationSystem_0");
  });
});