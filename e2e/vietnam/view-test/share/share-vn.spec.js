/**
 * @author Hong Phuc
 */

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
    loginWithPhoneAndPassword
  } = require("../../../step-definitions");
  const moment = require('moment');
  // Thấy công việc và nhận công việc 
  describe("FILE: view-test/share/share-vn.spec.js - Tasker see Share Screen", () => {
    beforeEach(async () => {
        await device.launchApp();
    });
  
    // Nhân tới tab chia sẻ và thấy được thông tin chia sẻ
    it("LINE 25 - When the filter button is pressed, Tasker creates a lot of tasks, and the job is displayed at the top.", async () => {
      await device.reloadReactNative();
      await waitForElement("TabAccount", 1000);
      await tapId("TabAccount");
      await swipe("scrollViewAccount", "up");
      await waitForElement("btnViewMore", 1000);
      await tapId("btnViewMore"); 
      await expectElementVisible("Quà tặng cho bạn và cho tôi","text");
      await expectElementVisible("Mã giới thiệu của bạn","text");
      await waitForElement("btnCopy", 1000);
      await tapId("btnCopy"); 
      await expectElementVisible("Đã sao chép","text");
    });
  });