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
describe("FILE: vietnam/flow-test/service-house-keeping/accept-task-house-keeping.spec.js - Tasker accept task house-keeping th", () => {
  beforeEach(async () => {
    await initData("vn/user/addUserToService", {
      phone: "0834567897",
      type: "INSERT",
      serviceName: "HOUSE_KEEPING",
    });
    await initData("update-user/financialAccount", {
      phone: "0834567897",
      isoCode: "VN",
      financialAccountData: { FMainAccount: 50000, Promotion: 5000 },
    });
    await device.launchApp();
  });

  const detail = [
    {
      type: {
        name: "Wall",
        text: {
          vi: "Treo tường",
          en: "Wall",
          ko: "벽걸이",
          th: "ติดผนัง",
        },
      },
      services: [
        {
          name: "HOUSE_KEEPING",
          text: {
            vi: "Vệ sinh máy lạnh",
            en: "HOUSE_KEEPING",
            ko: "청소",
            th: "ล้างแอร์",
          },
        },
      ],
      hp: {
        to: 2.0,
      },
      quantity: 1,
    },
  ];

  // tạo nhiều công việc với những ngày khác nhau -> sau khi nhấn nút filter thì công việc mới đăng sẽ được đưa lên đầu ( create at)
  it("LINE 38 - When the filter button is pressed, Tasker creates a lot of tasks, and the job is displayed at the top.", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "HOUSE_KEEPING",
      viewedTaskers: ["0834567897"],
      description: "HouseKeeping4",
      createdAt: moment().add(4, "d").toDate(),
      date: moment().add(4, "d").toDate(),
      detail: detail,
    });
    await initData("vn/task/createTask", {
      serviceName: "HOUSE_KEEPING",
      viewedTaskers: ["0834567897"],
      description: "HouseKeeping5",
      createdAt: moment().add(5, "d").toDate(),
      date: moment().add(5, "d").toDate(),
      detail: detail,
    });
    await initData("vn/task/createTask", {
      serviceName: "HOUSE_KEEPING",
      viewedTaskers: ["0834567897"],
      description: "HouseKeeping6",
      createdAt: moment().add(6, "d").toDate(),
      date: moment().add(6, "d").toDate(),
      detail: detail,
    });
    await initData("vn/task/createTask", {
      serviceName: "HOUSE_KEEPING",
      viewedTaskers: ["0834567897"],
      description: "HouseKeeping2",
      createdAt: moment().add(2, "d").toDate(),
      date: moment().add(2, "d").toDate(),
      detail: detail,
    });
    await initData("vn/task/createTask", {
      serviceName: "HOUSE_KEEPING",
      viewedTaskers: ["0834567897"],
      description: "HouseKeeping3",
      createdAt: moment().add(3, "d").toDate(),
      date: moment().add(3, "d").toDate(),
      detail: detail,
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
  it("LINE 85 - When the filter button is pressed, Tasker creates a lot of tasks, and the job is displayed at the top.", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "HOUSE_KEEPING",
      viewedTaskers: ["0834567897"],
      description: "HouseKeeping5",
      date: moment().add(5, "d").toDate(),
      detail: detail,
    });
    await initData("vn/task/createTask", {
      serviceName: "HOUSE_KEEPING",
      viewedTaskers: ["0834567897"],
      description: "HouseKeeping6",
      date: moment().add(6, "d").toDate(),
      detail: detail,
    });
    await initData("vn/task/createTask", {
      serviceName: "HOUSE_KEEPING",
      viewedTaskers: ["0834567897"],
      description: "HouseKeeping2",
      date: moment().add(2, "d").toDate(),
      detail: detail,
    });
    await initData("vn/task/createTask", {
      serviceName: "HOUSE_KEEPING",
      viewedTaskers: ["0834567897"],
      description: "HouseKeeping3",
      date: moment().add(3, "d").toDate(),
      detail: detail,
    });
    await initData("vn/task/createTask", {
      serviceName: "HOUSE_KEEPING",
      viewedTaskers: ["0834567897"],
      description: "HouseKeeping4",
      date: moment().add(4, "d").toDate(),
      detail: detail,
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
  it("LINE 202 - Tasker accept task house-keeping vn", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "HOUSE_KEEPING",
      viewedTaskers: ["0834567897"],
      description: "HouseKeeping",
      detail: detail,
    });

    await device.reloadReactNative();
    await waitForElement("newTask_HouseKeeping", 1000);
    await tapId("newTask_HouseKeeping");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    // await expectElementVisible("Nhận công việc thành công", "text");
    // await waitForElement("Đóng", 1000, "text");
    // await tapText("Đóng","text");
    await tapHeaderBack();
    await tapId("confirmTask_HouseKeeping");
    await waitForElement("btnDetailHostel", 1000);
    await expectElementVisible("btnDetailHostel");
    await expectElementVisible("Chi tiết công việc", "text");
    await tapId("btnDetailHostel");
    await waitForElement("btnOpenImageHouseKeeping", 1000);
    await expectElementVisible("Hình ảnh", "text");
    await tapId("btnOpenImageHouseKeeping");
    await tapText("Đóng");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
  });
  // DONE  - PASSING

  // conflict time
  it("LINE 64 - Tasker accept task cleaning dont see task conflict time", async () => {
    const detail2 = [
      {
        type: {
          name: "Wall2",
          text: {
            vi: "Treo tường2",
            en: "Wall",
            ko: "벽걸이",
            th: "ติดผนัง",
          },
        },
        services: [
          {
            name: "HOUSE_KEEPING",
            text: {
              vi: "HOUSE_KEEPING",
              en: "HOUSE_KEEPING",
              ko: "청소",
              th: "ล้างแอร์",
            },
          },
        ],
        hp: {
          to: 2.0,
        },
        quantity: 1,
      },
    ];
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "HOUSE_KEEPING",
      viewedTaskers: ["0834567897"],
      description: "HouseKeeping",
      detail: detail,
    });
    await initData("vn/task/createTask", {
      serviceName: "HOUSE_KEEPING",
      viewedTaskers: ["0834567897"],
      description: "HouseKeeping01",
      detail: detail2,
    });
    await device.reloadReactNative();
    await waitForElement("newTask_HouseKeeping", 1000);
    await tapId("newTask_HouseKeeping");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await tapHeaderBack();
    await tapId("confirmTask_HouseKeeping");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("Chi tiết công việc", "text");
    await tapHeaderBack();
    await tapId("TabNewTask");
    await expectElementNotExist("newTask_HouseKeeping");
    await expectElementNotExist("newTask_HouseKeeping01");
  });
  // DONE  - PASSING

  // Không đủ tiền
  it("LINE 297 - Tasker accept task cleaning not enough money", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "HOUSE_KEEPING",
      viewedTaskers: ["0834567897"],
      description: "HouseKeeping",
      detail: detail,
    });
    await initData("update-user/financialAccount", {
      phone: "0834567897",
      isoCode: "VN",
      financialAccountData: { FMainAccount: 100, Promotion: 100 },
    });
    await device.reloadReactNative();
    await waitForElement("newTask_HouseKeeping", 1000);
    await tapId("newTask_HouseKeeping");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Rất tiếc", "text");
    await expectElementVisible("Bạn không đủ tiền trong tài khoản để nhận công việc này. Vui lòng nạp thêm tiền vào tài khoản.", "text");
    await waitForElement("Đóng", 1000, "text");
    await tapText("Đóng");
  });
  // DONE  - PASSING

  it("LINE 114 - Tasker accept task have newCostDetail and not enough money", async () => {
    const ref = await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "HOUSE_KEEPING",
      viewedTaskers: ["0834567897"],
      description: "HouseKeeping",
      detail: detail,
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
    await tapId("newTask_HouseKeeping");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Rất tiếc", "text");
    await waitForElement("Đóng", 1000, "text");
    await tapText("Đóng");
  });

  it("LINE 378 - Tasker accept task have newCostDetail", async () => {
    const ref = await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "HOUSE_KEEPING",
      viewedTaskers: ["0834567897"],
      description: "My Task",
      detail: detail,
    });
    await initData("update-user/financialAccount", {
      phone: "0834567897",
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
