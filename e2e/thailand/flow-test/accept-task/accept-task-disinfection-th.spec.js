
/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-11 17:00:42
 * @modify date 2022-10-11 17:00:42
 * @desc [Tasker accept tassk cleaing vn]
 * case 1: Tasker accept task auto confirm and navigate to Chat
 * case 2: Tasker accept task not confirm and navigate to waiting confirm
 */

const {
  tapId,
  expectElementVisible,
  initData,
  tapText,
  waitForElement,
  swipe,
  tapHeaderBack,
  expectIdToHaveText,
} = require("../../../step-definitions");
const expect = require("chai").expect;

describe("FILE: flow-test/test-cast-th/accept-task/accept-task-DISINFECTION_SERVICE-th.spec.js - Tasker accept task DISINFECTION_SERVICE th", () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData("th/user/addUserToService", {
      phone: "0834567891",
      type: "INSERT",
      serviceName: "DISINFECTION_SERVICE"
    });
    await initData('update-user/financialAccount', { phone: "0834567891", isoCode: "TH", financialAccountData: { TH_FMainAccount: 10000, TH_Promotion: 10000 } })
  });
  // Thấy và nhận công việc
  it("LINE 38 - Tasker accept task DISINFECTION_SERVICE th", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "DISINFECTION_SERVICE",
      viewedTaskers: ["0834567891"],
      description: "My Task",
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
    await tapId("confirmTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("Chi tiết công việc", "text");
  });

  it("LINE 86 - Tasker accept task DISINFECTION_SERVICE dont see task conflict time", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "DISINFECTION_SERVICE",
      viewedTaskers: ["0834567891"],
      description: "My Task01",
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await waitForElement("newTask_My Task01", 1000);
    await tapId("newTask_My Task01");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Nhận công việc thành công", "text");
    await waitForElement("Đóng", 1000, "text");
    await tapText("Đóng");
    await tapHeaderBack();
    await tapId("confirmTask_My Task01");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("Chi tiết công việc", "text");
    await tapHeaderBack();
    await tapId("TabNewTask");
  });

  it("LINE 117 - Tasker accept task cleaning not enough money", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "DISINFECTION_SERVICE",
      viewedTaskers: ["0834567891"],
      description: "My Task",
    });
    await initData('update-user/financialAccount', { phone: "0834567891", isoCode: "TH", financialAccountData: { TH_FMainAccount: 10, TH_Promotion: 10 } })
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Rất tiếc", "text");
    await waitForElement('Đóng', 1000, "text");
    await tapText("Đóng");
  });

  it("LINE 114 - Tasker accept task have newCostDetail and not enough money", async () => {
    const ref = await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "DISINFECTION_SERVICE",
      viewedTaskers: ["0834567891"],
      description: "My Task01",
    });
    await initData('th/updateTask', {
      taskId: ref.taskId, dataUpdate: {
        "isPrepayTask": true,
        "payment": {
          "method": "VN_PAY",
          "status": "PAID",
        },
        "newCostDetail": {
          "baseCost": 350000.0,
          "cost": 345000.0,
          "finalCost": 345000.0,
          "decreasedReasons": [
            {
              "key": "DURATION_DISCOUNT",
              "value": 35000
            }
          ],
          "duration": 5.0,
          "currency": {
            "sign": "฿",
            "code": "THB"
          },
          "transportFee": 0.0,
          "depositMoney": 0.0,
          "newFinalCost": 0.0
        },
        "costDetail": {
          "baseCost": 1000,
          "cost": 1000,
          "finalCost": 1000,
          "duration": 4,
          "currency": {
            "sign": "฿",
            "code": "THB"
          },
          "newFinalCost": 345000.0
        }
      }
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task01");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Rất tiếc", "text");
    await waitForElement('Đóng', 1000, "text");
    await tapText("Đóng");
  });

  it("LINE 169 - Tasker accept task have newCostDetail", async () => {
    const ref = await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "DISINFECTION_SERVICE",
      viewedTaskers: ["0834567891"],
      description: "My Task01",
    });
    await initData('th/updateTask', {
      taskId: ref.taskId, dataUpdate: {
        "isPrepayTask": true,
        "payment": {
          "method": "VN_PAY",
          "status": "PAID",
        },
        "newCostDetail": {
          "baseCost": 2000.0,
          "cost": 2000.0,
          "finalCost": 2000.0,
          "decreasedReasons": [
            {
              "key": "DURATION_DISCOUNT",
              "value": 2000
            }
          ],
          "duration": 5.0,
          "currency": {
            "sign": "฿",
            "code": "THB"
          },
          "transportFee": 0.0,
          "depositMoney": 0.0,
          "newFinalCost": 0.0
        },
        "costDetail": {
          "baseCost": 1000,
          "cost": 1000,
          "finalCost": 1000,
          "duration": 4,
          "currency": {
            "sign": "฿",
            "code": "THB"
          },
          "newFinalCost": 2000.0
        }
      }
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task01");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Nhận công việc thành công", "text");
    await waitForElement("Đóng", 1000, "text");
    await tapText("Đóng");
    await tapHeaderBack();
    await tapId("confirmTask_My Task01");
    await expectElementVisible("Thu tiền mặt từ khách hàng", "text");
    await expectIdToHaveText('differenceCost', '1,000฿');
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("Chi tiết công việc", "text");
  });


});