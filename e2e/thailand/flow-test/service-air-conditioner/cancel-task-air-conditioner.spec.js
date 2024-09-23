/**
 * @author HuuToan
 * @email [huutoan.nguyen@btaskee.com]
 * @create date 2022-10-11 17:00:42
 * @modify date 2022-10-11 17:00:42
 * @desc [Tasker cancel task AIR_CONDITIONER_SERVICE thailand]
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

describe("FILE: thailand/flow-test/service-air-conditioner/cancel-task-air-conditioner.spec.js - Tasker cancel task air conditioner Viet Nam", () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData("update-user/financialAccount", {
      phone: "0834567892",
      isoCode: "TH",
      financialAccountData: { TH_FMainAccount: 100000, TH_Promotion: 1000 },
    });
    await initData("update-user/unset-fields", { phone: "0834567892", isoCode: "TH", fields: ["taskCancelByTasker"] });
    await initData('th/update/settingSystem', {
      cancelTaskFee: 200,
      supportGasolineMoney: 30,
      taskerNotCommingFee: {
        "earlyCancelFee": 200,
        "lateCancelFee": 50,
        "notCommingFee": 100
      }
    });
  });

  //  Tasker thấy Huỷ việc
  it("LINE 47 - Tasker cancel task not have reason NEARBY_TASK_PLACE", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0834567892",
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
  it("LINE 72 - Tasker cancel task have reason NEARBY_TASK_PLACE", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0834567892",
      date: moment().subtract(5, "m").toDate(),
      // lat: 37.33233141, lng: -122.0312186

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


  it("LINE 91 - Tasker cancel task A/C have fee", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0834567892",
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
    await expectIdToHaveText("cancelFee", "200฿")
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");
    await expectIdToHaveText('cancelTaskSuccess', 'Bạn hãy vào chọn một công việc mới phù hợp hơn nhé!');
  });

  it("LINE 131 - Tasker cancel task with other reason", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0834567892",
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

  it("LINE 159 - Tasker cancel task with other reason", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0834567892",
      date: moment().add(1, "h").toDate(),
      lat: 37.33233141, lng: -122.0312186,
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 500);
    await tapId("TabMyTask");
    await tapId("confirmTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_cancel");
    await tapId("btn_cancel");
    await tapId("btnConfirmCancel");
    await tapId("reasonCancelOTHER_REASON");
    await typeToTextField("textInputOtherReason", "Ban viec dot xuat");
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");
  });

  // cancelDate ≤ 8hourBeforeTaskDate → earlyCancleFee (200)
  it("LINE 184 - Tasker cancel task and cancel fee 200", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0834567892",
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
    await expectIdToHaveText("cancelFee", "200฿")
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");
    await tapText("Đóng");
    await tapId("TabAccount");
    // Kiểm tra lại tài khoản
    await tapId("Finance");
    await expectIdToHaveText('transactionHistory-0', '-200฿');
  });

  // cancelDate ≤ 2hourBeforeTaskDate → lateCancelFee (50%)
  it("LINE 212 - Tasker cancel task and cancel fee 50%", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0834567892",
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
    await expectIdToHaveText("cancelFee", "500฿")
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");
    await tapText("Đóng");
    await tapId("TabAccount");
    // Kiểm tra lại tài khoản
    await tapId("Finance");
    await expectIdToHaveText('transactionHistory-0', '-500฿');
  });

  // cancelDate -> notCommingFee (100%)
  it("LINE 237 - Tasker cancel task cancel fee 100%", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0834567892",
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
    await expectIdToHaveText("cancelFee", "1,000฿")
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");
    await tapText("Đóng");
    await tapId("TabAccount");
    // Kiểm tra lại tài khoản
    await tapId("Finance");
    await expectIdToHaveText('transactionHistory-0', '-1,000฿');
  });

  // Huỷ việc cận giờ. Không liên lạc được với KH, có hỗ trợ tiền xăng - kiểm tra tài khoản.
  it("LINE 279 - Canceling work on time. Unable to contact customer, support for gas money - check account.", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0834567892",
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
    await expectIdToHaveText('transactionHistory-0', '+30฿');
    await tapId("TransactionHistory");
    await expectElementVisible("Lịch sử giao dịch", "text");
    await expectIdToHaveText('detailTransaction-0', '+30฿');
  });

  // Huỷ việc và không thấy task trong new Task
  it("LINE 305 - Cancel the job and don't see the task in the new Task", async () => {
    const ref = await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0834567892",
      date: moment().subtract(1, "h").toDate(),
    });

    await initData('th/updateTask', {
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
            "sign": "฿",
            "code": "TH"
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

});