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
const moment = require('moment');
// Thấy công việc và nhận công việc 
describe("FILE: indonesia/flow-test/company/accept-task/accept-task-air-conditioner.spec.js - Tasker accept task air conditioner th", () => {
  beforeEach(async () => {
    await initData('/user/createUser', {
      phone: '0934567898',
      company: "0834567892",
      name: "Tasker 01",
      isoCode: 'ID',
      resetUser: true,
    });
    await initData('/user/createUser', {
      phone: '0934567897',
      company: "0834567892",
      isoCode: 'ID',
      name: "Tasker 02",
      resetUser: true,
    });
    await initData('/user/createUser', {
      phone: '0934567899',
      company: "0834567892",
      name: "Tasker 03",
      isoCode: 'ID',
      resetUser: true,
    });
    await initData("id/user/addUserToService", {
      phone: "0934567899",
      type: "INSERT",
      serviceName: "AIR_CONDITIONER_SERVICE"
    });
    await initData("id/user/addUserToService", {
      phone: "0934567898",
      type: "INSERT",
      serviceName: "AIR_CONDITIONER_SERVICE"
    });
    await initData("id/user/addUserToService", {
      phone: "0934567897",
      type: "INSERT",
      serviceName: "AIR_CONDITIONER_SERVICE"
    });
    const tasker = await initData("user/get-user", { phone: "0834567892", isoCode: "ID" });
    await initData("user/updateUser",
      {
        phone: "0834567892",
        isoCode: "ID",
        employees: ["0934567898", "0934567897", "0934567899"],
        dataUpdate: {
          company: {
            companyId: tasker._id,
            acceptPermission: true
          }
        }
      }
    );
    await initData('update-user/financialAccount', { phone: "0834567892", isoCode: "ID", financialAccountData: { ID_FMainAccount: 100000, ID_Promotion: 100000 } })
    await device.launchApp();
  });

  afterEach(async () => {
    // await initData("update-user/unset-fields", { phone: "0834567892", isoCode: "ID", fields: ["employeeIds", "company"] });
  })

  const detail = [
    {
      "type": {
        "name": "Wall",
        "text": {
          "vi": "Treo tường",
          "en": "Wall",
          "ko": "벽걸이",
          "ID": "ติดผนัง"
        }
      },
      "services": [
        {
          "name": "Cleaning",
          "text": {
            "vi": "Vệ sinh",
            "en": "Cleaning",
            "ko": "청소",
            "ID": "ล้างแอร์"
          }
        }
      ],
      "hp": {
        "to": 2.0
      },
      "quantity": 1
    }
  ];

  it("LINE 118 - Company accept task and assign employee", async () => {
    await initData("id/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "AirConditioner",
      detail: detail,
    });
    await device.reloadReactNative();
    await expectElementNotExist("employee_Tasker 01");
    await tapId("newTask_AirConditioner");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("1 máy", "text");
    await expectElementVisible("Treo tường", "text");
    await swipe("swipeBtn", "right");
    await tapId("employee0");
    await tapId("checkBox0");
    await tapId("btnChooseEmployee");
    await tapHeaderBack();
    await expectElementVisible("employee_Tasker 01");
    await expectIdToHaveText('employee_Tasker 01', 'Tasker 01');
    await tapId("confirmTask_AirConditioner");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("btn_chat");
    await expectElementVisible("btn_call");
    await expectElementVisible("btn_cancel");
    await expectElementVisible("Chi tiết công việc", "text");
    await tapHeaderBack();
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '100,000Rp');
    await expectIdToHaveText('promotionAccount', '80,000Rp');
  });

  it("LINE 151 - Company accept task and assign employee, Company not enough money", async () => {
    await initData("id/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "AirConditioner",
      detail: detail,
    });
    await initData('update-user/financialAccount', { phone: "0834567892", isoCode: "ID", financialAccountData: { ID_FMainAccount: 10, ID_Promotion: 10 } })
    await initData('update-user/financialAccount', { phone: "0934567898", isoCode: "ID", financialAccountData: { ID_FMainAccount: 1000, ID_Promotion: 1000 } })
    await device.reloadReactNative();
    await tapId("newTask_AirConditioner");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("1 máy", "text");
    await expectElementVisible("Treo tường", "text");
    await swipe("swipeBtn", "right");
    await tapId("employee0");
    await tapId("checkBox0");
    await tapId("btnChooseEmployee");
    await expectElementVisible("Rất tiếc", "text");
    await waitForElement('Bạn không đủ tiền trong tài khoản để nhận công việc này. Vui lòng nạp thêm tiền vào tài khoản.', 1000, "text");
    await waitForElement('Đóng', 1000, "text");
    await tapText("Đóng");
  });

  it("LINE 176 - Company accept task and assign employee and employee not enough money", async () => {
    await initData("id/task/createTask", {
      resetCollection: true,
      serviceName: "AIR_CONDITIONER_SERVICE",
      viewedTaskers: ["0834567892"],
      description: "AirConditioner",
      detail: detail,
    });
    await initData('update-user/financialAccount', { phone: "0834567892", isoCode: "ID", financialAccountData: { ID_FMainAccount: 10, ID_Promotion: 10 } })
    await initData('update-user/financialAccount', { phone: "0934567898", isoCode: "ID", financialAccountData: { ID_FMainAccount: 10, ID_Promotion: 10 } })
    await device.reloadReactNative();
    await tapId("newTask_AirConditioner");
    await swipe("scrollTaskDetail", "up");
    await expectElementVisible("1 máy", "text");
    await expectElementVisible("Treo tường", "text");
    await swipe("swipeBtn", "right");
    await tapId("employee0");
    await tapId("checkBox0");
    await tapId("btnChooseEmployee");
    await expectElementVisible("Rất tiếc", "text");
    await waitForElement('Bạn không đủ tiền trong tài khoản để nhận công việc này. Vui lòng nạp thêm tiền vào tài khoản.', 1000, "text");
    await waitForElement('Đóng', 1000, "text");
    await tapText("Đóng");
  });
});