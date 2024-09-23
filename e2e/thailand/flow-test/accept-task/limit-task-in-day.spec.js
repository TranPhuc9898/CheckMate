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
const moment = require('moment');

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

  it("LINE 35 - Tasker accept 3 task in day", async () => {
    await initData('th/task/createTask',
    {
      resetCollection: true,
      serviceName: 'CLEANING',
      viewedTaskers: ["0834567891"],
      description: "My Task01",
      acceptedTasker: "0834567891",
      date: moment().add(1, 'd').set('hour', 6).toDate()
    });
    await initData('th/task/createTask',
    {
      serviceName: 'CLEANING',
      viewedTaskers: ["0834567891"],
      description: "My Task02",
      acceptedTasker: "0834567891",
      date: moment().add(1, 'd').set('hour', 6).toDate()
    });
    await initData("th/task/createTask", {
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      date: moment().add(1, 'd').set('hour', 18).toDate()
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Nhận công việc thành công", "text");
    await waitForElement("Đóng", 1000, "text");
    await tapText("Đóng");
    await tapHeaderBack();
    await waitForElement("numberTaskOfDate_1", 1000);
    await expectIdToHaveText('numberTaskOfDate_1', '3 việc');
    await tapId("confirmTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("Chi tiết công việc", "text");
  });

});
