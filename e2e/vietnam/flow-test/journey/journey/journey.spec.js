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
    scroll
  } = require("../../../../step-definitions");
  const moment = require("moment");
  // Thấy công việc và nhận công việc
  describe("FILE: vietnam/flow-test/journey/journey.spec.js - Tasker log-in and go to journey from settings", () => {
    beforeEach(async () => {
      await initData("resetData");
      // User 0834567891 - dịch vụ dọn dẹp nhà
      await initData("user/createUser", {
        phone: "0834567891",
        isoCode: "VN",
        name: "Tasker Cleaning",
        resetUser: true,
      });
      await initData("vn/user/addUserToService", {
        phone: "0834567891",
        type: "INSERT",
        serviceName: "CLEANING",
      });
      await device.launchApp();
      await device.reloadReactNative();
    });
    // status : Đã đạt
    it("LINE 36 - Tasker see and PROCESSING", async () => {
      await loginWithPhoneAndPassword("0834567891", "123456", "VN");
      await waitForElement("TabAccount", 1000);
      await tapId('TabAccount');
      await scrollTo('scrollViewAccount', 'bottom');
      await tapId("btnJourneyAndLeaderBoard");
      // SEE: PASSED
      await expectElementVisible("Đã đạt","text");
      await expectElementVisible("Cấp 1","text");
      await expectElementVisible("Ong non","text");
      await expectElementVisible("txtReceivedReward");
    });
    // TASK : PROCESSING ("Đang tiến hành")
    it("LINE 53 - Tasker see and PROCESSING", async () => {
      await loginWithPhoneAndPassword("0834567891", "123456", "VN");
      await waitForElement("TabAccount", 1000);
      await tapId('TabAccount');
      await scrollTo('scrollViewAccount', 'bottom');
      await tapId("btnJourneyAndLeaderBoard");
      // SEE: PROCESSING
      await expectElementVisible("Đang tiến hành","text");
      await waitForElement("MAIN_PRIZE_PROCESSING", 1000);
      await expectElementVisible("MAIN_PRIZE_PROCESSING","id");
      await expectElementVisible("BONUS_PROCESSING","id");
      await tapId("PROCESSING_1");
      await expectElementVisible("Số bài học đã hoàn thành","text");
      await expectElementVisible("Tổng số bài học","text");
      await tapText("Đóng")      
    });

    it("LINE 70 - Tasker see and PROCESSING and see button REWARD", async () => {
      await loginWithPhoneAndPassword("0834567891", "123456", "VN");
      await waitForElement("TabAccount", 1000);
      await tapId('TabAccount');
      await scrollTo('scrollViewAccount', 'bottom');
      await tapId("btnJourneyAndLeaderBoard");
      // SEE: PROCESSING
      await expectElementVisible("Đang tiến hành","text");
      await waitForElement("MAIN_PRIZE_PROCESSING", 1000);
      await expectElementVisible("MAIN_PRIZE_PROCESSING","id");
      await expectElementVisible("BONUS_PROCESSING","id");
      await tapId("PROCESSING_1");
      await expectElementVisible("Số bài học đã hoàn thành","text");
      await expectElementVisible("Tổng số bài học","text");
      await tapText("Đóng");
      await scroll('JOURNEY_SCROLL', 300, 'down', 0.5);
      await expectElementVisible("btn_rewardJourney","id");
      // còn nữa
    });

    it("LINE 90 - Tasker see and PROCESSING and see button REWARD", async () => {
      await loginWithPhoneAndPassword("0834567891", "123456", "VN");
      await waitForElement("TabAccount", 1000);
      await tapId('TabAccount');
      await scrollTo('scrollViewAccount', 'bottom');
      await tapId("btnJourneyAndLeaderBoard");
      // SEE: PROCESSING
      await swipe('JOURNEY_SCROLL', 'up');
      await tapId('btnCurrentLevel');
      // Xem cấp độ hiện tại
      await expectElementVisible("titleCurrentLevel","id");
      await expectElementVisible("txtCurrentLevel");
      await expectElementVisible("txtReward");
      // 
      await expectElementVisible("Công việc đã hoàn thành","text");
      await expectElementVisible("Chất lượng trung bình ( sao )","text");
      await expectElementVisible("Thời gian đã làm ( giờ )","text");
      await expectElementVisible("Bài học đã hoàn thành","text");
      await expectElementVisible("Bài kiểm tra đã hoàn thành","text");
    });

    it("LINE 107 - Tasker see and PROCESSING and see button REWARD", async () => {
      await loginWithPhoneAndPassword("0834567891", "123456", "VN");
      await waitForElement("TabAccount", 1000);
      await tapId('TabAccount');
      await scrollTo('scrollViewAccount', 'bottom');
      await tapId("btnJourneyAndLeaderBoard");
      // Xem cấp độ hiện tại
      await expectElementVisible("Ong non","text");
      await expectElementVisible("Ong trưởng thành","text");
      await scroll('JOURNEY_SCROLL',2000,'down',0.5,0.5);
      await expectElementVisible("Ong thợ","text");
      await expectElementVisible("Ong Chúa","text");
    });

  });
  