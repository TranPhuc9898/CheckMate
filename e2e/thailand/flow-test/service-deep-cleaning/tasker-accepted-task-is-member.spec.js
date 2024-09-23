/**
 * @author QuanNguyen
 * @create date 2022-10-11 17:00:42
 * @modify date 2022-10-11 17:00:42
 * @desc [Tasker accept task deep cleaning become member]
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
  tapText,
  waitForElement,
  swipe,
} = require("../../../step-definitions");

describe("FILE: thailand/flow-test/service-deep-cleaning/tasker-accepted-task-is-member.spec.js - Tasker accept task deep cleaning th", () => {
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
      taskDone: 100,
      avgRating: 5.0,
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
      },
    });
  });

  it("LINE 75 - Payment method is CASH", async () => {
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Bạn không có quyền xem đoạn chat", "text");
    await tapText("Đóng");
    await tapId("TabMyTask");
    await waitForElement("weekdays_1", 500);
    await tapId("weekdays_1");
    await tapId("confirmTask_My Task");
    await expectElementVisible("Thu tiền mặt", "text");
    await expectElementVisible("500฿", "text");
    await swipe("scrollTaskDetail", "up");
  });

  it("LINE 92 - Payment method is CASH have Promotion", async () => {
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
      },
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Bạn không có quyền xem đoạn chat", "text");
    await tapText("Đóng");
    await tapId("TabMyTask");
    await waitForElement("weekdays_1", 500);
    await tapId("weekdays_1");
    await tapId("confirmTask_My Task");
    await expectElementVisible("Thu tiền mặt", "text");
    await expectElementVisible("400฿", "text");
    await expectElementVisible("+100฿ Thêm vào TK khuyến mãi của bạn", "text");
  });

  it("LINE 128 - Payment method is prepayment method", async () => {
    await initData("th/updateTask", {
      description: "My Task",
      dataUpdate: {
        "isPrepayTask": true,
        "payment": {
          "method": "CREDIT",
          "status": "PAID",
        },
      },
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Bạn không có quyền xem đoạn chat", "text");
    await tapText("Đóng");
    await tapId("TabMyTask");
    await waitForElement("weekdays_1", 500);
    await tapId("weekdays_1");
    await tapId("confirmTask_My Task");
    await expectElementVisible("Chuyển khoản", "text");
    await expectElementVisible("500฿", "text");
  });

  it("LINE 154 - Payment method is prepayment method and have Promotion", async () => {
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
      },
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Bạn không có quyền xem đoạn chat", "text");
    await tapText("Đóng");
    await tapId("TabMyTask");
    await waitForElement("weekdays_1", 500);
    await tapId("weekdays_1");
    await tapId("confirmTask_My Task");
    await expectElementVisible("Chuyển khoản", "text");
    await expectElementVisible("400฿", "text");
    await expectElementVisible("+100฿ Thêm vào TK khuyến mãi của bạn", "text");
  });

  it("LINE 193 - Payment method is prepayment method and new cost", async () => {
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
      },
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Bạn không có quyền xem đoạn chat", "text");
    await tapText("Đóng");
    await tapId("TabMyTask");
    await waitForElement("weekdays_1", 500);
    await tapId("weekdays_1");
    await tapId("confirmTask_My Task");
    await expectElementVisible("Chuyển khoản", "text");
    await expectElementVisible("500฿", "text");
    await expectElementVisible("+100฿ Nhận thêm từ nhóm trưởng", "text");
  });

  it("LINE 240 - Payment method is prepayment method and new cost and TH_Promotion", async () => {
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
          "baseCost": 1000,
          "cost": 1000,
          "finalCost": 1000,
          "duration": 4,
          "currency": {
            "sign": "฿",
            "code": "THB"
          },
          "newFinalCost": 1000
        },
      },
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Bạn không có quyền xem đoạn chat", "text");
    await tapText("Đóng");
    await tapId("TabMyTask");
    await waitForElement("weekdays_1", 500);
    await tapId("weekdays_1");
    await tapId("confirmTask_My Task");
    // await expectElementVisible("Chuyển khoản", "text");
    await expectElementVisible("400฿", "text");
    await expectElementVisible("+100฿ Thêm vào TK khuyến mãi của bạn", "text");
    await expectElementVisible("+100฿ Nhận thêm từ nhóm trưởng", "text");
  });
});
