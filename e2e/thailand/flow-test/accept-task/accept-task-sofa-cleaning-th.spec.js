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
  expectElementNotExist,
  expectIdToHaveText,
} = require("../../../step-definitions");
const moment = require('moment');

// Thấy công việc và nhận công việc 
describe("FILE: flow-test/test-cast-th/accept-task/accept-task-SofaCleaning-th.spec.js - Tasker accept task SofaCleaning th", () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData("th/user/addUserToService", {
      phone: "0834567891",
      type: "INSERT",
      serviceName: "SofaCleaning"
    });
    await initData('update-user/financialAccount', { phone: "0834567891", isoCode: "TH", financialAccountData: { TH_FMainAccount: 10000, TH_Promotion: 10000 } })
  });

  // tạo nhiều công việc với những ngày khác nhau -> sau khi nhấn nút filter thì công việc mới đăng sẽ được đưa lên đầu ( create at)
  it("LINE 38 - When the filter button is pressed, Tasker creates a lot of tasks, and the job is displayed at the top.", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "SofaCleaning",
      viewedTaskers: ["0834567891"],
      description: "My TaskSofaCleaning2",
      date: moment().add(2, "d").toDate()
    });
    await initData("th/task/createTask", {
      serviceName: "SofaCleaning",
      viewedTaskers: ["0834567891"],
      description: "My TaskSofaCleaning3",
      date: moment().add(3, "d").toDate()
    });
    await initData("th/task/createTask", {
      serviceName: "SofaCleaning",
      viewedTaskers: ["0834567891"],
      description: "My TaskSofaCleaning4",
      date: moment().add(4, "d").toDate()
    });
    await initData("th/task/createTask", {
      serviceName: "SofaCleaning",
      viewedTaskers: ["0834567891"],
      description: "My TaskSofaCleaning5",
      date: moment().add(5, "d").toDate()
    });
    await initData("th/task/createTask", {
      serviceName: "SofaCleaning",
      viewedTaskers: ["0834567891"],
      description: "My TaskSofaCleaning6",
      date: moment().add(6, "d").toDate()
    });
    await device.reloadReactNative();
    await waitForElement("btnFilter", 1000);
    await tapId("btnFilter");
    await waitForElement("btnFilterCreateAt", 1000);
    await tapId("btnFilterCreateAt");

    // Đã được sắp xếp
    await expectIdToHaveText('taskDate_0', moment().add(6, "d").format("DD/MM/YYYY"));
    await expectIdToHaveText('taskDate_1', moment().add(5, "d").format("DD/MM/YYYY"));
    await expectIdToHaveText('taskDate_2', moment().add(4, "d").format("DD/MM/YYYY"));
    await expectIdToHaveText('taskDate_3', moment().add(3, "d").format("DD/MM/YYYY"));
  });


  // tạo nhiều công việc với những ngày khác nhau -> sau khi nhấn nút filter thì công việc sắp làm sẽ được đưa lên đầu ( date )
  it("LINE 85 - When the filter button is pressed, Tasker creates a lot of tasks, and the job is displayed at the top.", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "SofaCleaning",
      viewedTaskers: ["0834567891"],
      description: "My TaskSofaCleaning2",
      date: moment().add(2, "d").toDate()
    });
    await initData("th/task/createTask", {
      serviceName: "SofaCleaning",
      viewedTaskers: ["0834567891"],
      description: "My TaskSofaCleaning3",
      date: moment().add(3, "d").toDate()
    });
    await initData("th/task/createTask", {
      serviceName: "SofaCleaning",
      viewedTaskers: ["0834567891"],
      description: "My TaskSofaCleaning4",
      date: moment().add(4, "d").toDate()
    });
    await initData("th/task/createTask", {
      serviceName: "SofaCleaning",
      viewedTaskers: ["0834567891"],
      description: "My TaskSofaCleaning5",
      date: moment().add(5, "d").toDate()
    });
    await initData("th/task/createTask", {
      serviceName: "SofaCleaning",
      viewedTaskers: ["0834567891"],
      description: "My TaskSofaCleaning6",
      date: moment().add(6, "d").toDate()
    });
    await device.reloadReactNative();
    await waitForElement("btnFilter", 1000);
    await tapId("btnFilter");
    await waitForElement("btnFilterDate", 1000);
    await tapId("btnFilterDate");

    
    // Đã được sắp xếp
    await expectIdToHaveText('taskDate_0', moment().add(2, "d").format("DD/MM/YYYY"));
    await expectIdToHaveText('taskDate_1', moment().add(3, "d").format("DD/MM/YYYY"));
    await expectIdToHaveText('taskDate_2', moment().add(4, "d").format("DD/MM/YYYY"));
    await expectIdToHaveText('taskDate_3', moment().add(5, "d").format("DD/MM/YYYY"));
  });

  // Thấy công việc và nhận công việc
  it("LINE 37 - Tasker accept task Sofa th", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "SofaCleaning",
      viewedTaskers: ["0834567891"],
      description: "My TaskSofaCleaning",
    });
    await device.reloadReactNative();
    await tapId("newTask_My TaskSofaCleaning");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Nhận công việc thành công", "text");
    await waitForElement("Đóng", 1000, "text");
    await tapText("Đóng");
    await tapHeaderBack();
    await tapId("confirmTask_My TaskSofaCleaning");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("Chi tiết công việc", "text");
  });
  // conflict time
  it("LINE 154 - Tasker accept task sofa dont see task conflict time", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "SofaCleaning",
      viewedTaskers: ["0834567891"],
      description: "My TaskSofaCleaning",
    });
    await device.reloadReactNative();
    await waitForElement("newTask_My TaskSofaCleaning", 1000);
    await tapId("newTask_My TaskSofaCleaning");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Nhận công việc thành công", "text");
    await waitForElement("Đóng", 1000, "text");
    await tapText("Đóng");
    await tapHeaderBack();
    await tapId("confirmTask_My TaskSofaCleaning");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("Chi tiết công việc", "text");
    await tapHeaderBack();
    await tapId("TabNewTask");
    await expectElementNotExist("newTask_My TaskSofaCleaning");
  });
  // Không đủ tiền
  it("LINE 96 - Tasker accept task cleaning not enough money", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "SofaCleaning",
      viewedTaskers: ["0834567891"],
      description: "My TaskSofaCleaning",
    });
    await initData('update-user/financialAccount', { phone: "0834567891", isoCode: "TH", financialAccountData: { TH_FMainAccount: 10, TH_Promotion: 10 } })
    await device.reloadReactNative();
    await waitForElement("newTask_My TaskSofaCleaning", 1000);
    await tapId("newTask_My TaskSofaCleaning");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Rất tiếc", "text");
    await waitForElement('Đóng', 1000, "text");
    await tapText("Đóng");
  });

  it("LINE 114 - Tasker accept task have newCostDetail and not enough money", async () => {
    const ref = await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "SofaCleaning",
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

  it("LINE 255 - Tasker accept task have newCostDetail", async () => {
    const ref = await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "SofaCleaning",
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
