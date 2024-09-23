/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
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
  initData,
  tapText,
  waitForElement,
  swipe,
  tapHeaderBack,
  expectIdToHaveText,
  expectElementNotExist,
  expectElementVisible,
} = require("../../../step-definitions");
const moment = require("moment");
describe("FILE: vietnam/flow-test/accept-task/accept-task-LAUNDRY-vn.spec.js - Tasker accept task LAUNDRY vn", () => {
  beforeEach(async () => {
    await initData("vn/services/update", {
      serviceName: "LAUNDRY",
      dataUpdate: {
        minAvgRating: 4.6,
        minTaskDone: 20,
      },
    });
    await initData("vn/user/addUserToService", {
      phone: "0834567891",
      type: "INSERT",
      serviceName: "LAUNDRY",
    });
    await initData("update-user/financialAccount", {
      phone: "0834567891",
      isoCode: "VN",
      financialAccountData: { FMainAccount: 3000000, Promotion: 20000000 },
    });

    await initData('/user/createUser', {
      phone: '0834567898',
      company: "0834567891",
      name: "Tasker 01",
      isoCode: 'VN',
      resetUser: true,
    });
    await initData('/user/createUser', {
      phone: '0834567897',
      company: "0834567891",
      isoCode: 'VN',
      name: "Tasker 02",
      resetUser: true,
    });
    await initData('/user/createUser', {
      phone: '0834567899',
      company: "0834567891",
      name: "Tasker 03",
      isoCode: 'VN',
      resetUser: true,
    });
    await initData("vn/user/addUserToService", {
      phone: "0834567891",
      type: "INSERT",
      serviceName: "LAUNDRY"
    });
    await initData("vn/user/addUserToService", {
      phone: "0834567899",
      type: "INSERT",
      serviceName: "LAUNDRY"
    });
    await initData("vn/user/addUserToService", {
      phone: "0834567898",
      type: "INSERT",
      serviceName: "LAUNDRY"
    });
    await initData("vn/user/addUserToService", {
      phone: "0834567897",
      type: "INSERT",
      serviceName: "LAUNDRY"
    });

    const tasker = await initData("user/get-user", { phone: "0834567891", isoCode: "VN" });
    await initData("user/updateUser",
      {
        phone: "0834567891",
        isoCode: "VN",
        employees: ["0834567898", "0834567897", "0834567899"],
        dataUpdate: {
          company: {
            companyId: tasker._id,
            acceptPermission: true
          }
        }
      }
    );

    await device.launchApp();

  });
  afterEach(async () => {
    await initData("update-user/unset-fields", { phone: "0834567891", isoCode: "VN", fields: ["employeeIds", "company"] });
    await initData("vn/user/addUserToService", {
      phone: "0834567891",
      type: "REMOVE",
      serviceName: "LAUNDRY",
    });
  });

  // tạo nhiều công việc với những ngày khác nhau -> sau khi nhấn nút filter thì công việc mới đăng sẽ được đưa lên đầu ( create at)
  it("LINE 58 - When the filter button is pressed, Tasker creates a lot of tasks, and the job is displayed at the top.", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "LAUNDRY",
      viewedTaskers: ["0834567891"],
      description: "LAUNDRY4",
      createdAt: moment().add(4, "d").toDate(),
      date: moment().add(4, "d").toDate(),
      collectionDate: moment().add(3, "d").toDate(),
    });
    await initData("vn/task/createTask", {
      serviceName: "LAUNDRY",
      viewedTaskers: ["0834567891"],
      description: "LAUNDRY5",
      createdAt: moment().add(5, "d").toDate(),
      date: moment().add(5, "d").toDate(),
      collectionDate: moment().add(4, "d").toDate(),
    });
    await initData("vn/task/createTask", {
      serviceName: "LAUNDRY",
      viewedTaskers: ["0834567891"],
      description: "LAUNDRY6",
      createdAt: moment().add(6, "d").toDate(),
      date: moment().add(6, "d").toDate(),
      collectionDate: moment().add(5, "d").toDate(),
    });
    await initData("vn/task/createTask", {
      serviceName: "LAUNDRY",
      viewedTaskers: ["0834567891"],
      description: "LAUNDRY2",
      createdAt: moment().add(2, "d").toDate(),
      date: moment().add(2, "d").toDate(),
      collectionDate: moment().add(1, "d").toDate(),
    });
    await initData("vn/task/createTask", {
      serviceName: "LAUNDRY",
      viewedTaskers: ["0834567891"],
      description: "LAUNDRY3",
      createdAt: moment().add(3, "d").toDate(),
      date: moment().add(3, "d").toDate(),
      collectionDate: moment().add(2, "d").toDate(),
    });
    await device.reloadReactNative();
    await waitForElement("btnFilter", 1000);
    await tapId("btnFilter");
    await waitForElement("btnFilterCreateAt", 1000);
    await tapId("btnFilterCreateAt");

    // Đã được sắp xếp
    await expectIdToHaveText(
      "taskDate_0",
      moment().add(5, "d").format("DD/MM/YYYY")
    );
    await expectIdToHaveText(
      "taskDate_1",
      moment().add(4, "d").format("DD/MM/YYYY")
    );
    await expectIdToHaveText(
      "taskDate_2",
      moment().add(3, "d").format("DD/MM/YYYY")
    );
    await expectIdToHaveText(
      "taskDate_3",
      moment().add(2, "d").format("DD/MM/YYYY")
    );
  });
  // DONE  - PASSING

  // tạo nhiều công việc với những ngày khác nhau -> sau khi nhấn nút filter thì công việc sắp làm sẽ được đưa lên đầu ( date )
  it("LINE 127 - When the filter button is pressed, Tasker creates a lot of tasks, and the job is displayed at the top.", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "LAUNDRY",
      viewedTaskers: ["0834567891"],
      description: "LAUNDRY5",
      date: moment().add(5, "d").toDate(),
      collectionDate: moment().add(4, "d").toDate(),
    });
    await initData("vn/task/createTask", {
      serviceName: "LAUNDRY",
      viewedTaskers: ["0834567891"],
      description: "LAUNDRY6",
      date: moment().add(6, "d").toDate(),
      collectionDate: moment().add(5, "d").toDate(),
    });
    await initData("vn/task/createTask", {
      serviceName: "LAUNDRY",
      viewedTaskers: ["0834567891"],
      description: "LAUNDRY2",
      date: moment().add(2, "d").toDate(),
      collectionDate: moment().add(1, "d").toDate(),
    });
    await initData("vn/task/createTask", {
      serviceName: "LAUNDRY",
      viewedTaskers: ["0834567891"],
      description: "LAUNDRY3",
      date: moment().add(3, "d").toDate(),
      collectionDate: moment().add(2, "d").toDate(),
    });
    await initData("vn/task/createTask", {
      serviceName: "LAUNDRY",
      viewedTaskers: ["0834567891"],
      description: "LAUNDRY4",
      date: moment().add(4, "d").toDate(),
      collectionDate: moment().add(3, "d").toDate(),
    });
    await device.reloadReactNative();
    await waitForElement("btnFilter", 1000);
    await tapId("btnFilter");
    await waitForElement("btnFilterDate", 1000);
    await tapId("btnFilterDate");

    // Đã được sắp xếp
    await expectIdToHaveText(
      "taskDate_0",
      moment().add(1, "d").format("DD/MM/YYYY")
    );
    await expectIdToHaveText(
      "taskDate_1",
      moment().add(2, "d").format("DD/MM/YYYY")
    );
    await expectIdToHaveText(
      "taskDate_2",
      moment().add(3, "d").format("DD/MM/YYYY")
    );
    await expectIdToHaveText(
      "taskDate_3",
      moment().add(4, "d").format("DD/MM/YYYY")
    );
  });
  // DONE  - PASSING
  it("LINE 189 - Tasker see and accept task laundry vn, see in waiting task", async () => {
    await device.reloadReactNative();
    const date = moment().add(2, "d").toDate();
    const collectionDate = moment().add(1, "d").toDate();
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "LAUNDRY",
      viewedTaskers: ["0834567891"],
      description: "My Task",
      status: "POSTED",
      date: date,
      collectionDate: collectionDate,
    });
    await device.reloadReactNative();
    await waitForElement("TabTaskWaitingCollect", 1000);
    await waitForElement("newTask_My Task", 1000);
    await tapId("newTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await waitForElement(`Thời gian nhận đồ: ${moment(collectionDate).locale("vi").format('HH:mm, DD/MM/YYYY')}`, 1000, "text");
    await waitForElement(`Thời gian trả đồ: ${moment(date).locale("vi").format('HH:mm, DD/MM/YYYY')}`, 1000, "text");
    await swipe("swipeBtn", "right");
    await tapId("employee0");
    await tapId("checkBox0");
    await tapId("btnChooseEmployee");
    await tapHeaderBack();
    await waitForElement("weekdays_1", 500);
    await tapId("weekdays_1");
    await tapId("collectTask_My Task");
    await swipe("scrollTaskDetail", "up");
    await tapId("btnPickUpClothes");
    await tapId("washing0");
    await waitForElement("Giặt sấy", 1000, "text");
    await tapId("btnConfirmCollected");
    await expectElementNotExist("collectTask_My Task");
    await tapId("TabTaskLaundryWaitingReturn");
    await waitForElement("weekdays_2", 500);
    await tapId("weekdays_2");
    await expectElementVisible("waitingReturnTask_My Task");
    await device.reloadReactNative();
  });

});
