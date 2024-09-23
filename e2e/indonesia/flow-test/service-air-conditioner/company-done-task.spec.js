/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-11 17:00:42
 * @modify date 2022-10-11 17:00:42
 * @desc [Tasker accept tassk cleaing indo]
 * case 1: Tasker accept task auto confirm and navigate to Chat
 * case 2: Tasker accept task not confirm and navigate to waiting confirm
 */

const {
  tapId,
  initData,
  waitForElement,
  swipe,
  expectElementNotExist,
  tapHeaderBack,
  expectIdToHaveText,
  logout,
  loginWithPhoneAndPassword,
} = require('../../../step-definitions');
const moment = require('moment');

describe('FILE: indonesia/flow-test/thailand/company/done-task/done-task.spec.js - Tasker done task thai land', () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData('user/createUser', {
      phone: '0934567892',
      isoCode: 'ID',
      resetUser: true,
      company: "0834567892",
    });
    await initData("id/user/addUserToService", {
      phone: "0934567892",
      type: "INSERT",
      serviceName: "AIR_CONDITIONER_SERVICE",
    });
    await initData('update-user/financialAccount', { phone: "0834567892", isoCode: "ID", financialAccountData: { ID_FMainAccount: 100000, ID_Promotion: 20000 } })
    await initData('id/update-user/remove-transaction', { phone: "0834567892" });
  });

  afterEach(async () => {
    await initData("update-user/unset-fields", { phone: "0834567892", isoCode: "ID", fields: ["employeeIds", "company"] });
  })

  it('LINE 41 - Tasker done task', async () => {
    await initData('id/task/createTask',
      {
        resetCollection: true,
        serviceName: 'AIR_CONDITIONER_SERVICE',
        viewedTaskers: ["0834567892"],
        description: "My Task",
        acceptedTasker: "0934567892",
        company: "0834567892",
        duration: 2,
        date: moment().subtract(1, 'h').toDate()
      })
    await device.reloadReactNative();
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '100,000Rp');
    await expectIdToHaveText('promotionAccount', '0Rp');
    await tapId('Finance');
    await tapHeaderBack();
    await tapId('TabHome');
    await logout();
    await loginWithPhoneAndPassword("0934567892", "123456");
    await waitForElement('TabMyTask', 1000, 'id');
    await tapId('TabMyTask');
    await tapId('confirmTask_My Task');
    await swipe('scrollTaskDetail', 'up');
    await tapId('btnBeginWork');
    await initData('id/updateTask', {
      description: "My Task",
      dataUpdate: {
        duration: 1,
        "date": moment().subtract(2, 'h').minute(0).toDate(),
      }
    });
    await logout();
    await loginWithPhoneAndPassword("0834567892", "123456");
    await tapId('TabMyTask');
    await tapId('confirmTask_My Task');
    await swipe('scrollTaskDetail', 'up');
    await tapId('btnDoneTask');
    await expectElementNotExist('confirmTask_My Task');
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '100,000Rp');
    await expectIdToHaveText('promotionAccount', '0Rp');
    await tapId('Finance');
    await expectIdToHaveText('transactionHistory-0', '-20,000Rp');
    await expectIdToHaveText('transactionTitle-0', 'Phí thu hộ công ty');
  });

  it('LINE 81 - Tasker done task bpay', async () => {
    const ref = await initData('id/task/createTask',
      {
        resetCollection: true,
        serviceName: 'AIR_CONDITIONER_SERVICE',
        viewedTaskers: ["0834567892"],
        description: "My Task01",
        acceptedTasker: "0934567892",
        company: "0834567892",
        duration: 2,
        date: moment().subtract(1, 'h').toDate()
      });

    await initData('id/updateTask', {
      taskId: ref.taskId, dataUpdate: {
        payment: {
          method: 'CREDIT'
        },
      }
    });
    await device.reloadReactNative();
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '100,000Rp');
    await expectIdToHaveText('promotionAccount', '0Rp');
    await tapId('Finance');
    await expectElementNotExist('transactionHistory-0');
    await tapHeaderBack();
    await logout();
    await loginWithPhoneAndPassword("0934567892", "123456");
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '0Rp');
    await expectIdToHaveText('promotionAccount', '0Rp');
    await tapId('TabHome');
    await waitForElement('TabMyTask', 1000, 'id');
    await tapId('TabMyTask');
    await tapId('confirmTask_My Task01');
    await swipe('scrollTaskDetail', 'up');
    await tapId('btnBeginWork');
    await initData('id/updateTask', {
      description: "My Task01",
      dataUpdate: {
        duration: 1,
        "date": moment().subtract(2, 'h').minute(0).toDate(),
      }
    });
    await logout();
    await loginWithPhoneAndPassword("0834567892", "123456");
    await tapId('TabMyTask');
    await tapId('confirmTask_My Task01');
    await swipe('scrollTaskDetail', 'up');
    await tapId('btnDoneTask');
    await expectElementNotExist('confirmTask_My Task01');
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '200,000Rp');
    await expectIdToHaveText('promotionAccount', '0Rp');
    await tapId('Finance');
    try {
      await expectIdToHaveText('transactionHistory-0', '+100,000Rp');
      await expectIdToHaveText('transactionTitle-0', 'Tiền công việc');
      await expectIdToHaveText('transactionHistory-1', '-20,000Rp');
      await expectIdToHaveText('transactionTitle-1', 'Phí thu hộ công ty');
    } catch (error) {
      await expectIdToHaveText('transactionHistory-0', '-20,000Rp');
      await expectIdToHaveText('transactionTitle-0', 'Phí thu hộ công ty');
      await expectIdToHaveText('transactionHistory-1', '+100,000Rp');
      await expectIdToHaveText('transactionTitle-1', 'Tiền công việc');
    }

  });

  it('LINE 143 - Tasker done task isPrepayTask', async () => {
    await initData('update-user/financialAccount', { phone: "0834567892", isoCode: "ID", financialAccountData: { ID_FMainAccount: 100000, ID_Promotion: 200000 } })
    const ref = await initData('id/task/createTask',
      {
        resetCollection: true,
        serviceName: 'AIR_CONDITIONER_SERVICE',
        viewedTaskers: ["0834567892"],
        description: "My Task01",
        acceptedTasker: "0934567892",
        company: "0834567892",
        duration: 2,
        date: moment().subtract(1, 'h').toDate()
      });

    await initData('id/updateTask', {
      taskId: ref.taskId, dataUpdate: {
        "isPrepayTask": true,
        "payment": {
          "method": "VN_PAY",
          "status": "PAID",
        },
      }
    });
    await device.reloadReactNative();
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '100,000Rp');
    await expectIdToHaveText('promotionAccount', '180,000Rp');
    await tapId('Finance');
    await expectElementNotExist('transactionHistory-0');
    await tapHeaderBack();
    await tapId('TabHome');
    await logout();
    await loginWithPhoneAndPassword("0934567892", "123456");
    await waitForElement('TabMyTask', 1000, 'id');
    await tapId('TabMyTask');
    await tapId('confirmTask_My Task01');
    await swipe('scrollTaskDetail', 'up');
    await tapId('btnBeginWork');
    await initData('id/updateTask', {
      description: "My Task01",
      dataUpdate: {
        duration: 1,
        "date": moment().subtract(2, 'h').minute(0).toDate(),
      }
    });
    await logout();
    await loginWithPhoneAndPassword("0834567892", "123456");
    await tapId('TabMyTask');
    await tapId('confirmTask_My Task01');
    await swipe('scrollTaskDetail', 'up');
    await tapId('btnDoneTask');
    await expectElementNotExist('confirmTask_My Task01');
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '200,000Rp');
    await expectIdToHaveText('promotionAccount', '180,000Rp');
    await tapId('Finance');
    try {
      await expectIdToHaveText('transactionHistory-1', '-20,000Rp');
      await expectIdToHaveText('transactionTitle-1', 'Phí thu hộ công ty');
      await expectIdToHaveText('transactionHistory-0', '+100,000Rp');
      await expectIdToHaveText('transactionTitle-0', 'Tiền công việc');
    } catch (error) {
      await expectIdToHaveText('transactionHistory-0', '-20,000Rp');
      await expectIdToHaveText('transactionTitle-0', 'Phí thu hộ công ty');
      await expectIdToHaveText('transactionHistory-1', '+100,000Rp');
      await expectIdToHaveText('transactionTitle-1', 'Tiền công việc');
    }

  });
})

