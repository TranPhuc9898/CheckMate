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

describe("FILE: flow-test/test-cast-th/accept-task/tasker-locked-accept-task.spec.js - Tasker locked", () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData("th/user/addUserToService", {
      phone: "0834567891",
      type: "INSERT",
      serviceName: "CLEANING"
    });
    await initData("user/updateUser", { phone: "0834567891", isoCode: "TH", dataUpdate: { status: "ACTIVE" } });
    await initData('update-user/financialAccount', { phone: "0834567891", isoCode: "TH", financialAccountData: { TH_FMainAccount: 3000, TH_Promotion: 2000 } })

  });

  it("LINE 42 - Tasker locked cant see new task", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task",
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await initData("user/updateUser", { phone: "0834567891", isoCode: "TH", dataUpdate: { status: "LOCKED" } });
    await device.reloadReactNative();
    await expectElementNotExist("newTask_My Task");
    await initData("user/updateUser", { phone: "0834567891", isoCode: "TH", dataUpdate: { status: "ACTIVE" } });
  });

  it("LINE 42 - Tasker locked cant see new task", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      acceptedTasker: "0834567891",
      description: "My Task",
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("TabMyTask");
    await waitForElement("weekdays_1", 500);
    await tapId("weekdays_1");
    await tapId("confirmTask_My Task");
    await initData("user/updateUser", { phone: "0834567891", isoCode: "TH", dataUpdate: { status: "LOCKED" } });
    await device.reloadReactNative();
    await tapId("TabMyTask");
    await waitForElement("weekdays_1", 500);
    await tapId("weekdays_1");
    await waitForElement("confirmTask_My Task", 1000);
    await initData("user/updateUser", { phone: "0834567891", isoCode: "TH", dataUpdate: { status: "ACTIVE" } });
  });

});
