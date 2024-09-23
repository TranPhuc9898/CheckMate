/**
 * @author ToanNguyen
 * @email [huutoan.nguyen@btaskee.com]
 * @create date 2022-10-11 17:00:42
 * @modify date 2022-10-11 17:00:42
 * @desc [View settings in tab account]
 */

const {
  tapId,
  scrollTo,
  initData,
  tapText,
  waitForElement,
} = require('../../../step-definitions');

describe('FILE: view-settings-account.spec.js - View settings in tab account', () => {
  beforeEach(async () => {
    await device.launchApp();
    await waitForElement('TabAccount', 1000);
  });

  it('LINE 22 - View settings change language in tab account', async () => {
    await tapId('TabAccount');
    await scrollTo('scrollViewAccount', 'bottom');
    await tapId('SettingsDetail');
    await tapText('Tiếng Việt');
    await tapText('English');
    await waitForElement('English', 500, 'text');
    await tapText('English');
    await tapText('Tiếng Việt');
    await waitForElement('Tiếng Việt', 500, 'text');
  });

  it('LINE 34 - View settings change free time in tab account', async () => {
    await initData('update-user/remove-freeSchedule', { phone: "0834567891" })
    await device.launchApp();
    await tapId('TabAccount');
    await scrollTo('scrollViewAccount', 'bottom');
    await tapId('SettingsDetail');
    await tapId('0-morning');
    await scrollTo('ScrollViewSettings', 'bottom');
    await tapText('Cập nhật');
    await waitForElement('Cập nhật thành công', 500, 'text');
    await tapText('Đóng');
  });

  it('LINE 47 - View settings change free time in tab account fail', async () => {
    await initData('update-user/profile',
      {
        phone: "0834567891",
        dataUpdate: {
          "freeSchedule": {
            "1": 16785344,
            "2": 17293312,
            "3": 33546240,
            "4": 17293312,
            "5": 16785344,
            "6": 17293312,
            "0": 33554368
          }
        }
      });
    await device.launchApp();
    await tapId('TabAccount');
    await scrollTo('scrollViewAccount', 'bottom');
    await tapId('SettingsDetail');
    await tapId('0-morning');
    await waitForElement('Đóng', 500, 'text');
    await tapText('Đóng');
  });
})
