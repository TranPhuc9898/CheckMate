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
  logout,
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
describe("FILE: thailand/flow-test/service-air-conditioner/accept-task-air-conditioner.spec.js - Tasker accept task air conditioner Viet Nam", () => {
  beforeEach(async () => {
    await initData("update-user/financialAccount", {
      phone: "0834567892",
      isoCode: "TH",
      financialAccountData: { TH_FMainAccount: 50000, TH_Promotion: 5000 },
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
          name: "AIR_CONDITIONER_SERVICE",
          text: {
            vi: "Vệ sinh máy lạnh",
            en: "AIR_CONDITIONER_SERVICE",
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
    await initData("task/createTask", {
      isoCode: "TH",
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "AirConditioner4",
      createdAt: moment().add(4, "d").toDate(),
      date: moment().add(4, "d").toDate(),
      detail: detail,
    });
    await initData("th/task/createTask", {
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "AirConditioner5",
      createdAt: moment().add(5, "d").toDate(),
      date: moment().add(5, "d").toDate(),
      detail: detail,
    });
    await initData("th/task/createTask", {
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "AirConditioner6",
      createdAt: moment().add(6, "d").toDate(),
      date: moment().add(6, "d").toDate(),
      detail: detail,
    });
    await initData("th/task/createTask", {
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "AirConditioner2",
      createdAt: moment().add(2, "d").toDate(),
      date: moment().add(2, "d").toDate(),
      detail: detail,
    });
    await initData("th/task/createTask", {
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "AirConditioner3",
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
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "AirConditioner5",
      date: moment().add(5, "d").toDate(),
      detail: detail,
    });
    await initData("th/task/createTask", {
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "AirConditioner6",
      date: moment().add(6, "d").toDate(),
      detail: detail,
    });
    await initData("th/task/createTask", {
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "AirConditioner2",
      date: moment().add(2, "d").toDate(),
      detail: detail,
    });
    await initData("th/task/createTask", {
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "AirConditioner3",
      date: moment().add(3, "d").toDate(),
      detail: detail,
    });
    await initData("th/task/createTask", {
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "AirConditioner4",
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

  // Thấy công việc và nhận công việc
  it("LINE 206 - Tasker accept task air conditioner th", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "AirConditioner",
      detail: detail,
    });

    await device.reloadReactNative();
    await waitForElement("newTask_AirConditioner", 1000);
    await tapId("newTask_AirConditioner");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("1 máy", "text");
    await expectElementVisible("Treo tường", "text");
    await swipe("swipeBtn", "right");
    await tapHeaderBack();
    await tapId("confirmTask_AirConditioner");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("Chi tiết công việc", "text");
  });

  // conflict time
  it("LINE 236 - Tasker accept task A/C dont see task conflict time", async () => {
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
            name: "AIR_CONDITIONER_SERVICE",
            text: {
              vi: "Vệ sinh máy lạnh",
              en: "AIR_CONDITIONER_SERVICE",
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
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "AirConditioner",
      detail: detail,
    });
    await initData("th/task/createTask", {
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "AirConditioner01",
      detail: detail2,
    });
    await device.reloadReactNative();
    await waitForElement("newTask_AirConditioner", 1000);
    await tapId("newTask_AirConditioner");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await tapHeaderBack();
    await tapId("confirmTask_AirConditioner");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("Chi tiết công việc", "text");
    await tapHeaderBack();
    await tapId("TabNewTask");
    await expectElementNotExist("newTask_AirConditioner");
    await expectElementNotExist("newTask_AirConditioner01");
  });
  // DONE  - PASSING

  // Không đủ tiền
  it("LINE 297 - Tasker accept task cleaning not enough money", async () => {
    await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "AirConditioner",
      detail: detail,
    });
    await initData("update-user/financialAccount", {
      phone: "0834567892",
      isoCode: "TH",
      financialAccountData: { TH_FMainAccount: 50, TH_Promotion: 50 },
    });
    await device.reloadReactNative();
    await waitForElement("newTask_AirConditioner", 1000);
    await tapId("newTask_AirConditioner");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Rất tiếc", "text");
    await expectElementVisible("Bạn không đủ tiền trong tài khoản để nhận công việc này. Vui lòng nạp thêm tiền vào tài khoản.", "text");
    await waitForElement("Đóng", 1000, "text");
    await tapText("Đóng");
  });
  // DONE  - PASSING

  it("LINE 114 - Tasker accept task have newCostDetail and not enough money", async () => {
    await initData("update-user/financialAccount", {
      phone: "0834567892",
      isoCode: "TH",
      financialAccountData: { TH_FMainAccount: 50, TH_Promotion: 50 },
    });
    const ref = await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "AirConditioner",
      detail: detail,
    });
    await initData("th/updateTask", {
      taskId: ref.taskId,
      dataUpdate: {
        isPrepayTask: true,
        payment: {
          method: "VN_PAY",
          status: "PAID",
        },
        //
        newCostDetail: {
          baseCost: 5000.0,
          cost: 5000.0,
          finalCost: 5000.0,
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
          newFinalCost: 5000.0,
        },
      },
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_AirConditioner");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await expectElementVisible("Rất tiếc", "text");
    await waitForElement("Đóng", 1000, "text");
    await tapText("Đóng");
  });

  it("LINE 380 - Tasker accept task A/C have newCostDetail", async () => {
    const ref = await initData("th/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "My Task",
      detail: detail,
    });
    await initData("update-user/financialAccount", {
      phone: "0834567892",
      isoCode: "TH",
      financialAccountData: { TH_FMainAccount: 500, TH_Promotion: 50 },
    });
    await initData("th/updateTask", {
      taskId: ref.taskId,
      dataUpdate: {
        isPrepayTask: true,
        payment: {
          method: "VN_PAY",
          status: "PAID",
        },
        newCostDetail: {
          baseCost: 200.0,
          cost: 200.0,
          finalCost: 200.0,
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
          baseCost: 100,
          cost: 100,
          finalCost: 100,
          duration: 4,
          currency: {
             "sign": "฿",
            "code": "THB"
          },
          newFinalCost: 200.0,
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
    await expectIdToHaveText("extraMoney", "+100฿ Thu tiền mặt từ khách hàng");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("Chi tiết công việc", "text");
  });
});
