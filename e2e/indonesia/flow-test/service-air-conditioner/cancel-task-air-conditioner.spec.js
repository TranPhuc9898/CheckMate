/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-11 17:00:42
 * @modify date 2022-10-11 17:00:42
 * @desc [Tasker cancel task cleaning indo]
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

describe("FILE: indonesia/flow-test/cancel-task/tasker-cancel-task-cleaning.spec.js - Tasker cancel task cleaning th", () => {
  beforeEach(async () => {
    await initData('user/createUser', {
      phone: '0934567892',
      isoCode: 'ID',
      resetUser: true,
      company: "0834567892",
    });
    await initData("update-user/financialAccount", {
      phone: "0834567892",
      isoCode: "ID",
      financialAccountData: { ID_FMainAccount: 10000, ID_Promotion: 10000 },
    });
    await initData('id/update/settingSystem', {
      cancelTaskFee: 20000,
      supportGasolineMoney: 30000,
      taskerNotCommingFee: {
        "earlyCancelFee": 20000,
        "lateCancelFee": 50,
        "notCommingFee": 100
      }
    });
    await initData('id/update-user/remove-transaction', { phone: "0834567892" });
    await device.launchApp();
  });

  afterEach(async () => {
    await initData("update-user/unset-fields", { phone: "0834567892", isoCode: "ID", fields: ["employeeIds", "company"] });
  })

  it("LINE 35 - Tasker cancel task not have reson NEARBY_TASK_PLACE", async () => {
    await initData("id/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0934567892",
      company: "0834567892",
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

  it("LINE 83 - Tasker cancel task have reson NEARBY_TASK_PLACE", async () => {
    await initData("id/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0934567892",
      company: "0834567892",
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

  it("LINE 109 - Tasker cancel task have reson NEARBY_TASK_PLACE", async () => {
    await initData("id/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0934567892",
      company: "0834567892",
      date: moment().subtract(5, "m").toDate(),
      lat: 37.33233141, lng: -122.0312186
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
    await expectElementNotExist("Bạn không thể hủy với lý do này. Hệ thống chỉ chấp nhận lý do hủy này nếu bạn đang đứng gần nơi làm việc.", 'text');
    await waitForElement("Đã tới chỗ làm, cố gắng liên hệ khách hàng không được.", 500, 'text');
    await expectElementVisible("txtReasonCancelIs");
    await expectElementNotExist("cancelFee");
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");
  });

  it("LINE 70 - Tasker cancel task have fee", async () => {
    await initData("id/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0934567892",
      company: "0834567892",
      // date: moment().add(1, 'h').toDate(),
    });
    await initData('id/update/settingSystem', {
      cancelTaskFee: 200,
      taskerNotCommingFee: {
        "earlyCancelFee": 200,
        "lateCancelFee": 50,
        "notCommingFee": 100
      }
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
    await waitForElement("reasonCancelWRONG_DATE", 500);
    await waitForElement("reasonCancelOTHER_REASON", 500);
    await waitForElement("reasonCancelSO_FAR_AWAY", 500);
    await tapId("reasonCancelWRONG_DATE");
    await expectElementVisible("txtReasonCancelIs");
    await expectElementVisible("cancelFee");
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");
    // const notify = await initData("/notification/get-notification-indo", { phone: '0834567892', description: 'My Task' });
    // expect(notify[0].description).equal('Lý do hủy: Xem nhầm ngày. Tài khoản của bạn bị trừ 20,000 IDR theo qui định của bTaskee.');
  });

  it("LINE 108 - Tasker cancel task with other reason", async () => {
    await initData("id/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0934567892",
      company: "0834567892",
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
    await waitForElement("reasonCancelWRONG_DATE", 500);
    await waitForElement("reasonCancelOTHER_REASON", 500);
    await waitForElement("reasonCancelSO_FAR_AWAY", 500);
    await tapId("reasonCancelOTHER_REASON");
    await typeToTextField("textInputOtherReason", "Ban viec dot xuat");
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");
    // const notify = await initData("/notification/get-notification-indo", { phone: '0834567892', description: 'My Task' });
    // expect(notify[0].description).equal('Lý do hủy: Lý do bất khả kháng. Tài khoản của bạn bị trừ 20,000 IDR theo qui định của bTaskee.');
  });

  it("LINE 139 - Tasker cancel task and status task change to POSTED", async () => {
    await initData("id/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0934567892",
      company: "0834567892",
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 500);
    await tapId("TabMyTask");
    await waitForElement("weekdays_1", 500);
    await tapId("weekdays_1");
    await tapId("confirmTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_cancel");
    await tapId("btn_cancel");
    await tapId("btnConfirmCancel");
    await expectElementNotExist("reasonCancelNEARBY_TASK_PLACE");
  });

  it("LINE 224 - Tasker cancel task AIR_CONDITIONER_SERVICE and status task change to CANCELED", async () => {
    await initData("id/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0934567892",
      company: "0834567892",
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
  });

  // cancelDate ≤ 8hourBeforeTaskDate → earlyCancleFee (20000)
  it("LINE 246 - Tasker cancel task and status task change to CANCELED", async () => {
    await initData("id/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0934567892",
      company: "0834567892",
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
    await expectElementVisible("cancelFee");
    await expectElementVisible("20,000Rp", "text");
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");
  });

  // cancelDate ≤ 2hourBeforeTaskDate → lateCancelFee (50%)
  it("LINE 275 - Tasker cancel task and status task change to CANCELED", async () => {
    await initData("id/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0934567892",
      company: "0834567892",
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
    await expectElementVisible("cancelFee");
    await expectElementVisible("50,000Rp", "text");
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");

  });
  // cancelDate -> notCommingFee (100%)
  it("LINE 302 - Tasker cancel task and status task change to CANCELED", async () => {
    await initData("id/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0934567892",
      company: "0834567892",
      date: moment().add(1, "h").toDate(),
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 500);
    await tapId("TabMyTask");
    await waitForElement("weekdays_1", 500);
    await tapId("confirmTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_cancel");
    await tapId("btn_cancel");
    await tapId("btnConfirmCancel");
    await tapId("reasonCancelWRONG_DATE");
    await expectElementVisible("cancelFee");
    await expectIdToHaveText('cancelFee', '100,000Rp');
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");
  });

  // Huỷ việc cận giờ. Không liên lạc được với KH, có hỗ trợ tiền xăng - kiểm tra tài khoản.
  it("LINE 165 - Tasker cancel task and status task change to CANCELED", async () => {
    await initData("id/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0934567892",
      company: "0834567892",
      date: moment().subtract(1, "h").toDate(),
      lat: 37.33233141, lng: -122.0312186,
    });
    await initData('id/update/settingSystem', {
      supportGasolineMoney: 30000,
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 500);
    await tapId("TabMyTask");
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
    await expectIdToHaveText('transactionHistory-0', '+30,000Rp');
    await tapId("TransactionHistory");
    await expectElementVisible("Lịch sử giao dịch", "text");
    await expectIdToHaveText('detailTransaction-0', '+30,000Rp');
  });
  // Huỷ việc mất phí -> và số tiền bị mất
  it("LINE 345 - Tasker cancel task and status task change to CANCELED", async () => {
    await initData("id/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0934567892",
      company: "0834567892",

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
    await tapId("btnCancelTask");
    await expectElementVisible("cancelSuccess");
    await tapText("Đóng");
    // tab vào account để kiểm tra tài khoản khuyến mãi
    await waitForElement("TabAccount", 500);
    await tapId("TabAccount");
    // Kiểm tra lại tài khoản
    await expectElementVisible("Tài chính", "text");
    await expectElementVisible("Tài khoản chính", "text");
    await waitForElement("Finance", 500);
    await tapId("Finance");
    await expectIdToHaveText('transactionHistory-0', '-100,000Rp');
    await tapId("TransactionHistory");
    await expectElementVisible("Lịch sử giao dịch", "text");
    // Bị trừ tiền
    await expectElementVisible("Bạn không tới làm", "text");
    await expectIdToHaveText('detailTransaction-0', '-100,000Rp');
  });

  // Huỷ việc và không thấy task trong new Task
  it("LINE 382 - Tasker cancel task and status task change to CANCELED", async () => {
    const ref = await initData("id/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0934567892",
      company: "0834567892",
      date: moment().subtract(1, "h").toDate(),
    });

    await initData('id/updateTask', {
      taskId: ref.taskId, dataUpdate: {
        "isPrepayTask": true,
        "payment": {
          "method": "CREDIT",
          "status": "PAID",
        },
        "costDetail": {
          "baseCost": 1000.0,
          "cost": 1000.0,
          "finalCost": 800.0,
          "duration": 1,
          "currency": {
            "sign": "Rp",
            "code": "IDR"
          },
        },
        "promotion": {
          "code": "DTHRZ1",
          "value": {
            "type": "MONEY",
            "value": 200.0,
          },
          "decreasedCost": 800.0,
          "promotionValue": 200.0,
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

  // Company không có quyền bắt đầu công việc
  it("LINE 382 - Tasker cancel task and status task change to CANCELED", async () => {
    const ref = await initData("id/task/createTask", {

      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0934567892",
      company: "0834567892",
      // hoàn thành công việc ngay
      date: moment().add(0, "h").minute(0).toDate(),
      duration: 2
    });
    // Tạo task có cost: 1000 và promotion.value:200
    await initData('id/updateTask', {
      taskId: ref.taskId, dataUpdate: {
        "isPrepayTask": true,
        "payment": {
          "method": "CREDIT",
          "status": "PAID",
        },
        "costDetail": {
          "baseCost": 1000.0,
          "cost": 1000.0,
          "finalCost": 800.0,
          "duration": 1,
          "currency": {
            "sign": "Rp",
            "code": "IDR"
          },
        },
        "promotion": {
          "code": "DTHRZ1",
          "value": {
            "type": "MONEY",
            "value": 200.0,
          },
          "decreasedCost": 800.0,
          "promotionValue": 200.0,
        },
      }
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 500);
    await tapId("TabMyTask");
    await waitForElement("confirmTask_My Task", 500);
    await tapId("confirmTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btnBeginWork");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await tapId("btnBeginWork");
    await expectElementVisible("Bạn không có quyền bắt đầu công việc", "text");
    await tapText("Đóng");
  });

  //Company có thể bắt đầu công việc khi vừa là company, vừa là nhân viên
  it("LINE 382 - Tasker cancel task and status task change to CANCELED", async () => {
    await initData('id/update-user/remove-transaction', { phone: "0834567892" });
    const ref = await initData("id/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      acceptedTasker: "0834567892",
      company: "0834567892",
      // hoàn thành công việc ngay
      date: moment().minute(0).toDate(),
    });
    await initData("update-user/financialAccount", {
      phone: "0834567892",
      isoCode: "ID",
      financialAccountData: { ID_FMainAccount: 10000, ID_Promotion: 20000 },
    });
    // Tạo task có cost: 1000 và promotion.value:200
    await initData('id/updateTask', {
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
            "sign": "Rp",
            "code": "IDR"
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
    await expectElementVisible("btnBeginWork");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await tapId("btnBeginWork");
    await initData('id/update-user/remove-transaction', { phone: "0834567892" });
    await initData('id/updateTask', {
      taskId: ref.taskId, dataUpdate: {
        duration: 1,
        "date": moment().subtract(2, 'h').minute(0).toDate(),
      }
    });
    await waitForElement("confirmTask_My Task", 500);
    await tapId("confirmTask_My Task");
    await swipe("scrollTaskDetail", "up")
    await tapId("btnDoneTask");
    // Tap vào account để xem phần cộng tiền 
    await waitForElement("TabAccount", 500);
    await tapId("TabAccount");
    await expectElementVisible("Tài chính", "text");
    await expectElementVisible("Tài khoản chính", "text");
    await waitForElement("Finance", 500);
    await tapId("Finance");
    await expectElementVisible("Tài khoản chính", "text");
    // Được cộng thêm 800
    await expectElementVisible("+80,000Rp", "text");
    await expectElementVisible("+20,000Rp", "text");
    // Trừ 200 của 20% task
    await expectElementVisible("-20,000Rp", "text");
  });
});
