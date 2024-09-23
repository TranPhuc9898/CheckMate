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
    await initData("/user/createUser", {
      phone: "0777777777",
      isoCode: "ID",
      resetUser: true,
      type: "ASKER",
      name: "Kaiser",
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
    level: "LV5",
  };

  it("LINE 48 - Tasker see and PROCESSING", async () => {
    const journeyInfo = {
      level: "LV5",
      levelUpAt: moment("2023-03-02T00:00:00.000Z"),
    };
    await initData("vn/task/createTaskJourney", {
      viewedTaskers: ["0834567891"],
      serviceName: "CLEANING",
      acceptedTasker: "0834567891",
      levelUpAt: moment("2023-03-02T00:00:00.000Z"),
    });
    await initData("vn/journey/createJourney", {
      phone: "0834567891",
      isoCode: "VN",
    });
    await initData("user/updateUser", {
      phone: "0834567891",
      isoCode: "VN",
      dataUpdate: { journeyInfo, taskDone: 2000 },
    });
    await  waitForElement("ChooseCountry",500,"id");
    await loginWithPhoneAndPassword("0834567891", "123456", "VN");
    await waitForElement("TabAccount", 1000);
    await tapId("TabAccount");
    await tapId("btnJourneyAndLeaderBoard");
    // PROCESSING
    await expectElementVisible("Đang tiến hành", "text");
    await expectElementVisible("Cấp 5", "text");
    await expectElementVisible("Ong Chúa", "text");
    // Chi tiết của Công Việc Hoàn thành
    await tapId("PROCESSING_0");
    await expectElementVisible("Số sao trung bình từ 4.8 trở lên", "text");
    await expectElementVisible("Số công việc yêu cầu", "text");
    await expectElementVisible("Số công việc đã hoàn thành", "text");
    await expectElementVisible("Bắt đầu từ", "text");
    await tapText("Đóng");

    await tapId("PROCESSING_1");
    // Chi tiết của Đào tạo và kiểm tra Hoàn thành
    // Cấp 5
    await expectElementVisible("txtTitleCondition", "id");
    // Ong Chúa
    await expectElementVisible("txtTextCondition", "id");
    await expectElementVisible("Số tháng đã hoàn thành", "text");
    await expectElementVisible("Tổng số tháng cần làm", "text");
    await expectElementVisible("Bắt đầu từ", "text");
    await expectElementVisible("Số sao trung bình từ 4.8 trở lên","text");
    await tapText("Đóng");
    await tapText("Nhận thưởng ngay");
    await waitForElement("Bảo hiêm sức khoẻ trong 3 tháng",1000,"text")
    // Phần Thưởng Chính
    // Thưởng thêm
    await tapText("Đóng");
    await tapHeaderBack();
    await expectElementVisible("Hành trình","text");
    await expectElementVisible("txtJourneyTitle_Level 5","id");
  });
});
