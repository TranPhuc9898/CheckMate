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
} = require('../../../../step-definitions');
const moment = require('moment');

describe('FILE: flow-test/thailand/company/done-task/done-task.spec.js - Tasker done task thai land', () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData('user/createUser', {
      phone: '0834567892',
      isoCode: 'TH',
      resetUser: true,
      company: "0834567891",
    });
    await initData('update-user/financialAccount', { phone: "0834567891", isoCode: "TH", financialAccountData: { TH_FMainAccount: 3000, TH_Promotion: 2000 } })
    await initData('th/update-user/remove-transaction', { phone: "0834567891" });
    try {
      await loginWithPhoneAndPassword("0834567891", "123456");
    } catch (error) {
    }
  });

  afterEach(async () => {
    await initData("update-user/unset-fields", { phone: "0834567891", isoCode: "TH", fields: ["employeeIds", "company"] });
  })

  it('LINE 41 - Tasker done task', async () => {
    await initData('th/task/createTask',
      {
        resetCollection: true,
        serviceName: 'CLEANING',
        viewedTaskers: ["0834567891"],
        description: "My Task",
        acceptedTasker: "0834567892",
        company: "0834567891",
        date: moment().subtract(5, 'h').toDate()
      })
    await device.reloadReactNative();
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '3,000฿');
    await expectIdToHaveText('promotionAccount', '1,800฿');
    await tapId('Finance');
    await tapHeaderBack();
    await tapId('TabHome');
    await logout();
    await loginWithPhoneAndPassword("0834567892", "123456");
    await waitForElement('TabMyTask', 1000, 'id');
    await tapId('TabMyTask');
    await tapId('confirmTask_My Task');
    await swipe('scrollTaskDetail', 'up');
    await tapId('btnBeginWork');
    await logout();
    await loginWithPhoneAndPassword("0834567891", "123456");
    await tapId('TabMyTask');
    await tapId('confirmTask_My Task');
    await swipe('scrollTaskDetail', 'up');
    await tapId('btnDoneTask');
    await expectElementNotExist('confirmTask_My Task');
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '3,000฿');
    await expectIdToHaveText('promotionAccount', '1,800฿');
    await tapId('Finance');
    await expectIdToHaveText('transactionHistory-0', '-200฿');
    await expectIdToHaveText('transactionTitle-0', 'Phí thu hộ công ty');
  });
  it('LINE 84 - Tasker done task bpay', async () => {
    const ref = await initData('th/task/createTask',
      {
        resetCollection: true,
        serviceName: 'CLEANING',
        viewedTaskers: ["0834567891"],
        description: "My Task01",
        acceptedTasker: "0834567892",
        company: "0834567891",
        date: moment().subtract(5, 'h').toDate()
      });

    await initData('th/updateTask', {
      taskId: ref.taskId, dataUpdate: {
        payment: {
          method: 'CREDIT'
        },
      }
    });
    await device.reloadReactNative();
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '3,000฿');
    await expectIdToHaveText('promotionAccount', '1,800฿');
    await tapId('Finance');
    await expectElementNotExist('transactionHistory-0');
    await tapHeaderBack();
    await logout();
    await loginWithPhoneAndPassword("0834567892", "123456");
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '0฿');
    await expectIdToHaveText('promotionAccount', '0฿');
    await tapId('TabHome');
    await waitForElement('TabMyTask', 1000, 'id');
    await tapId('TabMyTask');
    await tapId('confirmTask_My Task01');
    await swipe('scrollTaskDetail', 'up');
    await tapId('btnBeginWork');
    await logout();
    await loginWithPhoneAndPassword("0834567891", "123456");
    await tapId('TabMyTask');
    await tapId('confirmTask_My Task01');
    await swipe('scrollTaskDetail', 'up');
    await tapId('btnDoneTask');
    await expectElementNotExist('confirmTask_My Task01');
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '4,000฿');
    await expectIdToHaveText('promotionAccount', '1,800฿');
    await tapId('Finance');
    try {
      await expectIdToHaveText('transactionHistory-0', '+1,000฿');
      await expectIdToHaveText('transactionTitle-0', 'Tiền công việc');
      await expectIdToHaveText('transactionHistory-1', '-200฿');
      await expectIdToHaveText('transactionTitle-1', 'Phí thu hộ công ty');
    } catch (error) {
      await expectIdToHaveText('transactionHistory-0', '-200฿');
      await expectIdToHaveText('transactionTitle-0', 'Phí thu hộ công ty');
      await expectIdToHaveText('transactionHistory-1', '+1,000฿');
      await expectIdToHaveText('transactionTitle-1', 'Tiền công việc');
    }

  });

  it('LINE 146 - Tasker done task isPrepayTask', async () => {
    const ref = await initData('th/task/createTask',
      {
        resetCollection: true,
        serviceName: 'CLEANING',
        viewedTaskers: ["0834567891"],
        description: "My Task01",
        acceptedTasker: "0834567892",
        company: "0834567891",
        date: moment().subtract(5, 'h').toDate()
      });

    await initData('th/updateTask', {
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
    await expectIdToHaveText('mainAccount', '3,000฿');
    await expectIdToHaveText('promotionAccount', '1,800฿');
    await tapId('Finance');
    await expectElementNotExist('transactionHistory-0');
    await tapHeaderBack();
    await tapId('TabHome');
    await logout();
    await loginWithPhoneAndPassword("0834567892", "123456");
    await waitForElement('TabMyTask', 1000, 'id');
    await tapId('TabMyTask');
    await tapId('confirmTask_My Task01');
    await swipe('scrollTaskDetail', 'up');
    await tapId('btnBeginWork');
    await logout();
    await loginWithPhoneAndPassword("0834567891", "123456");
    await tapId('TabMyTask');
    await tapId('confirmTask_My Task01');
    await swipe('scrollTaskDetail', 'up');
    await tapId('btnDoneTask');
    await expectElementNotExist('confirmTask_My Task01');
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '4,000฿');
    await expectIdToHaveText('promotionAccount', '1,800฿');
    await tapId('Finance');
    try {
      await expectIdToHaveText('transactionHistory-1', '-200฿');
      await expectIdToHaveText('transactionTitle-1', 'Phí thu hộ công ty');
      await expectIdToHaveText('transactionHistory-0', '+1,000฿');
      await expectIdToHaveText('transactionTitle-0', 'Tiền công việc');
    } catch (error) {
      await expectIdToHaveText('transactionHistory-0', '-200฿');
      await expectIdToHaveText('transactionTitle-0', 'Phí thu hộ công ty');
      await expectIdToHaveText('transactionHistory-1', '+1,000฿');
      await expectIdToHaveText('transactionTitle-1', 'Tiền công việc');
    }

  });
})

