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
  reloadApp,
} = require('../../../step-definitions');
const moment = require('moment');

describe('FILE: vietnam/flow-test/service-cleaning/done-task-cleaning.spec.js - Tasker done task Viet Nam', () => {
  beforeEach(async () => {
    await reloadApp();
    await device.launchApp();
    await initData('update-user/financialAccount', { phone: "0834567814", isoCode: "VN", financialAccountData: { FMainAccount: 100000, Promotion: 30000 } })
    await initData('vn/update-user/remove-transaction', { phone: "0834567814" });
    await initData('user/createUser', {
      phone: '0834567892',
      isoCode: 'VN',
      resetUser: true,
    });
    const tasker = await initData("user/get-user", { phone: "0834567892", isoCode: "VN" });
    await initData("user/updateUser",
      {
        phone: "0834567814",
        isoCode: "VN",
        employees: ["0834567892"],
        dataUpdate: {
          company: {
            companyId: tasker._id,
            acceptPermission: true
          }
        }
      }
    );
  });

  afterEach(async () => {
    await initData("update-user/unset-fields", { phone: "0834567814", isoCode: "VN", fields: ["employeeIds", "company"] });
  })


  it('LINE 26 - Tasker done task', async () => {
    await initData('task/createTask',
      {
        isoCode: "VN",
        serviceName: 'WASHING_MACHINE',
        viewedTaskers: ["0834567814"],
        description: "My Task",
        acceptedTasker: ["0834567814"],
        status: "CONFIRMED",
        duration: 4,
        date: moment().subtract(5, 'h').toDate()
      })

    await initData('vn/updateTask', {
      description: "My Task", dataUpdate: {
        "payment": {
          "method": "CASH",
        },
        "promotion": {
        },
        "cost": 100000,
        "costDetail": {
          "baseCost": 100000.0,
          "cost": 100000.0,
          "finalCost": 100000.0,
          "duration": 1,
          "currency": {
            "sign": "₫",
            "code": "VN"
          },
        },
      }
    });
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
    await tapId('TabAccount');
    await expectIdToHaveText('mainAccount', '100,000₫');
    await expectIdToHaveText('promotionAccount', '10,000₫');
    await tapId('Finance');
    await expectIdToHaveText('transactionHistory-0', '-20,000₫');
  });

  it('LINE 62 - Tasker done task bpay', async () => {
    await initData('task/createTask',
      {
        isoCode: "VN",
        serviceName: 'WASHING_MACHINE',
        viewedTaskers: ["0834567814"],
        description: "My Task01",
        duration: 4,
        acceptedTasker: ["0834567814"],
        status: "CONFIRMED",
        date: moment().subtract(5, 'h').toDate()
      });

    await initData('vn/updateTask', {
      description: "My Task01", dataUpdate: {
        payment: {
          method: 'CREDIT'
        },
        "promotion": {
        },
        "cost": 100000,
        "costDetail": {
          "baseCost": 100000.0,
          "cost": 100000.0,
          "finalCost": 100000.0,
          "duration": 1,
          "currency": {
            "sign": "₫",
            "code": "VN"
          },
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
    await initData('task/createTask',
      {
        isoCode: "VN",
        duration: 4,
        serviceName: 'WASHING_MACHINE',
        viewedTaskers: ["0834567814"],
        description: "My Task01",
        acceptedTasker: ["0834567814"],
        status: "CONFIRMED",
        date: moment().subtract(5, 'h').toDate()
      });

    await initData('vn/updateTask', {
      description: "My Task01",
      dataUpdate: {
        "isPrepayTask": true,
        "payment": {
          "method": "VN_PAY",
          "status": "PAID",
        },
        "promotion": {
        },
        "cost": 100000,
        "costDetail": {
          "baseCost": 100000.0,
          "cost": 100000.0,
          "finalCost": 100000.0,
          "duration": 1,
          "currency": {
            "sign": "₫",
            "code": "VN"
          },
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

