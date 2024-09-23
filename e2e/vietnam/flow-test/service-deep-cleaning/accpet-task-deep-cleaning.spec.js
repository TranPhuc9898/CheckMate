/**
 * @author HuuToan
 * @email [huutoan.nguyen@btaskee.com]
 * @create date 2022-10-11 17:00:42
 * @modify date 2022-10-11 17:00:42
 * @desc [Tasker accept tassk cleaing vn]
 * case 1: Tasker see and accept task deep cleaning th, see in waiting task
 * case 2: Tasker see and accept task deep cleaning th, see in confirmed task -> tasker is member
 * case 3: Tasker see and accept task deep cleaning th, see in confirmed task -> tasker is leader
 * case 4: Tasker can not accept task if number of TaskDone < 20
 * case 5: Tasker can not accept task if AvgRating = 4.6
 * case 6: Accept task deep cleaning limit is 2 with status confirm
 */

const {
  tapId,
  expectElementVisible,
  initData,
  tapText,
  waitForElement,
  swipe,
  tapHeaderBack,
  expectElementNotExist,
  scroll,
} = require("../../../step-definitions");
const moment = require("moment");

describe("FILE: vietnam/flow-test/service-deep-cleaning/accept-task-deep-cleaning.spec.js - Tasker accept task deep cleaning vn", () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData("update-user/financialAccount", {
      phone: "0834567899",
      isoCode: "VN",
      financialAccountData: { FMainAccount: 3000000, Promotion: 20000000 },
    });
    await initData("user/updateUser", {
      phone: "0834567899",
      isoCode: "VN",
      dataUpdate: { taskDone: 50, avgRating: 5 },
    });
  });

  it("LINE 81 - Tasker see and accept task deep cleaning vn, see in waiting task", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "DEEP_CLEANING",
      viewedTaskers: ["0834567899"],
      description: "My Task",
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await waitForElement("Số người đã nhận công việc: 0/3", 1000, "text");
    await swipe("swipeBtn", "right");
    await expectElementVisible(
      "Nhận công việc thành công. Đang chờ Khách hàng xác nhận",
      "text"
    );
    await tapId("btnClose");
    await expectElementNotExist("newTask_My Task");
    await tapId("btnShowAllTaskWaiting");
    await expectElementVisible("taskWaitingMy Task");
    await tapId("btnSeeDetailTaskWaiting_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btnDrawTask");
  });

  // Lỗi
  it("LINE 67 - Tasker see and accept task deep cleaning th, see in confirmed task -> tasker is member", async () => {
    const refUser = await initData("/user/createUser", {
      phone: "0834567999",
      isoCode: "VN",
      resetUser: true,
      taskDone: 100,
      avgRating: 5.0,
    });

    const ref = await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "DEEP_CLEANING",
      viewedTaskers: ["0834567899"],
      status: "WAITING_ASKER_CONFIRMATION",
      description: "My Task",
    });

    await initData("vn/updateTask", {
      taskId: ref.taskId,
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
            main: 200000.0,
            total: 200000.0,
          },
          costPerLeaderTasker: {
            main: 200000.0,
            total: 200000.0,
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
    await expectElementVisible("callTasker0");
    await swipe("scrollTaskDetail", "up");
    await expectElementNotExist("btn_chat");
    await expectElementNotExist("btn_call");
    await expectElementVisible("btn_cancel");
  });

  it("LINE 130 - Tasker see and accept task deep cleaning vn, see in confirmed task -> tasker is leader", async () => {
    const refUser = await initData("/user/createUser", {
      phone: "0834567999",
      isoCode: "VN",
      resetUser: true,
      avgRating: 5.0,
    });
    const ref = await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "DEEP_CLEANING",
      viewedTaskers: ["0834567899"],
      status: "POSTED",
      description: "My Task",
    });
    await initData("vn/updateTask", {
      taskId: ref.taskId,
      dataUpdate: {
        acceptedTasker: [
          {
            taskerId: refUser.userId,
            name: "TASKER GUEST",
            avgRating: 5.0,
            taskDone: 20,
          },
        ],
        detailDeepCleaning: {
          numberOfTaskersDeepCleaning: 2,
          areaDeepCleaning: 150.0,
          costPerTasker: {
            main: 50000.0,
            total: 50000.0,
          },
          costPerLeaderTasker: {
            main: 50000.0,
            total: 50000.0,
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
    // await expectElementVisible("Nhận công việc thành công", "text");
    // await tapId("btnClose");
    await tapHeaderBack();
    await tapId("confirmTask_My Task");
    await scroll("scrollTaskDetail", 100, "down");
    await expectElementVisible("callTasker1");
    await expectElementNotExist("callTasker0");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
  });

  it("LINE 190 - Tasker see and accept task deep cleaning vn has newCostDetail, see in confirmed task -> tasker is leader", async () => {
    const refUser = await initData("/user/createUser", {
      phone: "0834567999",
      isoCode: "VN",
      resetUser: true,
      avgRating: 5.0,
    });
    const refUser2 = await initData("/user/createUser", {
      phone: "0834567991",
      isoCode: "VN",
      resetUser: true,
      avgRating: 5.0,
    });
    const ref = await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "DEEP_CLEANING",
      viewedTaskers: ["0834567899"],
      status: "POSTED",
      description: "My Task",
    });
    await initData("vn/updateTask", {
      taskId: ref.taskId,
      dataUpdate: {
        "costDetail": {
          "baseCost": 1200000.0,
          "cost": 1200000.0,
          "finalCost": 1200000.0,
          "duration": 4.0,
          "currency": {
            "sign": "₫",
            "code": "VND"
          },
          "transportFee": 0.0,
          "depositMoney": 0.0,
          "newFinalCost": 1520000.0
        },
        "newCostDetail": {
          "baseCost": 1500000.0,
          "cost": 1520000.0,
          "finalCost": 1520000.0,
          "increaseReasons": [
            {
              "key": "EMERGENCY_TASK_FEE",
              "value": 20000.0
            }
          ],
          "duration": 5.0,
          "currency": {
            "sign": "₫",
            "code": "VND"
          },
          "isIncrease": true,
          "transportFee": 0.0,
          "depositMoney": 0.0,
          "newFinalCost": 0.0
        },
        acceptedTasker: [
          {
            taskerId: refUser.userId,
            name: "TASKER GUEST",
            avgRating: 5.0,
            taskDone: 20,
          },
          {
            taskerId: refUser2.userId,
            name: "TASKER GUEST",
            avgRating: 5.0,
            taskDone: 20,
          },
        ],
        "detailDeepCleaning": {
          "numberOfTaskersDeepCleaning": 3,
          "areaDeepCleaning": 150.0,
          "costPerTasker": {
            "main": 400000.0,
            "total": 400000.0
          },
          "costPerLeaderTasker": {
            "main": 400000.0,
            "total": 400000.0
          },
          "newCostPerTasker": {
            "main": 506666.0,
            "total": 506666.0
          },
          "newCostPerLeaderTasker": {
            "main": 506668.0,
            "total": 506668.0
          }
        },
      },
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await tapHeaderBack();
    await tapId("confirmTask_My Task");
    await scroll("scrollTaskDetail", 300, "down");
    await expectElementNotExist("callTasker0");
    await expectElementVisible("callTasker1");
    await expectElementVisible("callTasker2");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
  });

  // Hiện tại chỉ limit cho Việt Nam
  it("LINE 231 - Tasker can not accept task if number of TaskDone < 20", async () => {
    await initData("user/updateUser", {
      phone: "0834567899",
      isoCode: "VN",
      dataUpdate: { taskDone: 10 },
    });
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "DEEP_CLEANING",
      viewedTaskers: ["0834567899"],
      description: "My Task",
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Rất tiếc", "text");
    await expectElementVisible(
      "Bạn không thể nhận công việc này",
      "text"
    );
  });

  it("LINE 160 - Tasker can not accept task if AvgRating = 4.6", async () => {
    await initData("user/updateUser", {
      phone: "0834567899",
      isoCode: "VN",
      dataUpdate: { avgRating: 4 },
    });
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "DEEP_CLEANING",
      viewedTaskers: ["0834567899"],
      description: "My Task",
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Rất tiếc", "text");
    await expectElementVisible(
      "Bạn không thể nhận công việc này",
      "text"
    );
  });

  it("LINE 279 - Accept task deep cleaning limit is 2 with status confirm", async () => {
    await initData("vn/services/update", {
      serviceName: "DEEP_CLEANING",
      dataUpdate: {
        limitNumberAcceptTaskInDay: 2,
      },
    });
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "DEEP_CLEANING",
      viewedTaskers: ["0834567899"],
      description: "My Task",
      date: moment().add(1, "d").hour(6).minute(30).toDate(),
    });
    await initData("vn/task/createTask", {
      serviceName: "DEEP_CLEANING",
      acceptedTasker: "0834567899",
      description: "My Task1",
    });
    await initData("vn/task/createTask", {
      serviceName: "DEEP_CLEANING",
      acceptedTasker: "0834567899",
      description: "My Task2",
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible(
      "Bạn đã nhận quá nhiều công việc tổng vệ sinh trong ngày",
      "text"
    );
  });
});
