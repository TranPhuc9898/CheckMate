/**
 * @author QuanNguyen
 * @create date 2022-10-11 17:00:42
 * @modify date 2022-10-11 17:00:42
 * @desc [Tasker accept task deep cleaning become leader]
 * case 1: Payment method is CASH
 * case 2: Payment method is CASH have TH_Promotion
 * case 3: Payment method is prepayment method
 * case 4: Payment method is prepayment method and have TH_Promotion
 * case 5: Payment method is prepayment method and new cost
 * case 6: Payment method is prepayment method and new cost and TH_Promotion
 */

const {
  tapId,
  expectElementVisible,
  initData,
  waitForElement,
  swipe,
  tapHeaderBack,
  scroll,
} = require("../../../step-definitions");

describe("FILE: thailand/flow-test/service-deep-cleaning/tasker-accepted-task-is-leader.spec.js - Tasker accept task deep cleaning th", () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData("update-user/financialAccount", {
      phone: "0834567899",
      isoCode: "TH",
      financialAccountData: { TH_FMainAccount: 3000, TH_Promotion: 20000 },
    });
    // Get user
    const refUser = await initData("/user/createUser", {
      phone: "0834567999",
      isoCode: "TH",
      resetUser: true,
      taskDone: 10,
      avgRating: 4.0,
    });
    const task = await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "DEEP_CLEANING",
      viewedTaskers: ["0834567899"],
      status: "WAITING_ASKER_CONFIRMATION",
      description: "My Task",
    });
    await initData("th/updateTask", {
      taskId: task.taskId,
      dataUpdate: {
        acceptedTasker: [
          {
            taskerId: refUser.userId,
            name: "TASKER GUEST",
            avgRating: 5.0,
            taskDone: 6,
          },
        ],
        detailDeepCleaning: {
          numberOfTaskersDeepCleaning: 2,
          areaDeepCleaning: 150.0,
          costPerTasker: {
            main: 500.0,
            total: 500.0,
          },
          costPerLeaderTasker: {
            main: 500.0,
            total: 500.0,
          },
          newCostPerTasker: null,
          newCostPerLeaderTasker: null,
        },
        "costDetail": {
          "cost": 1000,
          "finalCost": 1000,
          "duration": 4,
          "currency": {
            "sign": "฿",
            "code": "THB"
          }
        }
      },
    });
  });

  it("LINE 85 - Payment method is CASH", async () => {
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await tapHeaderBack();
    await tapId("TabMyTask");
    await waitForElement("weekdays_1", 500);
    await tapId("weekdays_1");
    await tapId("confirmTask_My Task");
    await expectElementVisible("Thu tiền mặt", "text");
    await expectElementVisible("1,000฿", "text");
    await scroll("scrollTaskDetail", 300, "down");
    await expectElementVisible("Chuyển khoản: 500฿", "text");
  });

  it("LINE 102 - Payment method is CASH have TH_Promotion", async () => {
    await initData("th/updateTask", {
      description: "My Task",
      dataUpdate: {
        detailDeepCleaning: {
          numberOfTaskersDeepCleaning: 2,
          areaDeepCleaning: 150.0,
          costPerTasker: {
            main: 400.0,
            total: 500.0,
          },
          costPerLeaderTasker: {
            main: 400.0,
            total: 500.0,
          },
          newCostPerTasker: null,
          newCostPerLeaderTasker: null,
        },
        "costDetail": {
          "cost": 1000,
          "finalCost": 800,
          "duration": 4,
          "currency": {
            "sign": "฿",
            "code": "THB"
          }
        },
        "promotion": {
          "code": "DTHRZ1",
          "value": {
            "type": "MONEY",
            "value": 200.0,
          },
          "decreasedCost": 800.0,
          "promotionValue": 1000.0,
        },
      },
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await tapHeaderBack();
    await tapId("TabMyTask");
    await waitForElement("weekdays_1", 500);
    await tapId("weekdays_1");
    await tapId("confirmTask_My Task");
    await expectElementVisible("Thu tiền mặt", "text");
    await expectElementVisible("800฿", "text");
    await expectElementVisible("+200฿ Sẽ được chia đều và thêm vào tài khoản khuyến mãi của các thành viên.", "text");
    await scroll("scrollTaskDetail", 300, "down");
    await expectElementVisible("Chuyển khoản: 400฿", "text");
    await expectElementVisible("Khuyến mãi: 100฿", "text");
  });

  it("LINE 158 - Payment method is prepayment method", async () => {
    await initData("th/updateTask", {
      description: "My Task",
      dataUpdate: {
        "isPrepayTask": true,
        "payment": {
          "method": "CREDIT",
          "status": "PAID",
        },
        "costDetail": {
          "cost": 1000,
          "finalCost": 1000,
          "duration": 4,
          "currency": {
            "sign": "฿",
            "code": "THB"
          },
        },
      },
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await tapHeaderBack();
    await tapId("TabMyTask");
    await waitForElement("weekdays_1", 500);
    await tapId("weekdays_1");
    await tapId("confirmTask_My Task");
    await expectElementVisible("Chuyển khoản", "text");
    await expectElementVisible("1,000฿", "text");
    await scroll("scrollTaskDetail", 300, "down");
    await expectElementVisible("Chuyển khoản: 500฿", "text");
  });

  it("LINE 194 - Payment method is prepayment method and have TH_Promotion", async () => {
    await initData("th/updateTask", {
      description: "My Task",
      dataUpdate: {
        "isPrepayTask": true,
        "payment": {
          "method": "CREDIT",
          "status": "PAID",
        },
        detailDeepCleaning: {
          numberOfTaskersDeepCleaning: 2,
          areaDeepCleaning: 150.0,
          costPerTasker: {
            main: 400.0,
            total: 500.0,
          },
          costPerLeaderTasker: {
            main: 400.0,
            total: 500.0,
          },
        },
        "costDetail": {
          "cost": 1000,
          "finalCost": 800,
          "duration": 4,
          "currency": {
            "sign": "฿",
            "code": "THB"
          }
        }
      },
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await tapHeaderBack();
    await tapId("TabMyTask");
    await waitForElement("weekdays_1", 500);
    await tapId("weekdays_1");
    await tapId("confirmTask_My Task");
    // await expectElementVisible("Chuyển khoản", "text");
    await expectElementVisible("800฿", "text");
    await expectElementVisible("+200฿ Sẽ được chia đều và thêm vào tài khoản khuyến mãi của các thành viên.", "text");
    await scroll("scrollTaskDetail", 300, "down");
    await expectElementVisible("Chuyển khoản: 400฿", "text");
    await expectElementVisible("Khuyến mãi: 100฿", "text");
  });

  it("LINE 244 - Payment method is prepayment method and new cost", async () => {
    await initData("th/updateTask", {
      description: "My Task",
      dataUpdate: {
        "isPrepayTask": true,
        "payment": {
          "method": "CREDIT",
          "status": "PAID",
        },
        detailDeepCleaning: {
          numberOfTaskersDeepCleaning: 2,
          areaDeepCleaning: 150.0,
          costPerTasker: {
            main: 500.0,
            total: 500.0,
          },
          costPerLeaderTasker: {
            main: 500.0,
            total: 500.0,
          },
          newCostPerTasker: {
            main: 600.0,
            total: 600.0,
          },
          newCostPerLeaderTasker: {
            main: 600.0,
            total: 600.0,
          },
        },
        "costDetail": {
          "cost": 1000,
          "finalCost": 1000,
          "duration": 4,
          "currency": {
            "sign": "฿",
            "code": "THB"
          },
          "newFinalCost": 1000,
        },
        "newCostDetail": {
          "cost": 1200,
          "finalCost": 1200,
          "duration": 4,
          "currency": {
            "sign": "฿",
            "code": "THB"
          },
        },
      },
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await tapHeaderBack();
    await tapId("TabMyTask");
    await waitForElement("weekdays_1", 500);
    await tapId("weekdays_1");
    await tapId("confirmTask_My Task");
    await expectElementVisible("Chuyển khoản", "text");
    await expectElementVisible("1,000฿", "text");
    await expectElementVisible("+200฿ Thu tiền mặt từ khách hàng", "text");
    await scroll("scrollTaskDetail", 300, "down");
    await expectElementVisible("Chuyển khoản: 500฿", "text");
    await expectElementVisible("Tiền mặt: 100฿", "text");
    await expectElementVisible("Nhận thêm từ bạn: 100฿", "text");
  });

  it("LINE 313 - Payment method is prepayment method and new cost and Promotion", async () => {
    await initData("th/updateTask", {
      description: "My Task",
      dataUpdate: {
        "isPrepayTask": true,
        "payment": {
          "method": "CREDIT",
          "status": "PAID",
        },
        detailDeepCleaning: {
          numberOfTaskersDeepCleaning: 2,
          areaDeepCleaning: 150.0,
          costPerTasker: {
            main: 400.0,
            total: 500.0,
          },
          costPerLeaderTasker: {
            main: 400.0,
            total: 500.0,
          },
          newCostPerTasker: {
            main: 500.0,
            total: 600.0,
          },
          newCostPerLeaderTasker: {
            main: 500.0,
            total: 600.0,
          },
        },
        "costDetail": {
          "cost": 1000,
          "finalCost": 800,
          "duration": 4,
          "currency": {
            "sign": "฿",
            "code": "THB"
          },
          "newFinalCost": 1000,
        },
        "newCostDetail": {
          "cost": 1200,
          "finalCost": 1000,
          "duration": 4,
          "currency": {
            "sign": "฿",
            "code": "THB"
          },
        },
      },
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await tapHeaderBack();
    await waitForElement("weekdays_1", 500);
    await tapId("weekdays_1");
    await tapId("confirmTask_My Task");
    await expectElementVisible("Chuyển khoản", "text");
    await expectElementVisible("800฿", "text");
    await expectElementVisible("+200฿ Thu tiền mặt từ khách hàng", "text");
    await expectElementVisible("+200฿ Sẽ được chia đều và thêm vào tài khoản khuyến mãi của các thành viên.", "text");
    await scroll("scrollTaskDetail", 300, "down");
    await expectElementVisible("Chuyển khoản: 400฿", "text");
    await expectElementVisible("Khuyến mãi: 100฿", "text");
    await expectElementVisible("Tiền mặt: 100฿", "text");
    await expectElementVisible("Nhận thêm từ bạn: 100฿", "text");
  });
});
