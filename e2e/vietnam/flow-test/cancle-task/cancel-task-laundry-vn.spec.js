/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-11 17:00:42
 * @modify date 2022-10-11 17:00:42
 * @desc [Tasker cancel task LAUNDRY vietnam]
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

describe("FILE: vietnam/flow-test/cancel-task/tasker-cancel-task-LAUNDRY-vn.spec.js - Tasker cancel task LAUNDRY vn", () => {
  beforeEach(async () => {
    await initData("vn/services/update", {
      serviceName: "LAUNDRY",
      dataUpdate: {
        minAvgRating: 4.6,
        minTaskDone: 20,
      },
    });
    await initData("vn/user/addUserToService", {
      phone: "0834567891",
      type: "INSERT",
      serviceName: "LAUNDRY",
    });

    await initData("update-user/financialAccount", {
      phone: "0834567891",
      isoCode: "VN",
      financialAccountData: { FMainAccount: 100000, Promotion: 1000 },
    });
    await initData("update-user/unset-fields", { phone: "0834567891", isoCode: "VN", fields: ["taskCancelByTasker"] });
    await device.launchApp();
  });

  afterEach(async () => {
    await initData("vn/user/addUserToService", {
      phone: "0834567891",
      type: "REMOVE",
      serviceName: "LAUNDRY",
    });
  });

  //  Tasker thấy Huỷ việc
  it("LINE 38 - Tasker see flow cancel", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "LAUNDRY",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      acceptedTasker: "0834567891",
    });
    await device.reloadReactNative();
    await waitForElement("TabTaskWaitingCollect", 1000);
    await tapId("TabTaskWaitingCollect");
    await waitForElement("weekdays_1", 500);
    await tapId("weekdays_1");
    await tapId("collectTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_cancel");
    await tapId("btn_cancel");
    await tapId("btnConfirmCancel");
    await expectElementNotExist("reasonCancelNEARBY_TASK_PLACE");
    await waitForElement("reasonCancelWRONG_DATE", 500);
    await waitForElement("reasonCancelOTHER_REASON", 500);
    await waitForElement("reasonCancelSO_FAR_AWAY", 500);
  });

  // Tasker  thấy huỷ việc và chọn huỷ với lý do NEARBY_TASK_PLACE mà không thành công
  it("LINE 87 - Tasker cancel task have reason NEARBY_TASK_PLACE", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "LAUNDRY",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      acceptedTasker: "0834567891",
      collectionDate: moment().subtract(5, "m").toDate(),
    });
    await device.reloadReactNative();
    await waitForElement("TabTaskWaitingCollect", 1000);
    await tapId("TabTaskWaitingCollect");
    await waitForElement("collectTask_My Task", 1000);
    await tapId("collectTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_cancel");
    await tapId("btn_cancel");
    await tapId("btnConfirmCancel");
    await waitForElement("reasonCancelNEARBY_TASK_PLACE", 500);
    await waitForElement("reasonCancelWRONG_DATE", 500);
    await waitForElement("reasonCancelOTHER_REASON", 500);
    await waitForElement("reasonCancelSO_FAR_AWAY", 500);
    await tapId("reasonCancelNEARBY_TASK_PLACE");
    await waitForElement(
      "Bạn không thể hủy với lý do này. Hệ thống chỉ chấp nhận lý do hủy này nếu bạn đang đứng gần nơi làm việc.",
      500,
      "text"
    );
  });

  it("LINE 70 - Tasker cancel task have fee", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "LAUNDRY",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      acceptedTasker: "0834567891",
      // date: moment().add(1, 'h').toDate(),
    });
    await device.reloadReactNative();
    await waitForElement("TabTaskWaitingCollect", 1000);
    await tapId("TabTaskWaitingCollect");
    await waitForElement("weekdays_1", 500);
    await tapId("weekdays_1");
    await tapId("collectTask_My Task");
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
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");
  });

  it("LINE 108 - Tasker cancel task with other reason", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "LAUNDRY",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      acceptedTasker: "0834567891",
    });
    await device.reloadReactNative();
    await waitForElement("TabTaskWaitingCollect", 1000);
    await tapId("TabTaskWaitingCollect");
    await waitForElement("weekdays_1", 1000);
    await tapId("weekdays_1");
    await tapId("collectTask_My Task");
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

  it("LINE 174 - Tasker cancel task Laundry and status task change to CANCELED", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "LAUNDRY",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      acceptedTasker: "0834567891",
      collectionDate: moment().add(1, "h").toDate(),
    });
    await device.reloadReactNative();
    await waitForElement("TabTaskWaitingCollect", 500);
    await tapId("TabTaskWaitingCollect");
    await tapId("collectTask_My Task");
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
  it("LINE 170 - Tasker cancel task and status task change to CANCELED", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "LAUNDRY",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      acceptedTasker: "0834567891",
      date: moment().add(1, "d").toDate(),
    });
    await device.reloadReactNative();
    await waitForElement("TabTaskWaitingCollect", 500);
    await tapId("TabTaskWaitingCollect");
    await waitForElement("weekdays_1", 500);
    await tapId("weekdays_1");
    await waitForElement("collectTask_My Task", 500);
    await tapId("collectTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_cancel");
    await tapId("btn_cancel");
    await tapId("btnConfirmCancel");
    await tapId("reasonCancelWRONG_DATE");
    await expectElementVisible("20,000₫", "text");
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");
    await tapText("Đóng");
    await tapId("TabAccount");
    // Kiểm tra lại tài khoản
    await tapId("Finance");
    await expectIdToHaveText('transactionHistory-0', '-20,000₫');
  });

  // cancelDate ≤ 2hourBeforeTaskDate → lateCancelFee (50%)
  it("LINE 230 - Tasker cancel task LAUNDRY and status task change to CANCELED", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "LAUNDRY",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      acceptedTasker: "0834567891",
      date: moment().add(3, "h").toDate(),
      collectionDate: moment().add(3, "h").toDate(),
    });
    await device.reloadReactNative();
    await waitForElement("TabTaskWaitingCollect", 500);
    await tapId("TabTaskWaitingCollect");
    await waitForElement("collectTask_My Task", 500);
    await tapId("collectTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_cancel");
    await tapId("btn_cancel");
    await tapId("btnConfirmCancel");
    await tapId("reasonCancelWRONG_DATE");
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");
    await tapText("Đóng");
    await tapId("TabAccount");
    // Kiểm tra lại tài khoản
    await tapId("Finance");
    await expectIdToHaveText('transactionHistory-0', '-50,000₫');
  });
  // cancelDate -> notCommingFee (100%)
  it("LINE 259 - Tasker cancel task LAUNDRY and status task change to CANCELED", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "LAUNDRY",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      acceptedTasker: "0834567891",
      date: moment().add(1, "h").toDate(),
      collectionDate: moment().add(1, "h").toDate(),
    });
    await device.reloadReactNative();
    await waitForElement("TabTaskWaitingCollect", 500);
    await tapId("TabTaskWaitingCollect");
    await waitForElement("collectTask_My Task", 500);
    await tapId("collectTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_cancel");
    await tapId("btn_cancel");
    await tapId("btnConfirmCancel");
    await tapId("reasonCancelWRONG_DATE");
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");
    await tapText("Đóng");
    await tapId("TabAccount");
    // Kiểm tra lại tài khoản
    await tapId("Finance");
    await expectIdToHaveText('transactionHistory-0', '-100,000₫');
  });

  // Huỷ việc cận giờ. Không liên lạc được với KH, có hỗ trợ tiền xăng - kiểm tra tài khoản.
  it("LINE 289 - Tasker cancel task and status task change to CANCELED", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "LAUNDRY",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      acceptedTasker: "0834567891",
      collectionDate: moment().subtract(1, "h").toDate(),
      lat: 37.33233141,
      lng: -122.0312186,
    });

    await device.reloadReactNative();
    await waitForElement("TabTaskWaitingCollect", 500);
    await tapId("TabTaskWaitingCollect");
    await waitForElement("collectTask_My Task", 500);
    await tapId("collectTask_My Task");
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

  // Không thể huỷ task khi đã nhận đồ từ KH
  it("LINE 330 - Tasker cancel task and status task change to CANCELED", async () => {
    const ref = await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "LAUNDRY",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      acceptedTasker: "0834567891",
      collectionDate: moment().subtract(1, "h").toDate(),
    });

    await initData("vn/updateTask", {
      taskId: ref.taskId,
      dataUpdate: {
        isPrepayTask: true,
        payment: {
          method: "CREDIT",
          status: "PAID",
        },
        costDetail: {
          baseCost: 100000.0,
          cost: 100000.0,
          finalCost: 80000.0,
          duration: 1,
          currency: {
            sign: "₫",
            code: "VN",
          },
        },
        promotion: {
          code: "DTHRZ1",
          value: {
            type: "MONEY",
            value: 20000.0,
          },
          decreasedCost: 80000.0,
          promotionValue: 20000.0,
        },
      },
    });
    await device.reloadReactNative();
    await waitForElement("TabTaskWaitingCollect", 500);
    await tapId("TabTaskWaitingCollect");
    await waitForElement("collectTask_My Task", 500);
    await tapId("collectTask_My Task");
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

  // cancelDate ≤ 2hourBeforeTaskDate → lateCancelFee (50%)
  it("LINE 388 - Tasker cancel task LAUNDRY and status task change to CANCELED", async () => {
    const ref = await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "LAUNDRY",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      acceptedTasker: "0834567891",
      date: moment().add(3, "h").toDate(),
    });
    await initData("vn/updateTask", {
      taskId: ref.taskId,
      dataUpdate: {
        detailLaundry: {
          "washing": {
            "type": "washing",
            "text": {
              "vi": "Giặt sấy",
              "en": "Normal Cleaning",
              "ko": "일반 세탁"
            },
            "dataV2": [
              {
                "type": "washing_1",
                "text": {
                  "vi": "Quần áo",
                  "en": "Clothes",
                  "ko": "의류"
                },
                "price": 17000,
                "quantity": 5,
                "unit": {
                  "vi": "kg",
                  "en": "kg",
                  "ko": "kg"
                }
              }
            ]
          },
          "isReceived": true
        },
      },
    });
    await device.reloadReactNative();
    await waitForElement("TabTaskWaitingCollect", 500);
    await tapId("TabTaskWaitingCollect");
    await expectElementNotExist("collectTask_My Task");
    await tapId("TabTaskLaundryWaitingReturn");
    await tapId("waitingReturnTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementNotExist("btn_cancel");
  });
});
