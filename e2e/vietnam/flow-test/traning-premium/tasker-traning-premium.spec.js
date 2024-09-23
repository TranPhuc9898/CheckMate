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
  tapText,
} = require('../../../step-definitions');

describe('FILE: vietnam/flow-test/tasker-traning/tasker-traning-premium-indo.spec.js - Tasker traning premium', () => {
  beforeEach(async () => {
    await initData('user/updateUser', {
      dataUpdate: {
        isReadyTaskerPremium: true,
      },
      isoCode: "VN",
      phone: "0834567891",
    });
    await initData('vn/training/resetData');
    await initData('vn/quizForTaskerPremium/update', {
      isAdd: true,
      quizForTaskerPremium: {
        "_id": "62afdcb1d3e6c9ad8b9bfc4e",
        "maxNumberOfExecution": 3,
        "target": 2,
        "quizzes": [
          {
            "_id": "62afdcb1d3e6c9ad8b9bfc4f",
            "question": "bTaskee có phải công ty môi giới dịch vụ không? nếu không thì bTaskee là gì?",
            "answers": [
              "bTaskee không phải công ty môi giới dịch vụ , btaskee là công ty giúp việc hàng đầu Việt Nam",
              "Đúng, bTaskee là công ty môi giới dịch vụ, môi giới người giúp việc cho khách hàng",
              "bTaskee không phải công ty môi giới dịch vụ, bTaskee là ứng dụng cung cấp người giúp việc nhà theo giờ hoạt động trên nền tảng công nghệ thông tin ( trên ĐTDĐ)"
            ],
            "rightAnswer": [
              0
            ]
          },
          {
            "_id": "62afdcb1d3e6c9ad8b9bfc50",
            "question": "Câu slogan của bTaskee là gì?",
            "answers": [
              "Sạch gọn chỉnh chu nhiệt tình và phải nhiệt huyết với công việc",
              "bTaskee - Sự lựa chọn hoàn hảo để chăm sóc ngôi nhà bạn.",
              "Những chị ong chăm chỉ",
              "Lướt - chạm cho cuộc sống thảnh thơi"
            ],
            "rightAnswer": [
              0
            ]
          }
        ]
      }
    });
    await initData('vn/quizForTaskerPremiumHistory/update', { isRemove: true });
    await device.launchApp();
    await device.reloadReactNative();
  });

  it('LINE 76 - Tasker not have training test', async () => {
    await tapId("TabBenefit");
    await tapId("TrainingPremium");
    await tapId("btnStartTraining");
    await tapId("btnConfirmStartTraining");
    await tapId("answer-1-A");
    await tapId("answer-2-A");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");
    await waitForElement('Chúc mừng bạn đã vượt qua bài kiểm tra', 1000, 'text');
    await tapText("Đóng");
    await expectElementNotExist("btnStartTraining");
  });

  it('LINE 90 - Tasker not have training test', async () => {
    await tapId("TabBenefit");
    await tapId("TrainingPremium");
    await tapId("btnStartTraining");
    await tapId("btnConfirmStartTraining");
    await tapId("answer-1-A");
    await swipe("scrollQuiz", "up");
    await tapId("answer-2-B");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");
    await waitForElement('Bạn chưa vượt qua bài kiểm tra. Bạn còn 2 lần làm lại. Hãy cẩn thận nhé!', 1000, 'text');
    await tapText("Đóng");
    await tapId("answer-1-C");
    await tapId("answer-2-C");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");
    await waitForElement('Bạn chưa vượt qua bài kiểm tra. Bạn còn 1 lần làm lại. Hãy cẩn thận nhé!', 1000, 'text');
    await tapText("Đóng");
    await tapId("answer-2-D");
    await tapId("answer-1-C");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");
    await waitForElement('Bạn đã không vượt qua được bài kiểm tra. Vui lòng liên hệ với tổng đài để biết thêm chi tiết!', 1000, 'text');
    await tapText("Đóng");
    await expectElementNotExist("btnStartTraining");
  });

  it('LINE 118 - Tasker pass training test', async () => {
    await initData('vn/training/create-training-test', {});
    await device.reloadReactNative();
    await tapId("TabBenefit");
    await tapId("TrainingPremium");
    await tapId("btnStartTraining");
    await tapId("btnConfirmStartTraining");
    await tapId("answer-1-C");
    await tapId("answer-2-A");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");
    await waitForElement('Bạn chưa vượt qua bài kiểm tra. Bạn còn 2 lần làm lại. Hãy cẩn thận nhé!', 1000, 'text');
    await tapText("Đóng");
    await tapId("answer-1-A");
    await tapId("answer-2-A");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");
    await waitForElement('Chúc mừng bạn đã vượt qua bài kiểm tra', 1000, 'text');
    await tapText("Đóng");
  });

  it('LINE 139 - Tasker test false training test and lock if false 2turn', async () => {
    await initData('vn/quizForTaskerPremium/update', {
      isAdd: true,
      quizForTaskerPremium: {
        "_id": "62afdcb1d3e6c9ad8b9bfc4e",
        "maxNumberOfExecution": 2,
        "target": 2,
        "quizzes": [
          {
            "_id": "62afdcb1d3e6c9ad8b9bfc4f",
            "question": "bTaskee có phải công ty môi giới dịch vụ không? nếu không thì bTaskee là gì?",
            "answers": [
              "bTaskee không phải công ty môi giới dịch vụ , btaskee là công ty giúp việc hàng đầu Việt Nam",
              "Đúng, bTaskee là công ty môi giới dịch vụ, môi giới người giúp việc cho khách hàng",
              "bTaskee không phải công ty môi giới dịch vụ, bTaskee là ứng dụng cung cấp người giúp việc nhà theo giờ hoạt động trên nền tảng công nghệ thông tin ( trên ĐTDĐ)"
            ],
            "rightAnswer": [
              0
            ]
          },
          {
            "_id": "62afdcb1d3e6c9ad8b9bfc50",
            "question": "Câu slogan của bTaskee là gì?",
            "answers": [
              "Sạch gọn chỉnh chu nhiệt tình và phải nhiệt huyết với công việc",
              "bTaskee - Sự lựa chọn hoàn hảo để chăm sóc ngôi nhà bạn.",
              "Những chị ong chăm chỉ",
              "Lướt - chạm cho cuộc sống thảnh thơi"
            ],
            "rightAnswer": [
              0
            ]
          }
        ]
      }
    });
    await device.reloadReactNative();
    await tapId("TabBenefit");
    await tapId("TrainingPremium");
    await tapId("btnStartTraining");
    await tapId("btnConfirmStartTraining");
    await tapId("answer-1-C");
    await tapId("answer-2-A");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");
    await waitForElement('Bạn chưa vượt qua bài kiểm tra. Bạn còn 1 lần làm lại. Hãy cẩn thận nhé!', 1000, 'text');
    await tapText("Đóng");
    await tapId("answer-1-A");
    await tapId("answer-2-A");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");
    await waitForElement('Chúc mừng bạn đã vượt qua bài kiểm tra', 1000, 'text');
    await tapText("Đóng");
  });

  it('LINE 194 - Tasker false test and backend open', async () => {
    await initData('vn/training/create-training-test', {});
    await initData('vn/quizForTaskerPremium/update', {
      isAdd: true,
      quizForTaskerPremium: {
        "_id": "62afdcb1d3e6c9ad8b9bfc4e",
        "maxNumberOfExecution": 2,
        "target": 2,
        "quizzes": [
          {
            "_id": "62afdcb1d3e6c9ad8b9bfc4f",
            "question": "bTaskee có phải công ty môi giới dịch vụ không? nếu không thì bTaskee là gì?",
            "answers": [
              "bTaskee không phải công ty môi giới dịch vụ , btaskee là công ty giúp việc hàng đầu Việt Nam",
              "Đúng, bTaskee là công ty môi giới dịch vụ, môi giới người giúp việc cho khách hàng",
              "bTaskee không phải công ty môi giới dịch vụ, bTaskee là ứng dụng cung cấp người giúp việc nhà theo giờ hoạt động trên nền tảng công nghệ thông tin ( trên ĐTDĐ)"
            ],
            "rightAnswer": [
              0
            ]
          },
          {
            "_id": "62afdcb1d3e6c9ad8b9bfc50",
            "question": "Câu slogan của bTaskee là gì?",
            "answers": [
              "Sạch gọn chỉnh chu nhiệt tình và phải nhiệt huyết với công việc",
              "bTaskee - Sự lựa chọn hoàn hảo để chăm sóc ngôi nhà bạn.",
              "Những chị ong chăm chỉ",
              "Lướt - chạm cho cuộc sống thảnh thơi"
            ],
            "rightAnswer": [
              0
            ]
          }
        ]
      }
    });
    await device.reloadReactNative();
    await tapId("TabBenefit");
    await tapId("TrainingPremium");
    await tapId("btnStartTraining");
    await tapId("btnConfirmStartTraining");
    await tapId("answer-1-C");
    await tapId("answer-2-A");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");
    await waitForElement('Bạn chưa vượt qua bài kiểm tra. Bạn còn 1 lần làm lại. Hãy cẩn thận nhé!', 1000, 'text');
    await tapText("Đóng");
    await tapId("answer-1-B");
    await tapId("answer-2-A");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");
    await waitForElement('Bạn đã không vượt qua được bài kiểm tra. Vui lòng liên hệ với tổng đài để biết thêm chi tiết!', 1000, 'text');
    await tapText("Đóng");
    await expectElementNotExist("btnStartTraining");
    await initData('user/updateUser', {
      dataUpdate: {
        isReadyTaskerPremium: true,
      },
      isoCode: "VN",
      phone: "0834567891",
    });
    await device.reloadReactNative();
    await tapId("TabBenefit");
    await tapId("TrainingPremium");
    await tapId("btnStartTraining");
    await tapId("btnConfirmStartTraining");
    await tapId("answer-1-C");
    await tapId("answer-2-A");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");
    await waitForElement('Bạn chưa vượt qua bài kiểm tra. Bạn còn 1 lần làm lại. Hãy cẩn thận nhé!', 1000, 'text');
    await tapText("Đóng");
    await tapId("answer-1-B");
    await tapId("answer-2-A");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");
    await waitForElement('Bạn đã không vượt qua được bài kiểm tra. Vui lòng liên hệ với tổng đài để biết thêm chi tiết!', 1000, 'text');
    await tapText("Đóng");
  });
})
