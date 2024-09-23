/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-01-31 10:40:36
 * @modify date 2023-01-31 10:40:36
 * @desc [Tasker see notification happy birthday]
 */

const {
  tapId,
  expectElementVisible,
  initData,
  loginWithPhoneAndPassword,
  expectElementNotExist,
  tapText,
  tapHeaderBack,
} = require('../../step-definitions');

describe('FILE: view-test/happy-birthday-tasker.spec.js - Tasker see reward Indo', () => {
  beforeEach(async () => {
    await device.launchApp();
    try {
      loginWithPhoneAndPassword("0834567891", "123456");
    } catch (error) {
    }
  });

  it('LINE 30 - Tasker see notification happy birthday', async () => {
    await initData('id/remove-notification');
    await initData('id/create-notification', {
      phone: "0834567891",
      dataNotify: {
        "type" : 25,
        "description" : "Chuc mung sinh nhat ne hihi",
        "title" : "HAPPY_BIRTHDAY_NOTIFICATION_CONTENT",
    }
    });
    await device.reloadReactNative();
    await tapId("TabNotification");
    await tapId("TabNotificationSystem");
    await expectElementVisible("Chuc mung sinh nhat ne hihi", "text");
    await tapText("Chuc mung sinh nhat ne hihi");
    await expectElementVisible("Chuc mung sinh nhat ne hihi", "text");
    await tapHeaderBack();
  });
})
