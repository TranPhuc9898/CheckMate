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
  
  describe("FILE: vietnam/flow-test/leaderBoard/leaderBoard_lv2.spec.js - Tasker log-in and go to journey to see LeaderBoard", () => {
    beforeEach(async () => {
      await initData("resetData");
      await initData("user/createUser", {
        phone: "0834567891",
        isoCode: "VN",
        name: "Tasker Cleaning",
        taskDone: 200,
        avgRating: 5.0,
        rank: 1,
        level:"LV2"
      });
      await initData("vn/user/addUserToService", {
        phone: "0834567891",
        type: "INSERT",
        serviceName: "CLEANING",
      });
  
      await device.launchApp();
      await device.reloadReactNative();
    });
  
    // LeaderBoard LV:1
    it("LINE 41 - Tasker see and PROCESSING", async () => {
      // Tasker Đứng đầu
      await initData("vn/journey/createLeaderBoard", {
        phone: "0834567891",
        level: "LV2",
        title: {
          vi: "Cấp 2",
          en: "Level 2",
        },
        text: {
          vi: "Ong Trưởng Thành",
          en: "Mature Bee",
        },
      });
      await device.reloadReactNative();
      await loginWithPhoneAndPassword("0834567891", "123456", "VN");
      await waitForElement("TabAccount", 1000);
      await tapId("TabAccount");
      await scrollTo("scrollViewAccount", "bottom");
      await tapId("btnJourneyAndLeaderBoard");
      await tapId("LEADER_BOARD_SCREEN");
      await expectElementVisible("Hành trình", "text");
      await expectElementVisible("Cấp 2", "text");
      await expectElementVisible("Ong Trưởng Thành", "text");
      await expectElementVisible("Tasker Cleaning", "text");
      await expectElementVisible("9000", "text");
      await expectElementVisible("1", "text");
    });
    // Tasker đứng chót
    it("LINE 69 - Tasker see and PROCESSING", async () => {
      await device.reloadReactNative();
      await initData("user/updateUser", {
        phone: "0834567891",
        isoCode: "VN",
        dataUpdate: { rank: 10 },
      });
      await initData("vn/journey/createLeaderBoard", {
        phone: "0834567891",
        level: "LV2",
        title: {
          vi: "Cấp 2",
          en: "Level 2",
        },
        text: {
          vi: "Ong Trưởng Thành",
          en: "Mature Bee",
        },
      });
      await device.reloadReactNative();
      await loginWithPhoneAndPassword("0834567891", "123456", "VN");
      await waitForElement("TabAccount", 1000);
      await tapId("TabAccount");
      await scrollTo("scrollViewAccount", "bottom");
      await tapId("btnJourneyAndLeaderBoard");
      await tapId("LEADER_BOARD_SCREEN");
  
      await expectElementVisible("Hành trình", "text");
      await expectElementVisible("Cấp 2", "text");
      await expectElementVisible("Ong Trưởng Thành", "text");
      await swipe("scrollLeaderBoard","up")
      await waitForElement("Tasker Cleaning",500,"text");
      await expectElementVisible("Tasker Cleaning", "text");
      await expectElementVisible("9000", "text");
      await expectElementVisible("10", "text");
    });
  });
  