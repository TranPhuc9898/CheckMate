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

describe("FILE: flow-test/test-cast-th/accept-task/limit-number-tasker-accept-task.spec.js - Tasker locked", () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData("th/user/addUserToService", {
      phone: "0834567891",
      type: "INSERT",
      serviceName: "CLEANING"
    });
    await initData('/user/createUser', {
      phone: '0834567892',
      isoCode: 'TH',
      resetUser: true,
      taskDone: 100,
      avgRating : 5.0,
    });
    await initData('/user/createUser', {
      phone: '0834567893',
      isoCode: 'TH',
      resetUser: true,
      taskDone: 100,
      avgRating : 5.0,
    });
    await initData('/user/createUser', {
      phone: '0834567894',
      isoCode: 'TH',
      resetUser: true,
      taskDone: 100,
      avgRating : 5.0,
    });
    await initData('/user/createUser', {
      phone: '0834567895',
      isoCode: 'TH',
      resetUser: true,
      taskDone: 100,
      avgRating : 5.0,
    });
    await initData('/user/createUser', {
      phone: '0834567896',
      isoCode: 'TH',
      resetUser: true,
      taskDone: 100,
      avgRating : 5.0,
    });
    await initData('/user/createUser', {
      phone: '0834567897',
      isoCode: 'TH',
      resetUser: true,
      taskDone: 100,
      avgRating : 5.0,
    });
    await initData('/user/createUser', {
      phone: '0834567898',
      isoCode: 'TH',
      resetUser: true,
      taskDone: 100,
      avgRating : 5.0,
    });
    await initData('/user/createUser', {
      phone: '0834567899',
      isoCode: 'TH',
      resetUser: true,
      taskDone: 100,
      avgRating : 5.0,
    });
    await initData('/user/createUser', {
      phone: '0834567881',
      isoCode: 'TH',
      resetUser: true,
      taskDone: 100,
      avgRating : 5.0,
    });
    await initData('/user/createUser', {
      phone: '0834567882',
      isoCode: 'TH',
      resetUser: true,
      taskDone: 100,
      avgRating : 5.0,
    });
    await initData('/user/createUser', {
      phone: '0777777777',
      isoCode: 'TH',
      resetUser: true,
      type: "ASKER",
      name: "Kaiser"
    });
    await initData("user/updateUser", { phone: "0834567891", isoCode: "TH", dataUpdate: { favouriteTasker: [] } });

    await initData("user/updateUser", { phone: "0834567891", isoCode: "TH", dataUpdate: { status: "ACTIVE" } });
    await initData('update-user/financialAccount', { phone: "0834567891", isoCode: "TH", financialAccountData: { TH_FMainAccount: 3000, TH_Promotion: 2000 } })
    await initData('th/update/settingSystem', {
      limitNumberTaskerAcceptTask: 10,
    });
  });

  it("LINE 42 - Tasker accept task with limitNumberTaskerAcceptTask", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      acceptedTasker: [
        { phone: "0834567892" },
        { phone: "0834567893" },
        { phone: "0834567894" },
        { phone: "0834567895" },
        { phone: "0834567896" },
        { phone: "0834567897" },
        { phone: "0834567898" },
        { phone: "0834567899" },
        { phone: "0834567881" },
        { phone: "0834567882" },
      ],
      description: "My Task",
      chooseTasker: true,
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await expectElementNotExist("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Rất tiếc", "text");
    await waitForElement('Công việc này đã có quá nhiều người nhận. Bạn vui lòng nhận công việc khác!', 1000, "text");
    await waitForElement('Đóng', 1000, "text");
    await tapText("Đóng");
  });

  it("LINE 149 - FAV Tasker accept task with limitNumberTaskerAcceptTask", async () => {
    const tasker = await initData("user/get-user", { phone: "0834567891", isoCode: "TH" });
    await initData("user/updateUser", { phone: "0777777777", isoCode: "TH", dataUpdate: { favouriteTasker: [tasker._id] } });
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      askerPhone: "0777777777",
      acceptedTasker: [
        { phone: "0834567892" },
        { phone: "0834567893" },
        { phone: "0834567894" },
        { phone: "0834567895" },
        { phone: "0834567896" },
        { phone: "0834567897" },
        { phone: "0834567898" },
        { phone: "0834567899" },
        { phone: "0834567881" },
        { phone: "0834567882" },
      ],
      description: "My Task",
      chooseTasker: true,
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await expectElementNotExist("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Nhận công việc thành công. Đang chờ Khách hàng xác nhận", "text");
    await waitForElement("Đóng", 1000, "text");
    await tapText("Đóng");
    await tapId("btnShowAllTaskWaiting");
    await waitForElement("Công việc đang chờ", 1000, 'text');
    await tapId("btnSeeDetailTaskWaiting_My Task");
    await waitForElement("Rút khỏi công việc", 1000, 'text');
  });

});
