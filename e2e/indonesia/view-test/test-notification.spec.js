/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-02-13 15:15:43
 * @modify date 2023-02-13 15:15:43
 * @desc [Tasker press button test notification and exits app]
 */

const {
  tapId,
  expectElementVisible,
  loginWithPhoneAndPassword,
  expectElementNotExist,
  scrollTo,
  swipe,
} = require('../../step-definitions');

describe('FILE: view-test/check-notification.spec.js - Tasker press button test notification and exits app', () => {
  beforeEach(async () => {
    await device.launchApp();
    try {
      await loginWithPhoneAndPassword("0834567891", "123456");
    } catch (error) {
    }
  });

  it('LINE 30 - Tasker press button test notification and exits app', async () => {
    await device.reloadReactNative();
    await tapId("TabAccount");
    await scrollTo('scrollViewAccount', 'bottom');
    await tapId('SettingsDetail');
    await swipe("ScrollViewSettings", "up");
    await expectElementVisible("txtCheckNotify");
    await expectElementVisible("btnSendNotify");
    await expectElementVisible("txtResetApp");
    await tapId("btnSendNotify");
    await tapId("btnOk");
  });
})
