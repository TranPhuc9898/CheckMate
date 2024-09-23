/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-11-16 15:47:33
 * @modify date 2022-11-16 15:47:33
 * @desc [Tasker traning input Indo]
 */
/**
 * case 1: Tasker not have training test
 * case 2: Tasker pass training test
 * case 3: Tasker test false training test and lock if false 2turn
 * case 4: Tasker false test and backend open
 */

const {
  tapId,
  expectElementVisible,
  initData,
  waitForElement,
  swipe,
  loginWithPhoneAndPassword,
  logout,
  expectElementNotExist,
} = require('../../../step-definitions');

describe('FILE: flow-test/accept-task/accept-task-cleaing-indo.spec.js - Tasker accept tassk cleaing indo', () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData('/user/updateUser', {
      phone: '0834567891',
      dataUpdate: {
        status: "UNVERIFIED"
      }
    });
    await initData('th/training/resetData', {});
    await device.reloadReactNative();
  });

  it('LINE 32 - Tasker not have training test', async () => {
    try {
      await loginWithPhoneAndPassword("0834567891", "123456", "TH");
    } catch (error) {
      await logout();
      await loginWithPhoneAndPassword("0834567891", "123456", "TH");
    }
    await waitForElement('Bài kiểm tra', 500, 'text');
    await waitForElement('Chào mừng bạn đến với bTaskee', 500, 'text');
  });

  it('LINE 43 - Tasker pass training test', async () => {
    await initData('th/training/create-training-test', {});
    await device.reloadReactNative();
    try {
      await loginWithPhoneAndPassword("0834567891", "123456", "TH");
    } catch (error) {
      await logout();
      await loginWithPhoneAndPassword("0834567891", "123456", "TH");
    }
    await waitForElement('Bài kiểm tra', 500, 'text');
    await waitForElement('btnStartTraining', 500);
    await tapId("btnStartTraining");
    await tapId("btnConfirmStartTraining");
    await waitForElement('answer_1_B', 500);
    await tapId("answer_1_B");
    await tapId("answer_2_B");
    await swipe("scrollQuiz", "up");
    await tapId("answer_3_B");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");
    await tapId("btnStartTraining");
    await tapId("btnConfirmStartTraining");
    await tapId("answer20");
    await tapId("answer21");
    await swipe("scrollQuiz", "up");
    await tapId("answer22");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");
    await expectElementVisible("txtPassTest");
    await expectElementVisible("bTaskee's Tower Indonesian", "text");
  });

  it('LINE 74 - Tasker test false training test and lock if false 2turn', async () => {
    await initData('training/create-training-test', {});
    await initData('training/create-training-history', { phone: "0834567891", numberFalse: 2 })
    await device.reloadReactNative();
    try {
      await loginWithPhoneAndPassword("0834567891", "123456", "TH");
    } catch (error) {
      await logout();
      await loginWithPhoneAndPassword("0834567891", "123456", "TH");
    }
    await waitForElement('Bài kiểm tra', 500, 'text');
    await waitForElement('btnStartTraining', 500);
    await tapId("btnStartTraining");
    await tapId("btnConfirmStartTraining");
    await tapId("answer10");
    await tapId("answer11");
    await swipe("scrollQuiz", "up");
    await tapId("answer12");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");
    await expectElementVisible("btnSeeResult");
    await tapId("btnSeeResult");
    await expectElementVisible("btnQuitTest");
    await tapId("btnQuitTest");
    await expectElementNotExist("txtPassTest");
  });

  it('LINE 101 - Tasker false test and backend open', async () => {
    await initData('training/create-training-test', {});
    await initData('training/create-training-history', { phone: "0834567891", numberFalse: 3 })
    await initData("user/updateUser", { phone: "0834567891", dataUpdate: { isRetrainingTasker: true } })
    await device.reloadReactNative();
    try {
      await loginWithPhoneAndPassword("0834567891", "123456", "TH");
    } catch (error) {
      await logout();
      await loginWithPhoneAndPassword("0834567891", "123456", "TH");
    }
    await expectElementVisible("btnStartTraining");
    await tapId("btnStartTraining");
    await tapId("btnConfirmStartTraining");
    await tapId("answer20");
    await tapId("answer21");
    await swipe("scrollQuiz", "up");
    await tapId("answer22");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");
    await tapId("btnStartTraining");
    await tapId("btnConfirmStartTraining");
    await tapId("answer20");
    await tapId("answer21");
    await swipe("scrollQuiz", "up");
    await tapId("answer22");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");
    await expectElementVisible("txtPassTest");
  });
})
