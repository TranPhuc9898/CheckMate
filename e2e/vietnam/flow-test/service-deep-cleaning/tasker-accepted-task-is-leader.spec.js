/**
 * @author QuanNguyen
 * @create date 2022-10-11 17:00:42
 * @modify date 2022-10-11 17:00:42
 * @desc [Tasker accept task deep cleaning become leader]
 * case 1: Payment method is CASH
 * case 2: Payment method is CASH have promotion
 * case 3: Payment method is prepayment method
 * case 4: Payment method is prepayment method and have promotion
 * case 5: Payment method is prepayment method and new cost
 * case 6: Payment method is prepayment method and new cost and promotion
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

describe("FILE: vietnam/flow-test/service-deep-cleaning/tasker-accepted-task-is-leader.spec.js - Tasker accept task deep cleaning vn", () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData("update-user/financialAccount", {
      phone: "0834567899",
      isoCode: "VN",
      financialAccountData: { FMainAccount: 3000000, Promotion: 20000000 },
    });
    // Get user
    const refUser = await initData("/user/createUser", {
      phone: "0834567999",
      isoCode: "VN",
      resetUser: true,
      taskDone: 10,
      avgRating: 4.0,
    });
    const task = await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "DEEP_CLEANING",
      viewedTaskers: ["0834567899"],
      status: "WAITING_ASKER_CONFIRMATION",
      description: "My Task",
    });
    await initData("vn/updateTask", {
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
            main: 500000.0,
            total: 500000.0,
          },
          costPerLeaderTasker: {
            main: 500000.0,
            total: 500000.0,
          },
          newCostPerTasker: null,
          newCostPerLeaderTasker: null,
        },
        "costDetail": {
          "cost": 1000000,
          "finalCost": 1000000,
          "duration": 4,
          "currency": {
            "sign": "₫",
            "code": "VND"
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
    await expectElementVisible("1,000,000₫", "text");
    await scroll("scrollTaskDetail", 300, "down");
    await expectElementVisible("Chuyển khoản: 500,000₫", "text");
  });

  it("LINE 102 - Payment method is CASH have promotion", async () => {
    await initData("vn/updateTask", {
      description: "My Task",
      dataUpdate: {
        detailDeepCleaning: {
          numberOfTaskersDeepCleaning: 2,
          areaDeepCleaning: 150.0,
          costPerTasker: {
            main: 400000.0,
            total: 500000.0,
          },
          costPerLeaderTasker: {
            main: 400000.0,
            total: 500000.0,
          },
          newCostPerTasker: null,
          newCostPerLeaderTasker: null,
        },
        "costDetail": {
          "cost": 1000000,
          "finalCost": 800000,
          "duration": 4,
          "currency": {
            "sign": "₫",
            "code": "VND"
          }
        },
        "promotion": {
          "code": "DTHRZ1",
          "value": {
            "type": "MONEY",
            "value": 200000.0,
          },
          "decreasedCost": 800000.0,
          "promotionValue": 1000000.0,
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
    await expectElementVisible("800,000₫", "text");
    await expectElementVisible("+200,000₫ Sẽ được chia đều và thêm vào tài khoản khuyến mãi của các thành viên.", "text");
    await scroll("scrollTaskDetail", 300, "down");
    await expectElementVisible("Chuyển khoản: 400,000₫", "text");
    await expectElementVisible("Khuyến mãi: 100,000₫", "text");
  });

  it("LINE 158 - Payment method is prepayment method", async () => {
    await initData("vn/updateTask", {
      description: "My Task",
      dataUpdate: {
        "isPrepayTask": true,
        "payment": {
          "method": "CREDIT",
          "status": "PAID",
        },
        "costDetail": {
          "cost": 1000000,
          "finalCost": 1000000,
          "duration": 4,
          "currency": {
            "sign": "₫",
            "code": "VND"
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
    await expectElementVisible("1,000,000₫", "text");
    await scroll("scrollTaskDetail", 300, "down");
    await expectElementVisible("Chuyển khoản: 500,000₫", "text");
  });

  it("LINE 194 - Payment method is prepayment method and have promotion", async () => {
    await initData("vn/updateTask", {
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
            main: 400000.0,
            total: 500000.0,
          },
          costPerLeaderTasker: {
            main: 400000.0,
            total: 500000.0,
          },
        },
        "costDetail": {
          "cost": 1000000,
          "finalCost": 800000,
          "duration": 4,
          "currency": {
            "sign": "₫",
            "code": "VND"
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
    await expectElementVisible("800,000₫", "text");
    await expectElementVisible("+200,000₫ Sẽ được chia đều và thêm vào tài khoản khuyến mãi của các thành viên.", "text");
    await scroll("scrollTaskDetail", 300, "down");
    await expectElementVisible("Chuyển khoản: 400,000₫", "text");
    await expectElementVisible("Khuyến mãi: 100,000₫", "text");
  });

  it("LINE 244 - Payment method is prepayment method and new cost", async () => {
    await initData("vn/updateTask", {
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
            main: 500000.0,
            total: 500000.0,
          },
          costPerLeaderTasker: {
            main: 500000.0,
            total: 500000.0,
          },
          newCostPerTasker: {
            main: 600000.0,
            total: 600000.0,
          },
          newCostPerLeaderTasker: {
            main: 600000.0,
            total: 600000.0,
          },
        },
        "costDetail": {
          "cost": 1000000,
          "finalCost": 1000000,
          "duration": 4,
          "currency": {
            "sign": "₫",
            "code": "VND"
          },
          "newFinalCost": 1000000,
        },
        "newCostDetail": {
          "cost": 1200000,
          "finalCost": 1200000,
          "duration": 4,
          "currency": {
            "sign": "₫",
            "code": "VND"
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
    await expectElementVisible("1,000,000₫", "text");
    await expectElementVisible("+200,000₫ Thu tiền mặt từ khách hàng", "text");
    await scroll("scrollTaskDetail", 300, "down");
    await expectElementVisible("Chuyển khoản: 500,000₫", "text");
    await expectElementVisible("Tiền mặt: 100,000₫", "text");
    await expectElementVisible("Nhận thêm từ bạn: 100,000₫", "text");
  });

  it("LINE 313 - Payment method is prepayment method and new cost and promotion", async () => {
    await initData("vn/updateTask", {
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
            main: 400000.0,
            total: 500000.0,
          },
          costPerLeaderTasker: {
            main: 400000.0,
            total: 500000.0,
          },
          newCostPerTasker: {
            main: 500000.0,
            total: 600000.0,
          },
          newCostPerLeaderTasker: {
            main: 500000.0,
            total: 600000.0,
          },
        },
        "costDetail": {
          "cost": 1000000,
          "finalCost": 800000,
          "duration": 4,
          "currency": {
            "sign": "₫",
            "code": "VND"
          },
          "newFinalCost": 1000000,
        },
        "newCostDetail": {
          "cost": 1200000,
          "finalCost": 1000000,
          "duration": 4,
          "currency": {
            "sign": "₫",
            "code": "VND"
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
    await expectElementVisible("800,000₫", "text");
    await expectElementVisible("+200,000₫ Thu tiền mặt từ khách hàng", "text");
    await expectElementVisible("+200,000₫ Sẽ được chia đều và thêm vào tài khoản khuyến mãi của các thành viên.", "text");
    await scroll("scrollTaskDetail", 300, "down");
    await expectElementVisible("Chuyển khoản: 400,000₫", "text");
    await expectElementVisible("Khuyến mãi: 100,000₫", "text");
    await expectElementVisible("Tiền mặt: 100,000₫", "text");
    await expectElementVisible("Nhận thêm từ bạn: 100,000₫", "text");
  });
});
