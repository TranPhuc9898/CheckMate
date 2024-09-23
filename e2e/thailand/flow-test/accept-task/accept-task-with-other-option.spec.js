/**
 * @author HuuToan
 * @email [huutoan.nguyen@btaskee.com]
 * @create date 2022-10-11 17:00:42
 * @modify date 2022-10-11 17:00:42
 * @desc [Tasker accept tassk cleaing th]
 * case 1: Tasker locked cant see new task
 */

const {
  tapId,
  expectElementVisible,
  initData,
  tapText,
  waitForElement,
  swipe,
  expectIdToHaveText,
  tapHeaderBack,
  expectElementNotExist
} = require("../../../step-definitions");
const expect = require("chai").expect;

describe("FILE: flow-test/test-cast-th/accept-task/accept-task-with-other-option.spec.js - Accept task with other option", () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData("th/user/addUserToService", {
      phone: "0834567891",
      type: "INSERT",
      serviceName: "CLEANING"
    });
    await initData('update-user/financialAccount', { phone: "0834567891", isoCode: "TH", financialAccountData: { TH_FMainAccount: 3000, TH_Promotion: 2000 } })

  });

  it("LINE 35 - Tasker accept task of new asker", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      isNewAsker: true,
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task",
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectIdToHaveText('newAskerNote', 'Đây là khách hàng mới sử dụng dịch vụ, bạn nên liên hệ khách hàng trước khi đi làm.');
    await swipe("swipeBtn", "right");
    await expectElementVisible("Nhận công việc thành công", "text");
    await waitForElement("Đóng", 1000, "text");
    await tapText("Đóng");
    await tapHeaderBack();
    await waitForElement("numberTaskOfDate_1", 1000);
    await expectIdToHaveText('numberTaskOfDate_1', '1 việc');
    await tapId("confirmTask_My Task");
    await expectIdToHaveText('newAskerNote', 'Đây là khách hàng mới sử dụng dịch vụ, bạn nên liên hệ khách hàng trước khi đi làm.');
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("Chi tiết công việc", "text");
  });

  it("LINE 63 - Tasker accept task of old asker", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task",
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementNotExist('newAskerNote');
    await swipe("swipeBtn", "right");
    await expectElementVisible("Nhận công việc thành công", "text");
    await waitForElement("Đóng", 1000, "text");
    await tapText("Đóng");
    await tapHeaderBack();
    await waitForElement("numberTaskOfDate_1", 1000);
    await expectIdToHaveText('numberTaskOfDate_1', '1 việc');
    await tapId("confirmTask_My Task");
    await expectElementNotExist('newAskerNote');
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("Chi tiết công việc", "text");
  });


});
