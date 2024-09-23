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
  expectElementNotExist,
} = require("../../../step-definitions");
const moment = require("moment");
// Thấy công việc và nhận công việc
describe("FILE: vietnam/flow-test/accept-task/accept-task-GO_MARKET-vn.spec.js - Tasker accept task go market th", () => {
  beforeEach(async () => {
    await initData("vn/user/addUserToService", {
      phone: "0834567891",
      type: "INSERT",
      serviceName: "GO_MARKET",
    });
    await initData("update-user/financialAccount", {
      phone: "0834567891",
      isoCode: "VN",
      financialAccountData: { FMainAccount: 50000, Promotion: 5000 },
    });
    await device.launchApp();
  });

  const goMarketDetail = {
    "placeSuperMarket": {
      "address": "284 Lý Thường Kiệt, quận 10",
      "storeId": "ayxvN2E9aCqrDQf8o",
      "text": {
        "vi": "Big C",
        "en": "Big C",
        "ko": "Big C",
        "th": "Big C"
      },
      "type": {
        "name": "SUPERMARKET",
        "text": {
          "vi": "Sieu thi",
          "en": "Sieu thi",
          "ko": "Sieu thi",
          "th": "Sieu thi"
        }
      }
    },
    "shoppingCart": [
      {
        "_id": "gov2jFgKoTAt3yPtg",
        "SKU": "s1_cat1_sub1_p1",
        "text": {
          "vi": "Cải bẹ xanh",
          "en": "Cải bẹ xanh (1kg)",
          "ko": "Cải bẹ xanh (1kg)",
          "th": "Cải bẹ xanh (1kg)"
        },
        "image": "https://cdn.24h.com.vn/upload/2-2020/images/2020-04-30/1588209659-ab9f53c162297f21684092dc624cc935.jpg",
        "price": 100000.0,
        "quantity": 1
      },
      {
        "_id": "EPni3WLPYWf4CnCg8",
        "SKU": "s1_cat1_sub1_p1",
        "text": {
          "vi": "Đào tươi (2 trái)",
          "en": "Đào tươi (2 trái)",
          "ko": "Đào tươi (2 trái)",
          "th": "Đào tươi (2 trái)"
        },
        "image": "https://cf.shopee.vn/file/846ffbc935c42fcec60846cc0e06168d_tn",
        "price": 50000.0,
        "quantity": 1
      },
      {
        "_id": "x6151a2a9ba619d2e2dda6e82",
        "text": {
          "vi": "Cá mập",
          "en": "Cá mập",
          "ko": "Cá mập",
          "th": "Cá mập"
        },
        "price": 50000.0,
        "quantity": 1
      },
      {
        "_id": "x6151a2c8ba619d2e2dda6e83",
        "text": {
          "vi": "Con cá sấu",
          "en": "Con cá sấu",
          "ko": "Con cá sấu",
          "th": "Con cá sấu"
        },
        "price": 50000.0,
        "quantity": 1
      }
    ]
  };

  // tạo nhiều công việc với những ngày khác nhau -> sau khi nhấn nút filter thì công việc mới đăng sẽ được đưa lên đầu ( create at)
  it("LINE 112 - When the filter button is pressed, Tasker creates a lot of tasks, and the job is displayed at the top.", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "GO_MARKET",
      viewedTaskers: ["0834567891"],
      description: "GoMarket4",
      createdAt: moment().add(4, "d").toDate(),
      date: moment().add(4, "d").toDate(),

    });
    await initData("vn/task/createTask", {
      serviceName: "GO_MARKET",
      viewedTaskers: ["0834567891"],
      description: "GoMarket5",
      createdAt: moment().add(5, "d").toDate(),
      date: moment().add(5, "d").toDate(),

    });
    await initData("vn/task/createTask", {
      serviceName: "GO_MARKET",
      viewedTaskers: ["0834567891"],
      description: "GoMarket6",
      createdAt: moment().add(6, "d").toDate(),
      date: moment().add(6, "d").toDate(),

    });
    await initData("vn/task/createTask", {
      serviceName: "GO_MARKET",
      viewedTaskers: ["0834567891"],
      description: "GoMarket2",
      createdAt: moment().add(2, "d").toDate(),
      date: moment().add(2, "d").toDate(),

    });
    await initData("vn/task/createTask", {
      serviceName: "GO_MARKET",
      viewedTaskers: ["0834567891"],
      description: "GoMarket3",
      createdAt: moment().add(3, "d").toDate(),
      date: moment().add(3, "d").toDate(),

    });
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
  // DONE  - PASSING

  // tạo nhiều công việc với những ngày khác nhau -> sau khi nhấn nút filter thì công việc sắp làm sẽ được đưa lên đầu ( date )
  it("LINE 181 - When the filter button is pressed, Tasker creates a lot of tasks, and the job is displayed at the top.", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "GO_MARKET",
      viewedTaskers: ["0834567891"],
      description: "GoMarket5",
      date: moment().add(5, "d").toDate(),

    });
    await initData("vn/task/createTask", {
      serviceName: "GO_MARKET",
      viewedTaskers: ["0834567891"],
      description: "GoMarket6",
      date: moment().add(6, "d").toDate(),

    });
    await initData("vn/task/createTask", {
      serviceName: "GO_MARKET",
      viewedTaskers: ["0834567891"],
      description: "GoMarket2",
      date: moment().add(2, "d").toDate(),

    });
    await initData("vn/task/createTask", {
      serviceName: "GO_MARKET",
      viewedTaskers: ["0834567891"],
      description: "GoMarket3",
      date: moment().add(3, "d").toDate(),

    });
    await initData("vn/task/createTask", {
      serviceName: "GO_MARKET",
      viewedTaskers: ["0834567891"],
      description: "GoMarket4",
      date: moment().add(4, "d").toDate(),

    });
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
  // DONE  - PASSING

  // Thấy công việc và nhận công việc
  it("LINE 245 - Tasker accept task GO_MARKET vn", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "GO_MARKET",
      viewedTaskers: ["0834567891"],
      description: "GoMarket",
    });

    await device.reloadReactNative();
    await waitForElement("newTask_GoMarket", 1000);
    await tapId("newTask_GoMarket");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await tapHeaderBack();
    await tapId("confirmTask_GoMarket");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("Chi tiết công việc", "text");

  });
  // DONE  - PASSING

  // conflict time
  it("LINE 280 - Tasker accept task Go Market dont see task conflict time", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "GO_MARKET",
      viewedTaskers: ["0834567891"],
      description: "GoMarket",

    });
    await initData("vn/task/createTask", {
      serviceName: "GO_MARKET",
      viewedTaskers: ["0834567891"],
      description: "GoMarket01",

    });
    await device.reloadReactNative();
    await waitForElement("newTask_GoMarket", 1000);
    await tapId("newTask_GoMarket");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await tapHeaderBack();
    await tapId("confirmTask_GoMarket");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("Chi tiết công việc", "text");
    await tapHeaderBack();
    await tapId("TabNewTask");
    await expectElementNotExist("newTask_GoMarket");
    await expectElementNotExist("newTask_GoMarket01");
  });
  // DONE  - PASSING

  // Không đủ tiền
  it("LINE 317 - Tasker accept task Go Market not enough money", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "GO_MARKET",
      viewedTaskers: ["0834567891"],
      description: "GoMarket",
    });
    await initData("update-user/financialAccount", {
      phone: "0834567891",
      isoCode: "VN",
      financialAccountData: { FMainAccount: 100, Promotion: 100 },
    });
    await device.reloadReactNative();
    await waitForElement("newTask_GoMarket", 1000);
    await tapId("newTask_GoMarket");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Rất tiếc", "text");
    await expectElementVisible("Bạn không đủ tiền trong tài khoản để nhận công việc này. Vui lòng nạp thêm tiền vào tài khoản.", "text");
    await waitForElement("Đóng", 1000, "text");
    await tapText("Đóng");
  });
  // DONE  - PASSING

  it("LINE 338 - Tasker accept task have newCostDetail and not enough money", async () => {
    const ref = await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "GO_MARKET",
      viewedTaskers: ["0834567891"],
      description: "GoMarket",
    });
    await initData("update-user/financialAccount", {
      phone: "0834567891",
      isoCode: "VN",
      financialAccountData: { FMainAccount: 5000, Promotion: 5000 },
    });
    await initData("vn/updateTask", {
      taskId: ref.taskId,
      dataUpdate: {
        isPrepayTask: true,
        payment: {
          method: "VN_PAY",
          status: "PAID",
        },
        //
        newCostDetail: {
          baseCost: 350000.0,
          cost: 345000.0,
          finalCost: 345000.0,
          duration: 5.0,
          currency: {
            sign: "₫",
            code: "VND",
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
            sign: "₫",
            code: "VND",
          },
          // ***
          newFinalCost: 345000.0,
        },
      },
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_GoMarket");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Rất tiếc", "text");
    await waitForElement("Đóng", 1000, "text");
    await tapText("Đóng");
  });

  it("LINE 396 - Tasker accept task have newCostDetail", async () => {
    const ref = await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "GO_MARKET",
      viewedTaskers: ["0834567891"],
      description: "My Task",

    });
    await initData("update-user/financialAccount", {
      phone: "0834567891",
      isoCode: "VN",
      financialAccountData: { FMainAccount: 500000, Promotion: 50000 },
    });
    await initData("vn/updateTask", {
      taskId: ref.taskId,
      dataUpdate: {
        isPrepayTask: true,
        payment: {
          method: "VN_PAY",
          status: "PAID",
        },
        newCostDetail: {
          baseCost: 200000.0,
          cost: 200000.0,
          finalCost: 200000.0,
          duration: 5.0,
          currency: {
            sign: "₫",
            code: "VND",
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
            sign: "₫",
            code: "VND",
          },
          newFinalCost: 200000.0,
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
    await expectIdToHaveText("extraMoney", "+199,000₫ Thu tiền mặt từ khách hàng");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("Chi tiết công việc", "text");
  });
});
