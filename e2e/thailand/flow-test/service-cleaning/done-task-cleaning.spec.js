/**
 * @author HuuToan
 * @email [huutoan.nguyen@btaskee.com]
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
} = require('../../../step-definitions');
const moment = require('moment');

describe('FILE: thailand/flow-test/service-cleaning/done-task-cleaning.spec.js - Tasker done task Thailand', () => {
  beforeEach(async () => {
    await initData('resetData');
    await device.launchApp();
    await initData('update-user/financialAccount', { phone: "0834567891", isoCode: "TH", financialAccountData: { TH_FMainAccount: 1000, TH_Promotion: 300 } })
    await initData('user/remove-transaction', { phone: "0834567891", isoCode: "TH" });
  });

  it('LINE 29 - Tasker done task', async () => {
    await initData('task/createTask',
      {
        isoCode: "TH",
        serviceName: 'CLEANING',
        viewedTaskers: ["0834567891"],
        description: "My Task",
        acceptedTasker: ["0834567891"],
        date: moment().subtract(5, 'h').toDate()
      })
    await device.reloadReactNative();
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '1,000฿');
    await expectIdToHaveText('promotionAccount', '100฿');
    await tapId('Finance');
    await tapHeaderBack();
    await tapId('TabHome');
    await waitForElement('TabMyTask', 1000, 'id');
    await tapId('TabMyTask');
    await tapId('confirmTask_My Task');
    await swipe('scrollTaskDetail', 'up');
    await tapId('btnDoneTask');
    await waitForElement('confirmTask_My Task', 1000);
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '1,000฿');
    await expectIdToHaveText('promotionAccount', '100฿');
    await tapId('Finance');
    await expectIdToHaveText('transactionHistory-0', '-200฿');
  });
  it('LINE 58 - Tasker done task bpay', async () => {
    await initData('task/createTask',
      {
        isoCode: "TH",
        serviceName: 'CLEANING',
        viewedTaskers: ["0834567891"],
        description: "My Task01",
        acceptedTasker: ["0834567891"],
        date: moment().subtract(5, 'h').toDate()
      });

    await initData('task/updateTask', {
      isoCode: "TH",
      description: "My Task01",
      dataUpdate: {
        payment: {
          method: 'CREDIT'
        },
      }
    });
    await device.reloadReactNative();
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '1,000฿');
    await expectIdToHaveText('promotionAccount', '100฿');
    await tapId('Finance');
    await expectElementNotExist('transactionHistory-0');
    await tapHeaderBack();
    await tapId('TabHome');
    await waitForElement('TabMyTask', 1000, 'id');
    await tapId('TabMyTask');
    await tapId('confirmTask_My Task01');
    await swipe('scrollTaskDetail', 'up');
    await tapId('btnDoneTask');
    await waitForElement('confirmTask_My Task01', 1000);
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '2,000฿');
    await expectIdToHaveText('promotionAccount', '100฿');
    await tapId('Finance');
    try {
      await expectIdToHaveText('transactionHistory-0', '+1,000฿');
      await expectIdToHaveText('transactionHistory-1', '-200฿');
    } catch (error) {
      await expectIdToHaveText('transactionHistory-0', '-200฿');
      await expectIdToHaveText('transactionHistory-1', '+1,000฿');
    }
  });

  it('LINE 103 - Tasker done task isPrepayTask', async () => {
    await initData('task/createTask',
      {
        isoCode: "TH",
        serviceName: 'CLEANING',
        viewedTaskers: ["0834567891"],
        description: "My Task01",
        acceptedTasker: ["0834567891"],
        date: moment().subtract(5, 'h').toDate()
      });

    await initData('task/updateTask', {
      isoCode: "TH",
      description: "My Task01",
      dataUpdate: {
        "isPrepayTask": true,
        "payment": {
          "method": "VN_PAY",
          "status": "PAID",
        },
      }
    });
    await device.reloadReactNative();
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '1,000฿');
    await expectIdToHaveText('promotionAccount', '100฿');
    await tapId('Finance');
    await expectElementNotExist('transactionHistory-0');
    await tapHeaderBack();
    await tapId('TabHome');
    await waitForElement('TabMyTask', 1000, 'id');
    await tapId('TabMyTask');
    await tapId('confirmTask_My Task01');
    await swipe('scrollTaskDetail', 'up');
    await tapId('btnDoneTask');
    await waitForElement('confirmTask_My Task01', 1000);
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '2,000฿');
    await expectIdToHaveText('promotionAccount', '100฿');
    await tapId('Finance');
    try {
      await expectIdToHaveText('transactionHistory-1', '-200฿');
      await expectIdToHaveText('transactionHistory-0', '+1,000฿');
    } catch (error) {
      await expectIdToHaveText('transactionHistory-0', '-200฿');
      await expectIdToHaveText('transactionHistory-1', '+1,000฿');
    }
  });
})

