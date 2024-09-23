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
// Thấy công việc và nhận công việc
describe("FILE: vietnam/flow-test/journey/journey_lv4.spec.js - Tasker log-in and go to journey from settings", () => {
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
    level: "LV4",
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
        name: "LV4_TEST_1",
        text: {
          vi: "Trí tuệ cảm xúc",
          en: "Trí tuệ cảm xúc",
          th: "Trí tuệ cảm xúc",
          id: "Trí tuệ cảm xúc",
        },
      },
      {
        name: "LV4_TEST_2",
        text: {
          vi: "Công tác truyền thông",
          en: "Công tác truyền thông",
          th: "Công tác truyền thông",
          id: "Công tác truyền thông",
        },
      },
      {
        name: "LV4_TEST_3",
        text: {
          vi: "Tài chính cá nhân",
          en: "Tài chính cá nhân",
          th: "Tài chính cá nhân",
          id: "Tài chính cá nhân",
        },
      },
    ],
    icon: "https://cdn-icons-png.flaticon.com/512/1039/1039328.png",
  };

  // Journey: Cấp 3: Đang tiến hành  hoàn thành
  it("LINE 82 - Tasker see and PROCESSING", async () => {
    await initData("vn/journey/createJourney", {
      phone: "0834567891",
      isoCode: "VN",
    });
    await initData("user/updateUser", {
      phone: "0834567891",
      isoCode: "VN",
      dataUpdate: { journeyInfo, taskDone: 2000 },
    });
    await device.reloadReactNative();
    await loginWithPhoneAndPassword("0834567891", "123456", "VN");
    await waitForElement("TabAccount", 1000);
    await tapId("TabAccount");
    // Trước khi vào journey
    await expectElementVisible("Hành trình", "text");
    await expectElementVisible("txtJourneyTitle_Level 4", "id");
    await tapId("btnJourneyAndLeaderBoard");
    // PROCESSING
    await expectElementVisible("Đang tiến hành", "text");
    await expectElementVisible("Cấp 4", "text");
    await expectElementVisible("Ong Chiến Binh", "text");
    await tapId("PROCESSING_1");
    // Chi tiết của Đào tạo và kiểm tra Hoàn thành
    // Cấp 2
    await expectElementVisible("txtTitleCondition", "id");
    // Ong trưởng thành
    await expectElementVisible("txtTextCondition", "id");
    await expectElementVisible("Trí tuệ cảm xúc", "text");
    await expectElementVisible("txtSuccess_0", "id");
    await expectElementVisible("Công tác truyền thông", "text");
    await expectElementVisible("txtSuccess_1", "id");
    await expectElementVisible("Tài chính cá nhân", "text");
    await expectElementVisible("txtSuccess_2", "id");
    await tapText("Đóng");
    // Chi tiết của Công Việc Hoàn thành
    await tapId("PROCESSING_0");
    await expectElementVisible("Số sao trung bình từ 4.8 trở lên", "text");
    await expectElementVisible("Số công việc đã hoàn thành", "text");
    await expectElementVisible("Số công việc yêu cầu", "text");
    await tapText("Đóng");
    // Phần Thưởng Chính
    await waitForElement("MAIN_PRIZE_PROCESSING", 1000);
    await expectElementVisible("MAIN_PRIZE_PROCESSING", "id");
    // Thưởng thêm
    await expectElementVisible("BONUS_PROCESSING", "id");
    await scroll("JOURNEY_SCROLL", 300, "down", 0.5);
    await expectElementVisible("btn_rewardJourney", "id");
    await tapText("Nhận thưởng ngay");
    await waitForElement("Thăng cấp", 1000, "text");
    await expectElementVisible("Chúc mừng bạn đã đạt đến", "text");
    await expectElementVisible("Cấp 5 - Ong Chúa", "text");
    await expectElementVisible(
      "Nhận phần thưởng cho những nỗ lực của bạn và cố gắng hơn nữa trong tương lai nhé các chị Ong!",
      "text"
    );
    await waitForElement("Xem phần thưởng", 500, "text");
    await tapText("Xem phần thưởng");
    await tapText("Phần thưởng tiếp theo");
    await tapText("Phần thưởng tiếp theo");
    await expectElementVisible("Đóng", "text");
    await tapText("Đóng");
    await tapHeaderBack();
    await expectElementVisible("Hành trình", "text");
    await expectElementVisible("txtJourneyTitle_Level 5", "id");
  });

  it("LINE 129 - Tasker see and PROCESSING", async () => {
    const journeyInfo = {
      level: "LV4",
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
    await expectElementVisible("Cấp 4", "text");
    await expectElementVisible("Ong Chiến Binh", "text");
    // Chi tiết của Công Việc Hoàn thành
    await tapId("PROCESSING_0");
    await expectElementVisible("Số sao trung bình từ 4.8 trở lên", "text");
    await expectElementVisible("Số công việc cần làm thêm", "text");
    await expectElementVisible("Số công việc đã hoàn thành", "text");
    await expectElementVisible("Số công việc yêu cầu", "text");
    await tapText("Đóng");

    await tapId("PROCESSING_1");
    // Chi tiết của Đào tạo và kiểm tra Hoàn thành
    // Cấp 2
    await expectElementVisible("txtTitleCondition", "id");
    // Ong trưởng thành
    await expectElementVisible("txtTextCondition", "id");
    await expectElementVisible("Trí tuệ cảm xúc", "text");
    await expectElementVisible("Công tác truyền thông", "text");
    await expectElementVisible("Tài chính cá nhân", "text");
    await tapText("Đóng");
    await expectElementVisible("Tăng 40% khi tích điểm bPoint", "text");
    // Phần Thưởng Chính
    await waitForElement("MAIN_PRIZE_PROCESSING", 1000);
    await expectElementVisible("MAIN_PRIZE_PROCESSING", "id");
    // Thưởng thêm
    await expectElementVisible("BONUS_PROCESSING", "id");
  });
});
