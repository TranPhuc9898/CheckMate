/**
 * @author [QuanNguyen]
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-08-09 16:35:32
 * @modify date 2023-08-09 16:35:36
 * @desc [Tasker see regulations premium]
 */
/**
 * case 1: Tasker enough condition to upgrade to premium
 */

const {
  tapId,
  expectElementVisible,
  initData,
  loginWithPhoneAndPassword,
} = require('../../../step-definitions');

describe('FILE: vietnam/view-test/training-premium/tasker-see-ragulation-premium.spec.js - Tasker see regulations premium', () => {
  beforeEach(async () => {
    await initData('vn/training/resetData');
    await initData('user/updateUser', {
      dataUpdate: {
        isPremiumTasker: true,
      },
      isoCode: "VN",
      phone: "0834567891",
    });
    await device.launchApp();
    await device.reloadReactNative();
  });

  it('LINE 69 - Tasker enough condition to upgrade to premium', async () => {
    await initData('vn/training/create-training-test', {});
    await device.reloadReactNative();
    try {
      await loginWithPhoneAndPassword("0834567891", "123456");
    } catch (error) {
    }
    await tapId("TabBenefit");
    await expectElementVisible("TrainingPremium");
    await tapId("TrainingPremium");
    await expectElementVisible("txtTitleRegulations");
    await expectElementVisible("regulation_0");
    await expectElementVisible("regulation_1");
  });
})
