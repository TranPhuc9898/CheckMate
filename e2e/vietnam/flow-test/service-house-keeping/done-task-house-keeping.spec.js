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

describe('FILE: vietnam/flow-test/service-house-keeping/done-task-house-keeping.spec.js - Tasker done task Viet Nam', () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData('update-user/financialAccount', { phone: "0834567897", isoCode: "VN", financialAccountData: { FMainAccount: 100000, Promotion: 30000 } })
    await initData('vn/update-user/remove-transaction', { phone: "0834567897" });
  });

  it('LINE 26 - Tasker done task', async () => {
    await initData('vn/task/createTask',
      {
        resetCollection: true,
        serviceName: 'HOUSE_KEEPING',
        viewedTaskers: ["0834567897"],
        description: "My Task",
        acceptedTasker: "0834567897",
        date: moment().subtract(5, 'h').toDate()
      })
    await device.reloadReactNative();
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '100,000₫');
    await expectIdToHaveText('promotionAccount', '10,000₫');
    await tapId('Finance');
    await tapHeaderBack();
    await tapId('TabHome');
    await waitForElement('TabMyTask', 1000, 'id');
    await tapId('TabMyTask');
    await tapId('confirmTask_My Task');
    await swipe('scrollTaskDetail', 'up');
    // await tapId('btnBeginWork');
    // await tapId('confirmTask_My Task');
    // await swipe('scrollTaskDetail', 'up');
    await tapId('btnDoneTask');
    await expectElementNotExist('confirmTask_My Task');
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '100,000₫');
    await expectIdToHaveText('promotionAccount', '10,000₫');
    await tapId('Finance');
    await expectIdToHaveText('transactionHistory-0', '-20,000₫');
  });
  it('LINE 62 - Tasker done task bpay', async () => {
    const ref = await initData('vn/task/createTask',
      {
        resetCollection: true,
        serviceName: 'HOUSE_KEEPING',
        viewedTaskers: ["0834567897"],
        description: "My Task01",
        acceptedTasker: "0834567897",
        date: moment().subtract(5, 'h').toDate()
      });

    await initData('vn/updateTask', {
      taskId: ref.taskId, dataUpdate: {
        payment: {
          method: 'CREDIT'
        },
      }
    });
    await device.reloadReactNative();
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '100,000₫');
    await expectIdToHaveText('promotionAccount', '10,000₫');
    await tapId('Finance');
    await expectElementNotExist('transactionHistory-0');
    await tapHeaderBack();
    await tapId('TabHome');
    await waitForElement('TabMyTask', 1000, 'id');
    await tapId('TabMyTask');
    await tapId('confirmTask_My Task01');
    await swipe('scrollTaskDetail', 'up');
    // await tapId('btnBeginWork');
    // await tapId('confirmTask_My Task01');
    // await swipe('scrollTaskDetail', 'up');
    await tapId('btnDoneTask');
    await expectElementNotExist('confirmTask_My Task01');
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '200,000₫');
    await expectIdToHaveText('promotionAccount', '10,000₫');
    await tapId('Finance');
    try {
      await expectIdToHaveText('transactionHistory-0', '+100,000₫');
      await expectIdToHaveText('transactionHistory-1', '-20,000₫');
    } catch (error) {
      await expectIdToHaveText('transactionHistory-0', '-20,000₫');
      await expectIdToHaveText('transactionHistory-1', '+100,000₫');
    }

  });

  it('LINE 111 - Tasker done task isPrepayTask', async () => {
    const ref = await initData('vn/task/createTask',
      {
        resetCollection: true,
        serviceName: 'HOUSE_KEEPING',
        viewedTaskers: ["0834567897"],
        description: "My Task01",
        acceptedTasker: "0834567897",
        date: moment().subtract(5, 'h').toDate()
      });

    await initData('vn/updateTask', {
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
    await expectIdToHaveText('mainAccount', '100,000₫');
    await expectIdToHaveText('promotionAccount', '10,000₫');
    await tapId('Finance');
    await expectElementNotExist('transactionHistory-0');
    await tapHeaderBack();
    await tapId('TabHome');
    await waitForElement('TabMyTask', 1000, 'id');
    await tapId('TabMyTask');
    await tapId('confirmTask_My Task01');
    await swipe('scrollTaskDetail', 'up');
    // await tapId('btnBeginWork');
    // await tapId('confirmTask_My Task01');
    // await swipe('scrollTaskDetail', 'up');
    await tapId('btnDoneTask');
    await expectElementNotExist('confirmTask_My Task01');
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '200,000₫');
    await expectIdToHaveText('promotionAccount', '10,000₫');
    await tapId('Finance');
    try {
      await expectIdToHaveText('transactionHistory-1', '-20,000₫');
      await expectIdToHaveText('transactionHistory-0', '+100,000₫');
    } catch (error) {
      await expectIdToHaveText('transactionHistory-0', '-20,000₫');
      await expectIdToHaveText('transactionHistory-1', '+100,000₫');
    }

  });
})

