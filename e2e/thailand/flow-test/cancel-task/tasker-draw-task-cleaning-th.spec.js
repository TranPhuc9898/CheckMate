/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-02-14 15:24:56
 * @modify date 2023-02-14 15:24:56
 * @desc [Tasker draw task waiting asker confirm]
 * case 1: Tasker draw task waiting asker confirm
 * case 2: Tasker draw task waiting asker confirm, status not change
 */

const {
  tapId,
  expectElementVisible,
  initData,
  waitForElement,
  swipe,
  expectElementNotExist,
  logout,
  loginWithPhoneAndPassword
} = require('../../../step-definitions');

describe('FILE: flow-test/cancel-task/tasker-draw-task-cleaning-th.spec.js - Tasker draw task waiting asker confirm', () => {
  beforeEach(async () => {
    await device.launchApp();
  });

  it('LINE 27 - Tasker draw task waiting asker confirm', async () => {
    await initData('th/task/createTask',
      {
        resetCollection: true,
        serviceName: 'CLEANING',
        viewedTaskers: ["0834567891"],
        description: "My Task",
        acceptedTasker: "0834567891",
        status: "WAITING_ASKER_CONFIRMATION"
      });
    await device.reloadReactNative();
    await waitForElement('btnShowAllTaskWaiting', 500);
    await tapId('btnShowAllTaskWaiting');
    await tapId('btnSeeDetailTaskWaiting_My Task');
    await swipe('scrollTaskDetail', 'up');
    await expectElementVisible('btnDrawTask');
    await tapId('btnDrawTask');
    await tapId('btnConfirmDrawTask');
    await expectElementVisible('drawTaskSuccess');
    await tapId('btnClose');
    await expectElementNotExist('btnShowAllTaskWaiting');
  });

  // Công việc có nhiều người nhận, status giữ nguyên và acceptTasker giảm 1 người.
  it('LINE 55 - Tasker draw task waiting asker confirm, status not change', async () => {
    await initData('/user/createUser', {
      phone: '0834567899',
      isoCode: 'TH',
      resetUser: true,
      avgRating: 5.0,
    });
    await initData('th/task/createTask',
      {
        resetCollection: true,
        serviceName: 'DEEP_CLEANING',
        viewedTaskers: ["0834567891"],
        description: "My Task",
        acceptedTasker: [{ phone: "0834567891" }, { phone: "0834567899" }],
        status: "WAITING_ASKER_CONFIRMATION",
        numberOfTaskersDeepCleaning: 3
      });
    await device.reloadReactNative();
    await logout();
    await loginWithPhoneAndPassword("0834567899", "123456", "TH");
    await waitForElement('btnShowAllTaskWaiting', 500);
    await tapId('btnShowAllTaskWaiting');
    await tapId('btnSeeDetailTaskWaiting_My Task');
    await swipe('scrollTaskDetail', 'up');
    await expectElementVisible('btnDrawTask');
    await tapId('btnDrawTask');
    await tapId('btnConfirmDrawTask');
    await expectElementVisible('drawTaskSuccess');
    await tapId('btnClose');
    // Gỉam 1 người, không có mình trong đó   
    await logout();
    await loginWithPhoneAndPassword("0834567891", "123456", "TH");
    await tapId('btnShowAllTaskWaiting');
    await tapId('btnSeeDetailTaskWaiting_My Task');
    await swipe('scrollTaskDetail', 'up');
    await expectElementVisible('btnDrawTask');
  });
})
