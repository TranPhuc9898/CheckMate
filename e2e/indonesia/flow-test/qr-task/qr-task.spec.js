const {
  tapId,
  expectElementVisible,
  initData,
  waitForElement,
  swipe,
  expectElementNotExist,
  typeToTextField,
  tapText,
  expectIdToHaveText,
} = require("../../../step-definitions");
const moment = require("moment");
const expect = require("chai").expect;

describe("FILE: indonesia/flow-test/qr-task.spec.js - Tasker see the QR code", () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData("update-user/unset-fields", {
      phone: "0834567891",
      isoCode: "ID",
      fields: ["taskCancelByTasker"],
    });
  });

  it("LINE 21 - Tasker see the QR code when task have status === CONFIRMED", async () => {
    await initData("id/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      status: "CONFIRMED",
      acceptedTasker: "0834567891",
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("TabMyTask");
    await waitForElement("weekdays_1", 500);
    await tapId("weekdays_1");
    await tapId("confirmTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("Chi tiết công việc", "text");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
    // Khi task === "CONFIRMED" thì mới thấy được.
    await expectElementVisible("Nhận dạng QR công việc của bạn", "text");
  });

  it("LINE 21 - If task dont have status !== CONFIRMED ", async () => {
    await initData("id/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      status: "WAITING_ASKER_CONFIRMATION",
      acceptedTasker: "0834567891",
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await swipe("scrollTaskDetail", "up");
    await waitForElement("newTask_My Task", 1000);
    await tapId("newTask_My Task");
    await expectElementVisible("Chi tiết công việc", "text");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
  });
});
