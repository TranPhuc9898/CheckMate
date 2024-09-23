/**
 * @author HuuToan
 * @email [huutoan.nguyen@btaskee.com]
 * @create date 2022-10-11 17:00:42
 * @modify date 2022-10-11 17:00:42
 * @desc [Tasker cancel task cleaning vietnam]
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
  expectElementNotExist,
  typeToTextField,
  tapText,
  expectIdToHaveText,
} = require("../../../step-definitions");
const moment = require("moment");
const expect = require("chai").expect;

describe("FILE: vietnam/flow-test/service-cleaning/cancel-task-cleaning.spec.js - Tasker cancel task cleaning vn", () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData("update-user/financialAccount", {
      phone: "0834567891",
      isoCode: "VN",
      financialAccountData: { FMainAccount: 100000, Promotion: 1000 },
    });
    await initData("update-user/unset-fields", { phone: "0834567891", isoCode: "VN", fields: ["taskCancelByTasker"] });
  });

  //  Tasker thấy Huỷ việc
  it("LINE 40 - Tasker cancel task CLEANING not have reason NEARBY_TASK_PLACE", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      acceptedTasker: "0834567891",
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
    await tapId("btnConfirmCancel");
    await expectElementNotExist("reasonCancelNEARBY_TASK_PLACE");
    await waitForElement("reasonCancelWRONG_DATE", 500);
    await waitForElement("reasonCancelOTHER_REASON", 500);
    await waitForElement("reasonCancelSO_FAR_AWAY", 500);
  });

  // Tasker  thấy huỷ việc và chọn huỷ với lý do NEARBY_TASK_PLACE
  it("LINE 65 - Tasker cancel task have reason NEARBY_TASK_PLACE", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      acceptedTasker: "0834567891",
      date: moment().subtract(5, "m").toDate(),
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("TabMyTask");
    await tapId("confirmTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_cancel");
    await tapId("btn_cancel");
    await tapId("btnConfirmCancel");
    await waitForElement("reasonCancelNEARBY_TASK_PLACE", 500);
    await waitForElement("reasonCancelWRONG_DATE", 500);
    await waitForElement("reasonCancelOTHER_REASON", 500);
    await waitForElement("reasonCancelSO_FAR_AWAY", 500);
    await tapId("reasonCancelNEARBY_TASK_PLACE");
    await waitForElement("Bạn không thể hủy với lý do này. Hệ thống chỉ chấp nhận lý do hủy này nếu bạn đang đứng gần nơi làm việc.", 500, 'text');
  });


  it("LINE 70 - Tasker cancel task have fee", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      acceptedTasker: "0834567891",
      // date: moment().add(1, 'h').toDate(),
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
    await tapId("btnConfirmCancel");
    //   await waitForElement("reasonCancelNEARBY_TASK_PLACE", 500);
    await waitForElement("reasonCancelWRONG_DATE", 500);
    await waitForElement("reasonCancelOTHER_REASON", 500);
    await waitForElement("reasonCancelSO_FAR_AWAY", 500);
    await tapId("reasonCancelWRONG_DATE");
    await expectElementVisible("txtReasonCancelIs");
    await expectElementVisible("cancelFee");
    await expectIdToHaveText("cancelFee", "20,000₫")
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");
    await expectIdToHaveText('cancelTaskSuccess', 'Bạn hãy vào chọn một công việc mới phù hợp hơn nhé!');
  });

  it("LINE 108 - Tasker cancel task with other reason", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      acceptedTasker: "0834567891",
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("TabMyTask");
    await waitForElement("weekdays_1", 1000);
    await tapId("weekdays_1");
    await tapId("confirmTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_cancel");
    await tapId("btn_cancel");
    await tapId("btnConfirmCancel");
    //   await waitForElement("reasonCancelNEARBY_TASK_PLACE", 500);
    await waitForElement("reasonCancelWRONG_DATE", 500);
    await waitForElement("reasonCancelOTHER_REASON", 500);
    await waitForElement("reasonCancelSO_FAR_AWAY", 500);
    await tapId("reasonCancelOTHER_REASON");
    await typeToTextField("textInputOtherReason", "Ban viec dot xuat");
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");
  });

  it("LINE 150 - Tasker cancel task cleaning and status task change to CANCELED", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      acceptedTasker: "0834567891",
      date: moment().add(1, "h").toDate(),
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 500);
    await tapId("TabMyTask");
    await tapId("confirmTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_cancel");
    await tapId("btn_cancel");
    await tapId("btnConfirmCancel");
    await expectElementNotExist("reasonCancelNEARBY_TASK_PLACE");
    await tapId("reasonCancelWRONG_DATE");
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");
  });

  // cancelDate ≤ 8hourBeforeTaskDate → earlyCancleFee (20000)
  it("LINE 174 - Tasker cancel task CLEANING and fee 20,000", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      acceptedTasker: "0834567891",
      date: moment().add(1, "d").toDate(),
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 500);
    await tapId("TabMyTask");
    await waitForElement("weekdays_1", 500);
    await tapId("weekdays_1");
    await waitForElement("confirmTask_My Task", 500);
    await tapId("confirmTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_cancel");
    await tapId("btn_cancel");
    await tapId("btnConfirmCancel");
    await tapId("reasonCancelWRONG_DATE");
    await expectIdToHaveText("cancelFee", "20,000₫")
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");
    await tapText("Đóng");
    await tapId("TabAccount");
    // Kiểm tra lại tài khoản
    await tapId("Finance");
    await expectIdToHaveText('transactionHistory-0', '-20,000₫');
  });

  // cancelDate ≤ 2hourBeforeTaskDate → lateCancelFee (50%)
  it("LINE 198 - Tasker cancel task cleaning and status task change to CANCELED", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      acceptedTasker: "0834567891",
      date: moment().add(3, "h").toDate(),
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 500);
    await tapId("TabMyTask");
    await waitForElement("confirmTask_My Task", 500);
    await tapId("confirmTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_cancel");
    await tapId("btn_cancel");
    await tapId("btnConfirmCancel");
    await tapId("reasonCancelWRONG_DATE");
    await expectIdToHaveText("cancelFee", "50,000₫")
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");
    await tapText("Đóng");
    await tapId("TabAccount");
    // Kiểm tra lại tài khoản
    await tapId("Finance");
    await expectIdToHaveText('transactionHistory-0', '-50,000₫');
  });
  // cancelDate -> notCommingFee (100%)
  it("LINE 227 - Tasker cancel task cleaning and status task change to CANCELED", async () => {
    await initData('vn/update-user/remove-transaction', { phone: "0834567891" });
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      acceptedTasker: "0834567891",
      date: moment().add(1, "h").toDate(),
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 500);
    await tapId("TabMyTask");
    await waitForElement("confirmTask_My Task", 500);
    await tapId("confirmTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_cancel");
    await tapId("btn_cancel");
    await tapId("btnConfirmCancel");
    await tapId("reasonCancelWRONG_DATE");
    await expectIdToHaveText("cancelFee", "100,000₫")
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");
    await tapText("Đóng");
    await tapId("TabAccount");
    // Kiểm tra lại tài khoản
    await tapId("Finance");
    await expectIdToHaveText('transactionHistory-0', '-100,000₫');
  });

  // Huỷ việc cận giờ. Không liên lạc được với KH, có hỗ trợ tiền xăng - kiểm tra tài khoản.
  it("LINE 247 - Tasker cancel task and status task change to CANCELED", async () => {
    await initData('vn/update-user/remove-transaction', { phone: "0834567891" });
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      acceptedTasker: "0834567891",
      date: moment().subtract(1, "h").toDate(),
      lat: 37.33233141, lng: -122.0312186
    });

    await device.reloadReactNative();
    await waitForElement("TabMyTask", 500);
    await tapId("TabMyTask");
    await waitForElement("confirmTask_My Task", 500);
    await tapId("confirmTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_cancel");
    await tapId("btn_cancel");
    await tapId("btnConfirmCancel");
    await tapId("reasonCancelNEARBY_TASK_PLACE");
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");
    await tapText("Đóng");
    // Kiểm tra trong db thì  supportGasolineMoney đã được hỗ trợ
    // tab vào account để kiểm tra tài khoản khuyến mãi
    await waitForElement("TabAccount", 500);
    await tapId("TabAccount");
    // Kiểm tra lại tài khoản
    await expectElementVisible("Tài chính", "text");
    await expectElementVisible("Tài khoản chính", "text");
    await waitForElement("Finance", 500);
    await tapId("Finance");
    await expectIdToHaveText('transactionHistory-0', '+30,000₫');
    await tapId("TransactionHistory");
    await expectElementVisible("Lịch sử giao dịch", "text");
    await expectIdToHaveText('detailTransaction-0', '+30,000₫');
  });

  // Huỷ việc và không thấy task trong new Task
  it("LINE 289 - Tasker cancel task and status task change to CANCELED", async () => {
    const ref = await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      acceptedTasker: "0834567891",
      date: moment().subtract(1, "h").toDate(),
    });

    await initData('vn/updateTask', {
      taskId: ref.taskId, dataUpdate: {
        "isPrepayTask": true,
        "payment": {
          "method": "CREDIT",
          "status": "PAID",
        },
        "costDetail": {
          "baseCost": 100000.0,
          "cost": 100000.0,
          "finalCost": 80000.0,
          "duration": 1,
          "currency": {
            "sign": "₫",
            "code": "VN"
          },
        },
        "promotion": {
          "code": "DTHRZ1",
          "value": {
            "type": "MONEY",
            "value": 20000.0,
          },
          "decreasedCost": 80000.0,
          "promotionValue": 20000.0,
        },
      }
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 500);
    await tapId("TabMyTask");
    await waitForElement("confirmTask_My Task", 500);
    await tapId("confirmTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_cancel");
    await tapId("btn_cancel");
    await tapId("btnConfirmCancel");
    await tapId("reasonCancelWRONG_DATE");
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");
    await tapText("Đóng");
    await waitForElement("TabNewTask", 500);
    await tapId("TabNewTask");
    await expectElementVisible("Chưa có công việc mới nào", "text");
  });

  // Cancle task subscriptionId
  it("LINE 365 - Tasker cancel task and status task change to CANCELED", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      acceptedTasker: "0834567891",
      subscriptionId: "abc",
      // hoàn thành công việc ngay
      date: moment().subtract(1, "h").minute(0).toDate(),
      duration: 2
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 500);
    await tapId("TabMyTask");
    await waitForElement("confirmTask_My Task", 500);
    await tapId("confirmTask_My Task");
    await expectElementVisible("subscription", 500)
    await expectElementVisible("Công việc gói", "text");
    await swipe("scrollTaskDetail", "up");
    // await expectElementVisible("btnBeginWork");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await tapId("btn_cancel");
    await tapId("btnConfirmCancel");
    await waitForElement("reasonCancelNEARBY_TASK_PLACE", 500);
    await waitForElement("reasonCancelWRONG_DATE", 500);
    await waitForElement("reasonCancelOTHER_REASON", 500);
    await waitForElement("reasonCancelSO_FAR_AWAY", 500);
    await tapId("reasonCancelNEARBY_TASK_PLACE");
    await waitForElement("Bạn không thể hủy với lý do này. Hệ thống chỉ chấp nhận lý do hủy này nếu bạn đang đứng gần nơi làm việc.", 500, 'text');
    // Tap vào account để xem phần cộng tiền 

  });
});