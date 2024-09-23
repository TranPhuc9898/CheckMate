/**
 * @author HuuToan
 * @email [huutoan.nguyen@btaskee.com]
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
  reloadApp,
} = require("../../../step-definitions");
const moment = require("moment");
// Thấy công việc và nhận công việc
describe("FILE: vietnam/flow-test/service-washing-machine/accept-task-washing-machine.spec.js - Tasker accept task cleaning vn", () => {
  beforeEach(async () => {
    await reloadApp();
    await initData("update-user/financialAccount", {
      phone: "0834567814",
      isoCode: "VN",
      financialAccountData: { FMainAccount: 500000, Promotion: 5000 },
    });
    await initData('user/createUser', {
      phone: '0834567892',
      isoCode: 'VN',
      company: "0834567814",
      resetUser: true,
    });
    const tasker = await initData("user/get-user", { phone: "0834567892", isoCode: "VN" });
    await initData("user/updateUser",
      {
        phone: "0834567814",
        isoCode: "VN",
        employees: ["0834567892"],
      }
    );
    await device.launchApp();
  });

  // afterEach(async () => {
  //   await initData("update-user/unset-fields", { phone: "0834567814", isoCode: "VN", fields: ["employeeIds", "company"] });
  // })

  // tạo nhiều công việc với những ngày khác nhau -> sau khi nhấn nút filter thì công việc mới đăng sẽ được đưa lên đầu ( create at)
  it("LINE 42 - When the filter button is pressed, Tasker creates a lot of tasks, and the job is displayed at the top.", async () => {
    await initData("task/createTask", [
      {
        isoCode: "VN",
        serviceName: "WASHING_MACHINE",
        viewedTaskers: ["0834567814"],
        description: "Task",
        createdAt: moment().add(4, "d").toDate(),
        date: moment().add(4, "d").toDate(),
      },
      {
        isoCode: "VN",
        serviceName: "WASHING_MACHINE",
        viewedTaskers: ["0834567814"],
        description: "Task 01",
        createdAt: moment().add(5, "d").toDate(),
        date: moment().add(5, "d").toDate(),
      },
      {
        isoCode: "VN",
        serviceName: "WASHING_MACHINE",
        viewedTaskers: ["0834567814"],
        description: "Task 02",
        createdAt: moment().add(6, "d").toDate(),
        date: moment().add(6, "d").toDate(),
      },
      {
        isoCode: "VN",
        serviceName: "WASHING_MACHINE",
        viewedTaskers: ["0834567814"],
        description: "Task 03",
        createdAt: moment().add(2, "d").toDate(),
        date: moment().add(2, "d").toDate(),
      },
      {
        isoCode: "VN",
        serviceName: "WASHING_MACHINE",
        viewedTaskers: ["0834567814"],
        description: "Task 04",
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
  // DONE  - PASSING

  // tạo nhiều công việc với những ngày khác nhau -> sau khi nhấn nút filter thì công việc sắp làm sẽ được đưa lên đầu ( date )
  it("LINE 111 - When the filter button is pressed, Tasker creates a lot of tasks, and the job is displayed at the top.", async () => {
    await initData("task/createTask", [
      {
        resetCollection: true,
        isoCode: "VN",
        serviceName: "WASHING_MACHINE",
        viewedTaskers: ["0834567814"],
        description: "Task 05",
        date: moment().add(5, "d").toDate(),
      },
      {
        isoCode: "VN",
        serviceName: "WASHING_MACHINE",
        viewedTaskers: ["0834567814"],
        description: "Task 06",
        date: moment().add(6, "d").toDate(),
      },
      {
        isoCode: "VN",
        serviceName: "WASHING_MACHINE",
        viewedTaskers: ["0834567814"],
        description: "Task 02",
        date: moment().add(2, "d").toDate(),
      },
      {
        isoCode: "VN",
        serviceName: "WASHING_MACHINE",
        viewedTaskers: ["0834567814"],
        description: "Task 03",
        date: moment().add(3, "d").toDate(),
      },
      {
        isoCode: "VN",
        serviceName: "WASHING_MACHINE",
        viewedTaskers: ["0834567814"],
        description: "Task 04",
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
  // DONE  - PASSING

  // Thấy công việc và nhận công việc
  it("LINE 175 - Tasker accept task WASHING_MACHINE vn", async () => {
    await initData("task/createTask", {
      isoCode: "VN",
      serviceName: "WASHING_MACHINE",
      viewedTaskers: ["0834567814"],
      description: "My Task",
    });

    await device.reloadReactNative();
    await waitForElement("newTask_My Task", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await tapId("employee0");
    await tapId("checkBox0");
    await tapId("btnChooseEmployee");
    await tapHeaderBack();
    await tapId("confirmTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("Chi tiết công việc", "text");
  });
  // DONE  - PASSING

  // conflict time
  it("LINE 202 - Tasker accept task cleaning dont see task conflict time", async () => {
    await initData("task/createTask", {
      isoCode: "VN",
      serviceName: "WASHING_MACHINE",
      viewedTaskers: ["0834567814"],
      description: "My task",

    });
    await initData("task/createTask", {
      isoCode: "VN",
      serviceName: "WASHING_MACHINE",
      viewedTaskers: ["0834567814"],
      description: "My task 01",

    });
    await device.reloadReactNative();
    await waitForElement("newTask_My task", 1000);
    await tapId("newTask_My task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await tapId("employee0");
    await tapId("checkBox0");
    await tapId("btnChooseEmployee");
    await tapHeaderBack();
    await tapId("confirmTask_My task");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("Chi tiết công việc", "text");
    await tapHeaderBack();
    await tapId("TabNewTask");

    // Sẽ không check conflict time đối với company
    await expectElementNotExist("newTask_My task");
    await expectElementVisible("newTask_My task 01");
  });
  // DONE  - PASSING

  // Không đủ tiền
  it("LINE 239 - Tasker accept task cleaning not enough money", async () => {
    await initData("task/createTask", {
      isoCode: "VN",
      serviceName: "WASHING_MACHINE",
      viewedTaskers: ["0834567814"],
      description: "My task",

    });
    await initData("update-user/financialAccount", {
      phone: "0834567814",
      isoCode: "VN",
      financialAccountData: { FMainAccount: 100, Promotion: 100 },
    });
    await device.reloadReactNative();
    await waitForElement("newTask_My task", 1000);
    await tapId("newTask_My task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await tapId("employee0");
    await tapId("checkBox0");
    await tapId("btnChooseEmployee");
    await expectElementVisible("Rất tiếc", "text");
    await expectElementVisible("Bạn không đủ tiền trong tài khoản để nhận công việc này. Vui lòng nạp thêm tiền vào tài khoản.", "text");
    await waitForElement("Đóng", 1000, "text");
    await tapText("Đóng");
  });
  // DONE  - PASSING

  it("LINE 264 - Tasker accept task have newCostDetail and not enough money", async () => {
    await initData("vn/task/createTask", {
      isoCode: "VN",
      serviceName: "WASHING_MACHINE",
      viewedTaskers: ["0834567814"],
      description: "My task",

    });
    await initData("vn/updateTask", {
      description: "My task",
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
    await initData("update-user/financialAccount", {
      phone: "0834567814",
      isoCode: "VN",
      financialAccountData: { FMainAccount: 50000, Promotion: 5000 },
    });
    await device.reloadReactNative();
    await waitForElement("TabMyTask", 1000);
    await tapId("newTask_My task");
    await swipe("scrollTaskDetail", "up");
    await swipe("swipeBtn", "right");
    await tapId("employee0");
    await tapId("checkBox0");
    await tapId("btnChooseEmployee");
    await expectElementVisible("Rất tiếc", "text");
    await expectElementVisible("Bạn không đủ tiền trong tài khoản để nhận công việc này. Vui lòng nạp thêm tiền vào tài khoản.", "text");
    await waitForElement("Đóng", 1000, "text");
    await tapText("Đóng");
  });

  it("LINE 318 - Tasker accept task have newCostDetail", async () => {
    await initData("vn/task/createTask", {
      serviceName: "WASHING_MACHINE",
      viewedTaskers: ["0834567814"],
      description: "My Task",

    });
    await initData("update-user/financialAccount", {
      phone: "0834567814",
      isoCode: "VN",
      financialAccountData: { FMainAccount: 500000, Promotion: 50000 },
    });
    await initData("vn/updateTask", {
      description: "My Task",
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
    await tapId("employee0");
    await tapId("checkBox0");
    await tapId("btnChooseEmployee");
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
