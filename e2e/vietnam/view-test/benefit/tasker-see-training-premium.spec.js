/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-06-08 18:16:26
 * @modify date 2023-06-08 18:16:26
 * @desc [Tasker see UI training premium]
 */

const {
  tapId,
  initData,
  expectElementNotExist,
  expectElementVisible,
  loginWithPhoneAndPassword,
} = require('../../../step-definitions');

describe('FILE: vietnam/view-test/benefit/tasker-see-training-premium.spec.js - Tasker see training premium', () => {
  beforeEach(async () => {
    await initData('user/updateUser', {
      dataUpdate: {
        isReadyTaskerPremium: false,
      },
      isoCode: "VN",
      phone: "0834567891",
    });
    await device.launchApp();
    await device.reloadReactNative();
  });

  it('LINE 30 - Tasker not qualify training test and be update to qualify training premium', async () => {
    try {
      await loginWithPhoneAndPassword("0834567891", "123456");
    } catch (error) {
    }
    await tapId("TabBenefit");
    await expectElementNotExist("txtPremium");
    await expectElementNotExist("txtTrainingNow");
    await initData('user/updateUser', {
      dataUpdate: {
        isReadyTaskerPremium: true,
      },
      isoCode: "VN",
      phone: "0834567891",
    });
    await device.reloadReactNative();
    await tapId("TabBenefit");
    await expectElementVisible("txtPremium");
    await expectElementVisible("txtTrainingNow");
  });
})
