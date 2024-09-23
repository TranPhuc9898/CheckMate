/**
 * @author HuuToan
 * @email [huutoan.nguyen@btaskee.com]
 * @create date 2022-10-11 17:00:42
 * @modify date 2022-10-11 17:00:42
 * @desc [Tasker accept tassk cleaing th]
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

describe("FILE: vietnam/flow-test/service-deep-cleaning/accept-task-deep-cleaning.spec.js - Tasker accept task deep cleaning th", () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData("update-user/financialAccount", {
      phone: "0834567899",
      isoCode: "TH",
      financialAccountData: { TH_FMainAccount: 3000, TH_Promotion: 200 },
    });
    await initData("user/updateUser", {
      phone: "0834567899",
      isoCode: "TH",
      dataUpdate: { taskDone: 50, avgRating: 5 },
    });
  });

  it("LINE 81 - Tasker see and accept task deep cleaning th, see in waiting task", async () => {
    await initData("th/task/createTask", {
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
      isoCode: "TH",
      resetUser: true,
      taskDone: 100,
      avgRating: 5.0,
    });

    const ref = await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "DEEP_CLEANING",
      viewedTaskers: ["0834567899"],
      status: "WAITING_ASKER_CONFIRMATION",
      description: "My Task",
    });

    await initData("th/updateTask", {
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
            main: 2000.0,
            total: 2000.0,
          },
          costPerLeaderTasker: {
            main: 2000.0,
            total: 2000.0,
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

  it("LINE 132 - Tasker see and accept task deep cleaning th, see in confirmed task -> tasker is leader", async () => {
    const refUser = await initData("/user/createUser", {
      phone: "0834567999",
      isoCode: "TH",
      resetUser: true,
      avgRating: 5.0,
    });
    const ref = await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "DEEP_CLEANING",
      viewedTaskers: ["0834567899"],
      status: "POSTED",
      description: "My Task",
    });
    await initData("th/updateTask", {
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
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
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

  it("LINE 189 - Tasker see and accept task deep cleaning th has newCostDetail, see in confirmed task -> tasker is leader", async () => {
    const refUser = await initData("/user/createUser", {
      phone: "0834567999",
      isoCode: "TH",
      resetUser: true,
      avgRating: 5.0,
    });
    const refUser2 = await initData("/user/createUser", {
      phone: "0834567991",
      isoCode: "TH",
      resetUser: true,
      avgRating: 5.0,
    });
    const ref = await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "DEEP_CLEANING",
      viewedTaskers: ["0834567899"],
      status: "POSTED",
      description: "My Task",
    });
    await initData("th/updateTask", {
      taskId: ref.taskId,
      dataUpdate: {
        "costDetail": {
          "baseCost": 1200.0,
          "cost": 1200.0,
          "finalCost": 1200.0,
          "duration": 4.0,
          "currency": {
            "sign": "฿",
            "code": "THB"
          },
          "transportFee": 0.0,
          "depositMoney": 0.0,
          "newFinalCost": 1520.0
        },
        "newCostDetail": {
          "baseCost": 1500.0,
          "cost": 1520.0,
          "finalCost": 1520.0,
          "increaseReasons": [
            {
              "key": "EMERGENCY_TASK_FEE",
              "value": 20.0
            }
          ],
          "duration": 5.0,
          "currency": {
            "sign": "฿",
            "code": "THB"
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
            "main": 4000.0,
            "total": 4000.0
          },
          "costPerLeaderTasker": {
            "main": 4000.0,
            "total": 4000.0
          },
          "newCostPerTasker": {
            "main": 5066.0,
            "total": 5066.0
          },
          "newCostPerLeaderTasker": {
            "main": 5068.0,
            "total": 5068.0
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

  it("LINE 298 - Accept task deep cleaning limit is 2 with status confirm", async () => {
    await initData("th/services/update", {
      serviceName: "DEEP_CLEANING",
      dataUpdate: {
        limitNumberAcceptTaskInDay: 2,
      },
    });
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "DEEP_CLEANING",
      viewedTaskers: ["0834567899"],
      description: "My Task",
      date: moment().add(1, "d").hour(6).minute(30).toDate(),
    });
    await initData("th/task/createTask", {
      serviceName: "DEEP_CLEANING",
      acceptedTasker: "0834567899",
      description: "My Task1",
    });
    await initData("th/task/createTask", {
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
