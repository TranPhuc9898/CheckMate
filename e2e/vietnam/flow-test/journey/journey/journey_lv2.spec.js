const {
  tapId,
  expectElementVisible,
  initData,
  tapText,
  waitForElement,
  swipe,
  tapHeaderBack,
  expectIdToHaveText,
  expectElementNotExist,
  loginWithPhoneAndPassword,
  scrollTo,
  scroll,
} = require("../../../../step-definitions");
const moment = require("moment");

describe("FILE: vietnam/flow-test/journey/journey_lv2.spec.js - Tasker log-in and go to journey from settings", () => {
  beforeEach(async () => {
    await initData("resetData");
    await initData("user/createUser", {
      phone: "0834567891",
      isoCode: "VN",
      name: "Tasker Cleaning",
      taskDone: 200,
      avgRating: 5.0,
    });
    await initData("vn/user/addUserToService", {
      phone: "0834567891",
      type: "INSERT",
      serviceName: "CLEANING",
    });

    await device.launchApp();
    await device.reloadReactNative();
  });

  const journeyInfo = {
    level: "LV2",
    name: "TRAINING",
    text: {
      vi: "Đào tạo và kiểm tra",
      en: "Training & Test",
      th: "Training & Test",
      id: "Training & Test",
    },
    target: 1,
    training: [
      {
        name: "LV2_TEST_1",
        text: {
          vi: "Đào tạo dịch vụ thứ 2",
          en: "Đào tạo dịch vụ thứ 2",
          th: "Đào tạo dịch vụ thứ 2",
          id: "Đào tạo dịch vụ thứ 2",
        },
      },
      {
        name: "LV2_TEST_2",
        text: {
          vi: "Đào tạo dịch vụ thứ 3",
          en: "Đào tạo dịch vụ thứ 3",
          th: "Đào tạo dịch vụ thứ 3",
          id: "Đào tạo dịch vụ thứ 3",
        },
      },
      {
        name: "LV2_TEST_3",
        text: {
          vi: "Đào tạo dịch vụ cao cấp",
          en: "Đào tạo dịch vụ cao cấp",
          th: "Đào tạo dịch vụ cao cấp",
          id: "Đào tạo dịch vụ cao cấp",
        },
      },
    ],
  };

  // Journey: Cấp 2: Đang tiến hành  hoàn thành
  it("LINE 79 - Tasker see and PROCESSING", async () => {
    await initData("vn/journey/createJourney", {
      phone: "0834567891",
      isoCode: "VN",
    });
    await initData("user/updateUser", {
      phone: "0834567891",
      isoCode: "VN",
      dataUpdate: { journeyInfo },
    });
    await device.reloadReactNative();
    await loginWithPhoneAndPassword("0834567891", "123456", "VN");
    await waitForElement("TabAccount", 1000);
    await tapId("TabAccount");
    // Trước khi vào journey
    await expectElementVisible("Hành trình", "text");
    await expectElementVisible("txtJourneyTitle_Level 2", "id");
    await tapId("btnJourneyAndLeaderBoard");
    // PROCESSING
    await expectElementVisible("Đang tiến hành", "text");
    await expectElementVisible("Cấp 2", "text");
    await expectElementVisible("Ong Trưởng Thành", "text");
    await tapId("PROCESSING_1");
    // Chi tiết của Đào tạo và kiểm tra Hoàn thành
    // Cấp 2
    await expectElementVisible("txtTitleCondition", "id");
    // Ong trưởng thành
    await expectElementVisible("txtTextCondition", "id");
    await expectElementVisible("Đào tạo dịch vụ thứ 2", "text");
    await expectElementVisible("txtSuccess_0", "id");
    await expectElementVisible("Đào tạo dịch vụ thứ 3", "text");
    await expectElementVisible("txtSuccess_1", "id");
    await expectElementVisible("Đào tạo dịch vụ cao cấp", "text");
    await expectElementVisible("txtSuccess_2", "id");
    await tapText("Đóng");
    // Chi tiết của Công Việc Hoàn thành
    await tapId("PROCESSING_0");
    await expectElementVisible("Số sao trung bình từ 4.7 trở lên", "text");
    // await expectElementVisible("Số công việc cần làm thêm", "text");
    await expectElementVisible("Số công việc đã hoàn thành", "text");
    await expectElementVisible("Số công việc yêu cầu", "text");
    await tapText("Đóng");

    // Phần Thưởng Chính
    await waitForElement("MAIN_PRIZE_PROCESSING", 1000);
    await expectElementVisible("MAIN_PRIZE_PROCESSING", "id");
    // Thưởng thêm
    await expectElementVisible("BONUS_PROCESSING", "id");
    await expectElementVisible("btn_rewardJourney", "id");
    await tapText("Nhận thưởng ngay");
    await expectElementVisible("Chúc mừng bạn đã đạt đến","text");
    await expectElementVisible("Cấp 3 - Ong Thợ","text");
    await expectElementVisible(
      "Nhận phần thưởng cho những nỗ lực của bạn và cố gắng hơn nữa trong tương lai nhé các chị Ong!",
      "text"
    );
    await waitForElement(
      "Xem phần thưởng",500,
      "text"
    );
    await tapText("Xem phần thưởng");
    await tapText("Phần thưởng tiếp theo");
    await tapText("Phần thưởng tiếp theo");
    await expectElementVisible("Đóng", "text");
    await tapText("Đóng");
    await tapHeaderBack();
    await expectElementVisible("Hành trình","text");
    await expectElementVisible("txtJourneyTitle_Level 3","id");
  });

  it("LINE 149 - Tasker see and PROCESSING", async () => {
    const journeyInfo = {
      level: "LV2",
    };
    await initData("vn/journey/createJourney", {
      phone: "0834567891",
      isoCode: "VN",
    });
    await initData("user/updateUser", {
      phone: "0834567891",
      isoCode: "VN",
      dataUpdate: { journeyInfo },
    });
    await device.reloadReactNative();
    await loginWithPhoneAndPassword("0834567891", "123456", "VN");
    await waitForElement("TabAccount", 1000);
    await tapId("TabAccount");
    await scrollTo("scrollViewAccount", "bottom");
    await tapId("btnJourneyAndLeaderBoard");
    // PROCESSING
    await expectElementVisible("Đang tiến hành", "text");
    await expectElementVisible("Cấp 2", "text");
    await expectElementVisible("Ong Trưởng Thành", "text");
    // Chi tiết của Công Việc Hoàn thành
    await tapId("PROCESSING_0");
    await expectElementVisible("Số sao trung bình từ 4.7 trở lên", "text");
    // await expectElementVisible("Số công việc cần làm thêm", "text");
    await expectElementVisible("Số công việc đã hoàn thành", "text");
    await expectElementVisible("Số công việc yêu cầu", "text");
    await tapText("Đóng");

    // Phần Thưởng Chính
    await waitForElement("MAIN_PRIZE_PROCESSING", 1000);
    await expectElementVisible("MAIN_PRIZE_PROCESSING", "id");
    // Thưởng thêm
    await expectElementVisible("BONUS_PROCESSING", "id");
  });
});
