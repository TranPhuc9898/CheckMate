/**
 * @author [QuanNguyen]
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-08-09 16:35:40
 * @modify date 2023-08-09 16:36:07
 * @desc [Tasker see condition upgrade to premium]
 */
/**
 * case 1: Tasker enough condition to upgrade to premium
 * case 2: Tasker not enough condition to upgrade to premium
 */

const {
  tapId,
  expectElementVisible,
  initData,
  loginWithPhoneAndPassword,
} = require('../../../step-definitions');

describe('FILE: vietnam/view-test/training-premium/tasker-see-condition-upgrade-to-premium.spec.js - Tasker see condition upgrade to premium', () => {
  beforeEach(async () => {
    await initData('vn/training/resetData');
    await initData('user/updateUser', {
      dataUpdate: {
        isReadyTaskerPremium: true,
      },
      isoCode: "VN",
      phone: "0834567891",
    });
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
    await expectElementVisible("txtTitleCondition");
    await expectElementVisible("condition_0");
    await expectElementVisible("condition_1");
    await expectElementVisible("condition_2");
    await expectElementVisible("btnStartTraining");
  });

  it('LINE 118 - Tasker not enough condition to upgrade to premium', async () => {
    await initData('vn/training/create-training-test', {});
    await initData('user/updateUser', {
      dataUpdate: {
        isReadyTaskerPremium: false,
      },
      isoCode: "VN",
      phone: "0834567891",
    });
    await device.reloadReactNative();
    try {
      await loginWithPhoneAndPassword("0834567891", "123456");
    } catch (error) {
    }
    await tapId("TabBenefit");
    await expectElementVisible("TrainingPremium");
    await tapId("TrainingPremium");
    await expectElementVisible("txtTitleCondition");
    await expectElementVisible("condition_0");
    await expectElementVisible("condition_1");
    await expectElementVisible("condition_2");
    await expectElementVisible("btnStartTrainingDisabled");
  });

})
