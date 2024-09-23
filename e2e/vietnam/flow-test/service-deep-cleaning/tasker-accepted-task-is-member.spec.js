/**
 * @author QuanNguyen
 * @create date 2022-10-11 17:00:42
 * @modify date 2022-10-11 17:00:42
 * @desc [Tasker accept task deep cleaning become member]
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
  tapText,
  waitForElement,
  swipe,
} = require("../../../step-definitions");

describe("FILE: vietnam/flow-test/service-deep-cleaning/tasker-accepted-task-is-member.spec.js - Tasker accept task deep cleaning vn", () => {
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
      taskDone: 100,
      avgRating: 5.0,
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
    await expectElementVisible("500,000₫", "text");
    await swipe("scrollTaskDetail", "up");
  });

  it("LINE 92 - Payment method is CASH have promotion", async () => {
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
    await expectElementVisible("400,000₫", "text");
    await expectElementVisible("+100,000₫ Thêm vào TK khuyến mãi của bạn", "text");
  });

  it("LINE 128 - Payment method is prepayment method", async () => {
    await initData("vn/updateTask", {
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
    await expectElementVisible("500,000₫", "text");
  });

  it("LINE 154 - Payment method is prepayment method and have promotion", async () => {
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
    await expectElementVisible("400,000₫", "text");
    await expectElementVisible("+100,000₫ Thêm vào TK khuyến mãi của bạn", "text");
  });

  it("LINE 193 - Payment method is prepayment method and new cost", async () => {
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
    await expectElementVisible("500,000₫", "text");
    await expectElementVisible("+100,000₫ Nhận thêm từ nhóm trưởng", "text");
  });

  it("LINE 240 - Payment method is prepayment method and new cost and promotion", async () => {
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
          "baseCost": 100000,
          "cost": 10000,
          "finalCost": 100000,
          "duration": 4,
          "currency": {
            "sign": "₫",
            "code": "VND"
          },
          "newFinalCost": 1000000
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
    await expectElementVisible("400,000₫", "text");
    await expectElementVisible("+100,000₫ Thêm vào TK khuyến mãi của bạn", "text");
    await expectElementVisible("+100,000₫ Nhận thêm từ nhóm trưởng", "text");
  });
});
