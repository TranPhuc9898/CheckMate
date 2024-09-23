/**
 * @author ToanNguyen
 * @email [huutoan.nguyen@btaskee.com]
 * @create date 2022-10-11 17:00:42
 * @modify date 2022-10-11 17:00:42
 * @desc [View finance in tab account]
 */

const {
  tapId,
  tapHeaderBack,
  tapText,
  waitForElement,
} = require('../../../step-definitions');

describe('FILE: see-finance-detail.test.js - View finance in tab account', () => {
  beforeEach(async () => {
    await device.launchApp();
  });

  it('LINE 22 - View topup in Indo', async () => {
    await tapText('Tài khoản');
    await tapId('Finance');
    await tapId('Topup');
    await tapHeaderBack();
  });
})
