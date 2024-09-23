/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-11 17:00:42
 * @modify date 2022-10-11 17:00:42
 * @desc [Tasker cancel task DEEP_CLEANING vietnam]
 * case 1: Tasker cancel task not fee
 * case 2: Tasker cancel task have fee
 * case 3: Tasker cancel task with other reason
 * case 4: Tasker cancel task and status task change to POSTED
 * case 5: Tasker cancel task and status task change to CANCELED
 */

const {
  tapId,
  expectElementVisible,
  initData,
  waitForElement,
  swipe,
} = require("../../../step-definitions");

describe("FILE: vietnam/flow-test/cancel-task/tasker-cancel-task-DEEP_CLEANING-vn.spec.js - Tasker cancel task DEEP_CLEANING vn", () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData("update-user/financialAccount", {
      phone: "0834567899",
      isoCode: "TH",
      financialAccountData: { TH_FMainAccount: 100000, TH_Promotion: 1000 },
    });
    await initData("update-user/unset-fields", { phone: "0834567899", isoCode: "TH", fields: ["taskCancelByTasker"] });
  });

  //  Tasker Không huỷ được task deep cleaning
  it("LINE 34 - Tasker cant cancel task deep cleaning", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "DEEP_CLEANING",
      viewedTaskers: ["0834567899"],
      description: "My Task",
      acceptedTasker: "0834567899",
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("TabMyTask");
    await waitForElement("weekdays_1", 500);
    await tapId("weekdays_1");
    await tapId("confirmTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_cancel");
    await tapId("btn_cancel");
    await expectElementVisible(
      "Bạn không thể huỷ công việc này. Vui lòng liên hệ tổng đài để được hỗ trợ.",
      "text"
    );
  });
});