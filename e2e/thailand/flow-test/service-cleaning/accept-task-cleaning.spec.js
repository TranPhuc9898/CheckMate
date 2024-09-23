/**
 * @author HuuToan
 * @email [huutoan.nguyen@btaskee.com]
 * @create date 2022-10-11 17:00:42
 * @modify date 2022-10-11 17:00:42
 * @desc [Tasker accept tassk cleaing th]
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
  expectElementNotExist,
} = require("../../../step-definitions");
const moment = require("moment");
// Thấy công việc và nhận công việc
describe("FILE: vietnam/flow-test/service-cleaning/accept-task.spec.js - Tasker accept task cleaning th", () => {
  beforeEach(async () => {
    await initData('resetData');
    await initData("update-user/financialAccount", {
      phone: "0834567891",
      isoCode: "TH",
      financialAccountData: { TH_FMainAccount: 3000, TH_Promotion: 2000 },
    });
    await device.launchApp();
  });

  // tạo nhiều công việc với những ngày khác nhau -> sau khi nhấn nút filter thì công việc mới đăng sẽ được đưa lên đầu ( create at)
  it("LINE 35 - When the filter button is pressed, Tasker creates a lot of tasks, and the job is displayed at the top.", async () => {
    await initData("task/createTask", [{
      isoCode: 'TH',
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task4",
      createdAt: moment().add(4, "d").toDate(),
      date: moment().add(4, "d").toDate(),
    },
    {
      isoCode: 'TH',
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task5",
      createdAt: moment().add(5, "d").toDate(),
      date: moment().add(5, "d").toDate(),
    },
    {
      isoCode: 'TH',
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task6",
      createdAt: moment().add(6, "d").toDate(),
      date: moment().add(6, "d").toDate(),
    },
    {
      isoCode: 'TH',
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task2",
      createdAt: moment().add(2, "d").toDate(),
      date: moment().add(2, "d").toDate(),
    },
    {
      isoCode: 'TH',
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task3",
      createdAt: moment().add(3, "d").toDate(),
      date: moment().add(3, "d").toDate(),
    }
    ]);
    await device.reloadReactNative();
    await waitForElement("btnFilter", 1000);
    await tapId("btnFilter");
    await waitForElement("btnFilterCreateAt", 1000);
    await tapId("btnFilterCreateAt");

    // Đã được sắp xếp
    await expectIdToHaveText(
      "taskDate_0",
      moment().add(6, "d").format("DD/MM/YYYY")
    );
    await expectIdToHaveText(
      "taskDate_1",
      moment().add(5, "d").format("DD/MM/YYYY")
    );
    await expectIdToHaveText(
      "taskDate_2",
      moment().add(4, "d").format("DD/MM/YYYY")
    );
    await expectIdToHaveText(
      "taskDate_3",
      moment().add(3, "d").format("DD/MM/YYYY")
    );
  });

  // tạo nhiều công việc với những ngày khác nhau -> sau khi nhấn nút filter thì công việc sắp làm sẽ được đưa lên đầu ( date )
  it("LINE 103 - When the filter button is pressed, Tasker creates a lot of tasks, and the job is displayed at the top.", async () => {
    await initData("task/createTask", [{
      isoCode: "TH",
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task5",
      date: moment().add(5, "d").toDate(),

    }, {
      isoCode: "TH",
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task6",
      date: moment().add(6, "d").toDate(),

    }, {
      isoCode: "TH",
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task2",
      date: moment().add(2, "d").toDate(),

    }, {
      isoCode: "TH",
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task3",
      date: moment().add(3, "d").toDate(),

    }, {
      isoCode: "TH",
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task4",
      date: moment().add(4, "d").toDate(),
    }
    ]);
    await device.reloadReactNative();
    await waitForElement("btnFilter", 1000);
    await tapId("btnFilter");
    await waitForElement("btnFilterDate", 1000);
    await tapId("btnFilterDate");

    // Đã được sắp xếp
    await expectIdToHaveText(
      "taskDate_0",
      moment().add(2, "d").format("DD/MM/YYYY")
    );
    await expectIdToHaveText(
      "taskDate_1",
      moment().add(3, "d").format("DD/MM/YYYY")
    );
    await expectIdToHaveText(
      "taskDate_2",
      moment().add(4, "d").format("DD/MM/YYYY")
    );
    await expectIdToHaveText(
      "taskDate_3",
      moment().add(5, "d").format("DD/MM/YYYY")
    );
  });

  // Thấy công việc và nhận công việc
  it("LINE 166 - Tasker accept task CLEANING th", async () => {
    await initData("task/createTask", {
      isoCode: "TH",
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task",
    });

    await device.reloadReactNative();
    await waitForElement("newTask_My Task", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await tapHeaderBack();
    await tapId("confirmTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("Chi tiết công việc", "text");
  });

  // conflict time
  it("LINE 189 - Tasker accept task cleaning dont see task conflict time", async () => {
    await initData("task/createTask", [
      {
        isoCode: "TH",
        serviceName: "CLEANING",
        viewedTaskers: ["0834567891"],
        description: "My Task",
      }, {
        isoCode: "TH",
        serviceName: "CLEANING",
        viewedTaskers: ["0834567891"],
        description: "My Task01",
      }
    ]);
    await device.reloadReactNative();
    await waitForElement("newTask_My Task", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await tapHeaderBack();
    await tapId("confirmTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("Chi tiết công việc", "text");
    await tapHeaderBack();
    await tapId("TabNewTask");
    await expectElementNotExist("newTask_My Task");
    await expectElementNotExist("newTask_My Task01");
  });

  // Không đủ tiền
  it("LINE 220 - Tasker accept task cleaning not enough money", async () => {
    await initData("task/createTask", {
      isoCode: "TH",
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task",

    });
    await initData("update-user/financialAccount", {
      phone: "0834567891",
      isoCode: "TH",
      financialAccountData: { TH_FMainAccount: 50, TH_Promotion: 50 },
    });
    await device.reloadReactNative();
    await waitForElement("newTask_My Task", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Rất tiếc", "text");
    await expectElementVisible("Bạn không đủ tiền trong tài khoản để nhận công việc này. Vui lòng nạp thêm tiền vào tài khoản.", "text");
    await waitForElement("Đóng", 1000, "text");
    await tapText("Đóng");
  });

  it("LINE 244 - Tasker accept task have newCostDetail and not enough money", async () => {
    await initData("update-user/financialAccount", {
      phone: "0834567891",
      isoCode: "TH",
      financialAccountData: { TH_FMainAccount: 30, TH_Promotion: 20 },
    });

    await initData("task/createTask", {
      isoCode: "TH",
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task",
    });

    await initData("task/updateTask", {
      isoCode: "TH",
      description: "My Task",
      dataUpdate: {
        isPrepayTask: true,
        payment: {
          method: "VN_PAY",
          status: "PAID",
        },
        //
        newCostDetail: {
          baseCost: 3500.0,
          cost: 3450.0,
          finalCost: 3450.0,
          duration: 5.0,
          currency: {
            "sign": "฿",
            "code": "THB"
          },
          transportFee: 0.0,
          depositMoney: 0.0,
          newFinalCost: 0.0,
        },
        costDetail: {
          baseCost: 1000,
          cost: 1000,
          finalCost: 1000,
          duration: 4,
          currency: {
            "sign": "฿",
            "code": "THB"
          },
          // ***
          newFinalCost: 3450.0,
        },
      },
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Rất tiếc", "text");
    await waitForElement('Bạn không đủ tiền trong tài khoản để nhận công việc này. Vui lòng nạp thêm tiền vào tài khoản.', 1000, "text");
    await waitForElement("Đóng", 1000, "text");
    await tapText("Đóng");
  });

  it("LINE 298 - Tasker accept task have newCostDetail", async () => {
    await initData("task/createTask", {
      isoCode: "TH",
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task",
    });

    await initData("update-user/financialAccount", {
      phone: "0834567891",
      isoCode: "TH",
      financialAccountData: { TH_FMainAccount: 5000, TH_Promotion: 3000 },
    });

    await initData("task/updateTask", {
      isoCode: "TH",
      description: "My Task",
      dataUpdate: {
        isPrepayTask: true,
        payment: {
          method: "VN_PAY",
          status: "PAID",
        },
        newCostDetail: {
          baseCost: 3000.0,
          cost: 3000.0,
          finalCost: 3000.0,
          duration: 5.0,
          currency: {
            "sign": "฿",
            "code": "THB"
          },
          transportFee: 0.0,
          depositMoney: 0.0,
          newFinalCost: 0.0,
        },
        costDetail: {
          baseCost: 1000,
          cost: 1000,
          finalCost: 1000,
          duration: 4,
          currency: {
            "sign": "฿",
            "code": "THB"
          },
          newFinalCost: 3000.0,
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
    await expectIdToHaveText("extraMoney", "+2,000฿ Thu tiền mặt từ khách hàng");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("Chi tiết công việc", "text");
  });

  it("LINE 360 - Tasker accept task cleaning chooseTasker", async () => {
    await initData("update-user/financialAccount", {
      phone: "0834567891",
      isoCode: "TH",
      financialAccountData: { TH_FMainAccount: 5000, TH_Promotion: 3000 },
    });
    await initData("task/createTask", {
      isoCode: "TH",
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task01",
      autoChooseTasker: false,
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await waitForElement("newTask_My Task01", 1000);
    await tapId("newTask_My Task01");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Nhận công việc thành công. Đang chờ Khách hàng xác nhận", "text");
    await waitForElement("Đóng", 1000, "text");
    await tapText("Đóng");
    await tapId("btnShowAllTaskWaiting");
    await waitForElement("Công việc đang chờ", 1000, 'text');
    await tapId("btnSeeDetailTaskWaiting_My Task01");
    await swipe("scrollTaskDetail", "up");
    await waitForElement("Rút khỏi công việc", 1000, 'text');
  });

  it("LINE 389 - Tasker accept task cleaning with promotion", async () => {
    await initData("update-user/financialAccount", {
      phone: "0834567891",
      isoCode: "TH",
      financialAccountData: { TH_FMainAccount: 5000, TH_Promotion: 3000 },
    });
    await initData("task/createTask", {
      isoCode: "TH",
      serviceName: "CLEANING",
      viewedTaskers: ["0834567891"],
      description: "My Task01",
    });

    await initData('th/updateTask', {
      description: "My Task01",
      isoCode: "TH",
      dataUpdate: {
        "isPrepayTask": true,
        "payment": {
          "method": "CREDIT",
          "status": "PAID",
        },
        "costDetail": {
          "baseCost": 2000.0,
          "cost": 2000.0,
          "finalCost": 1800.0,
          "duration": 1,
          "currency": {
            "sign": "฿",
            "code": "TH"
          },
        },
        "promotion": {
          "code": "DTHRZ1",
          "value": {
            "type": "MONEY",
            "value": 20000.0,
          },
          "decreasedCost": 1800.0,
          "promotionValue": 2000.0,
        },
      }
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await waitForElement("newTask_My Task01", 1000);
    await tapId("newTask_My Task01");
    await expectIdToHaveText("cost_0", "2,000฿");
    await expectElementNotExist("promotionValue");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await tapHeaderBack();
    await tapId("confirmTask_My Task01");
    await expectIdToHaveText("cost_0", "1,800฿");
    await expectIdToHaveText("promotionValue", "+200฿ Thêm vào TK khuyến mãi của bạn");
  });
});
