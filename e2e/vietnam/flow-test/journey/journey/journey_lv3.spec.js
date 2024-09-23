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
describe("FILE: vietnam/flow-test/journey/journey_lv3.spec.js - Tasker log-in and go to journey from settings", () => {
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
    level: "LV3",
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
        name: "LV3_TEST_1",
        text: {
          vi: "Đào tạo tư duy dịch vụ",
          en: "Đào tạo tư duy dịch vụ",
          th: "Đào tạo tư duy dịch vụ",
          id: "Đào tạo tư duy dịch vụ",
        },
      },
      {
        name: "LV3_TEST_2",
        text: {
          vi: "Giải tỏa căng thẳng",
          en: "Giải tỏa căng thẳng",
          th: "Giải tỏa căng thẳng",
          id: "Giải tỏa căng thẳng",
        },
      },
      {
        name: "LV3_TEST_3",
        text: {
          vi: "Tư duy tích cực",
          en: "Tư duy tích cực",
          th: "Tư duy tích cực",
          id: "Tư duy tích cực",
        },
      },
    ],
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRircywqqgMi-6h_tGdwwahNzSu-HhJalmL0h6MxbVDIJyCBiP9IQeqrxOC2f0sHnfp-ak&usqp=CAU",
  };

  // Journey: Cấp 3: Đang tiến hành  hoàn thành
  it("LINE 80 - Tasker see and PROCESSING", async () => {
    await initData("vn/journey/createJourney", {
      phone: "0834567891",
      isoCode: "VN",
    });
    await initData("user/updateUser", {
      phone: "0834567891",
      isoCode: "VN",
      dataUpdate: { journeyInfo, taskDone: 1000 },
    });
    await device.reloadReactNative();
    await loginWithPhoneAndPassword("0834567891", "123456", "VN");
    await waitForElement("TabAccount", 1000);
    await tapId("TabAccount");
    // Trước khi vào journey
    await expectElementVisible("Hành trình", "text");
    await expectElementVisible("txtJourneyTitle_Level 3", "id");
    await tapId("btnJourneyAndLeaderBoard");
    // PROCESSING
    await expectElementVisible("Đang tiến hành", "text");
    await expectElementVisible("Cấp 3", "text");
    await expectElementVisible("Ong Thợ", "text");
    await tapId("PROCESSING_1");
    // Chi tiết của Đào tạo và kiểm tra Hoàn thành
    // Cấp 2
    await expectElementVisible("txtTitleCondition", "id");
    // Ong trưởng thành
    await expectElementVisible("txtTextCondition", "id");
    await expectElementVisible("Đào tạo tư duy dịch vụ", "text");
    // Hoàn thành
    await expectElementVisible("txtSuccess_0", "id");
    await expectElementVisible("Giải tỏa căng thẳng", "text");
    await expectElementVisible("txtSuccess_1", "id");
    await expectElementVisible("Tư duy tích cực", "text");
    await expectElementVisible("txtSuccess_2", "id");
    await tapText("Đóng");
    // Chi tiết của Công Việc Hoàn thành
    await tapId("PROCESSING_0");
    await expectElementVisible("Số sao trung bình từ 4.8 trở lên", "text");
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
    await waitForElement("Thăng cấp", 1000, "text");
    await expectElementVisible("Chúc mừng bạn đã đạt đến", "text");
    await expectElementVisible("Cấp 4 - Ong Chiến Binh", "text");
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
    await expectElementVisible("txtJourneyTitle_Level 4","id");
  });

  it("LINE 152 - Tasker see and PROCESSING", async () => {
    const journeyInfo = {
      level: "LV3",
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
    await tapId("btnJourneyAndLeaderBoard");
    // PROCESSING
    await expectElementVisible("Đang tiến hành", "text");
    await expectElementVisible("Cấp 3", "text");
    await expectElementVisible("Ong Thợ", "text");
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
    await expectElementVisible("Đào tạo tư duy dịch vụ", "text");
    await expectElementVisible("Giải tỏa căng thẳng", "text");
    await expectElementVisible("Tư duy tích cực", "text");
    await tapText("Đóng");
    await expectElementVisible("Tăng 30% khi tích điểm bPoint", "text");
    // Phần Thưởng Chính
    await waitForElement("MAIN_PRIZE_PROCESSING", 1000);
    await expectElementVisible("MAIN_PRIZE_PROCESSING", "id");
    // Thưởng thêm
    await expectElementVisible("BONUS_PROCESSING", "id");
  });
});
