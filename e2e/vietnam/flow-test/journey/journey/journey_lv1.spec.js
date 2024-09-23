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

describe("FILE: vietnam/flow-test/journey/journey_lv1.spec.js - Tasker log-in and go to journey from settings", () => {
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
    level: "LV1",
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
        name: "LV1_TEST_1",
        text: {
          vi: "Đào tạo chất lượng",
          en: "Đào tạo chất lượng",
          th: "Đào tạo chất lượng",
          id: "Đào tạo chất lượng",
        },
      },
      {
        name: "LV1_TEST_2",
        text: {
          vi: "Đào tạo quy định",
          en: "Đào tạo quy định",
          th: "ĐĐào tạo quy định",
          id: "Đào tạo quy định",
        },
      },
      {
        name: "LV1_TEST_3",
        text: {
          vi: "Thái độ làm việc",
          en: "Thái độ làm việc",
          th: "Thái độ làm việc",
          id: "Thái độ làm việc",
        },
      },
    ],
    icon: "https://cdn-icons-png.flaticon.com/512/1039/1039328.png",
  };

  // Journey: Cấp 1: Đang tiến hành  hoàn thành
  it("LINE 80 - Tasker see and PROCESSING", async () => {
    await initData("vn/journey/createJourney", {
      phone: "0834567891",
      isoCode: "VN",
    });
    await initData("user/updateUser", {
      phone: "0834567891",
      isoCode: "VN",
      dataUpdate: { journeyInfo },
    });
    await waitForElement("ChooseCountry",1000,"id")
    await loginWithPhoneAndPassword("0834567891", "123456", "VN");
    await tapId("TabAccount");
    // Trước khi vào journey 
    await expectElementVisible("Hành trình","text");
    await expectElementVisible("txtJourneyTitle_Level 1","id");
    await tapId("btnJourneyAndLeaderBoard");
    // PROCESSING
    await expectElementVisible("Đang tiến hành", "text");
    await expectElementVisible("Cấp 1", "text");
    await expectElementVisible("Ong Non", "text");
    await tapId("PROCESSING_1");
    // Chi tiết của Đào tạo và kiểm tra Hoàn thành
    // Cấp 1
    await expectElementVisible("txtTitleCondition", "id");
    // Ong Non
    await expectElementVisible("txtTextCondition", "id");
    await expectElementVisible("Đào tạo chất lượng", "text");
    // Hoàn thành
    await expectElementVisible("txtSuccess_0", "id");
    await expectElementVisible("Đào tạo quy định", "text");
    await expectElementVisible("txtSuccess_1", "id");
    await expectElementVisible("Thái độ làm việc", "text");
    await expectElementVisible("txtSuccess_2", "id");
    await tapText("Đóng");
    // Chi tiết của Công Việc Hoàn thành
    await tapId("PROCESSING_0");
    await expectElementVisible("Số sao trung bình từ 4.7 trở lên", "text");
    // await expectElementVisible("Số công việc cần làm thêm", "text");
    await expectElementVisible("Số công việc đã hoàn thành", "text");
    await expectElementVisible("Số công việc yêu cầu", "text");
    await tapText("Đóng");
    // Thưởng thêm
    await expectElementVisible("BONUS_PROCESSING", "id");
    await expectElementVisible("btn_rewardJourney", "id");
    await expectElementVisible("txtBonus", "id");
    await tapText("Nhận thưởng ngay");
    await waitForElement("Thăng cấp", 1000, "text");
    await expectElementVisible("Chúc mừng bạn đã đạt đến", "text");
    await expectElementVisible("Cấp 2 - Ong Trưởng Thành", "text");
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
    await expectElementVisible("txtJourneyTitle_Level 2","id");
  });

  it("LINE 152 - Tasker see and PROCESSING", async () => {
    await initData("vn/journey/createJourney", {
      phone: "0834567891",
      isoCode: "VN",
    });
    await initData("user/updateUser", {
      phone: "0834567891",
      isoCode: "VN",
      dataUpdate: { journeyInfo },
    });
    await waitForElement("ChooseCountry",1000,"id")
    await loginWithPhoneAndPassword("0834567891", "123456", "VN");
    await tapId("TabAccount");
    // Trước khi vào journey 
    await expectElementVisible("Hành trình","text");
    await expectElementVisible("txtJourneyTitle_Level 1","id");
    await tapId("btnJourneyAndLeaderBoard");
    // PROCESSING
    await expectElementVisible("Đang tiến hành", "text");
    await expectElementVisible("Cấp 1", "text");
    await expectElementVisible("Ong Non", "text");
    await tapId("PROCESSING_1");
    // Chi tiết của Đào tạo và kiểm tra Hoàn thành
    // Cấp 1
    await expectElementVisible("txtTitleCondition", "id");
    // Ong Non
    await expectElementVisible("txtTextCondition", "id");
    await expectElementVisible("Đào tạo chất lượng", "text");
    // Hoàn thành
    await expectElementVisible("txtSuccess_0", "id");
    await expectElementVisible("Đào tạo quy định", "text");
    await expectElementVisible("txtSuccess_1", "id");
    await expectElementVisible("Thái độ làm việc", "text");
    await expectElementVisible("txtSuccess_2", "id");
    await tapText("Đóng");
    // Chi tiết của Công Việc Hoàn thành
    await tapId("PROCESSING_0");
    await expectElementVisible("Số sao trung bình từ 4.7 trở lên", "text");
    // await expectElementVisible("Số công việc cần làm thêm", "text");
    await expectElementVisible("Số công việc đã hoàn thành", "text");
    await expectElementVisible("Số công việc yêu cầu", "text");
    await tapText("Đóng");
    // Thưởng thêm
    await expectElementVisible("BONUS_PROCESSING", "id");
    await expectElementVisible("btn_rewardJourney", "id");
    // Phần thưởng thêm
    await expectElementVisible("txtBonus", "id");
    await tapId("txtBonus");
    await expectElementVisible("Chi tiết phần thưởng thêm", "text");
  });
  // Nếu taskDone chưa đủ
  it("LINE 202 - Tasker see and PROCESSING", async () => {
    await initData("user/updateUser", {
      phone: "0834567891",
      isoCode: "VN",
      dataUpdate: { taskDone: 1 },
    });
    const journeyInfo = {
      level: "LV1",
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
    await tapId("TabAccount");
    await scrollTo("scrollViewAccount", "bottom");
    await tapId("btnJourneyAndLeaderBoard");
    // PROCESSING
    await expectElementVisible("Đang tiến hành", "text");
    await expectElementVisible("Cấp 1", "text");
    await expectElementVisible("Ong Non", "text");
    // Chi tiết của Công Việc Hoàn thành
    await tapId("PROCESSING_0");
    await expectElementVisible("Số sao trung bình từ 4.7 trở lên", "text");
    await expectElementVisible("Số công việc cần làm thêm", "text");
    await expectElementVisible("txtSuccess_1", "id");
    await expectElementVisible("Số công việc đã hoàn thành", "text");
    await expectElementVisible("txtSuccess_1", "id");
    await expectElementVisible("Số công việc yêu cầu", "text");
    await expectElementVisible("txtSuccess_1", "id");
    await tapText("Đóng");
    // Thưởng thêm
    await expectElementVisible("BONUS_PROCESSING", "id");
    await waitForElement("txtBonus", 300, "id");
    await tapId("txtBonus");
    await expectElementVisible("Chi tiết phần thưởng thêm", "text");
  });
  // taskDone đủ
  it("LINE 172 - Tasker see and PROCESSING", async () => {
    await initData("user/updateUser", {
      phone: "0834567891",
      isoCode: "VN",
      dataUpdate: { taskDone: 30 },
    });
    const journeyInfo = {
      level: "LV1",
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
    await expectElementVisible("Cấp 1", "text");
    await expectElementVisible("Ong Non", "text");
    // Chi tiết của Công Việc Hoàn thành
    await tapId("PROCESSING_0");
    await expectElementVisible("Số sao trung bình từ 4.7 trở lên", "text");
    await expectElementVisible("Số công việc đã hoàn thành", "text");
    await expectElementVisible("Số công việc yêu cầu", "text");
    await tapText("Đóng");
    // Thưởng thêm
    await expectElementVisible("BONUS_PROCESSING", "id");
    await waitForElement("txtBonus", 300, "id");
    await tapId("txtBonus");
    await expectElementVisible("Chi tiết phần thưởng thêm", "text");
  });
});
