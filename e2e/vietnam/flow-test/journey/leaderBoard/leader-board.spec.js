const { isAwaitExpression } = require("typescript");
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
  expectElementNotVisible,
} = require("../../../../step-definitions");
const moment = require("moment");
// Thấy công việc và nhận công việc
describe("FILE: vietnam/flow-test/accept-task/accept-task-GO_MARKET-vn.spec.js - Tasker accept task go market th", () => {
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
    await initData("vn/journey/createJourney", {
      phone: "0834567891",
      isoCode: "VN",
    });
    await device.launchApp();
    await device.reloadReactNative();
  });

  it("LINE 41 - Tasker see and press LEADER-BOARD", async () => {
    await loginWithPhoneAndPassword("0834567891", "123456", "VN");
    await waitForElement("TabAccount", 1000);
    await tapId("TabAccount");
    await scrollTo("scrollViewAccount", "bottom");
    await tapId("btnJourneyAndLeaderBoard");
    await tapId("LEADER_BOARD_SCREEN");
    //
    await expectElementVisible("Cấp 1 - Nhập môn", "text");
    await expectElementVisible("• 100 days remain", "text");
    await expectElementVisible("1", "text");
    await expectElementVisible("Jennie", "text");
    await expectElementVisible("2", "text");
    await expectElementVisible("Lisa", "text");
    await expectElementVisible("3", "text");
    await expectElementVisible("Rose", "text");
    await swipe("scrollLeaderBoard", "up");
    await expectElementVisible("1512", "text");
  });

  // status user : ACTIVE
  it("LINE 62 - Tasker see and press LEADER-BOARD", async () => {
    await initData("user/updateUser", {
      phone: "0834567891",
      isoCode: "VN",
      dataUpdate: { status: "ACTIVE" },
    });
    await waitForElement("ChooseCountry", 1000, "id");
    await loginWithPhoneAndPassword("0834567891", "123456", "VN");
    await waitForElement("TabAccount", 1000);
    await tapId("TabAccount");
    await expectElementVisible("Hành trình", "text");
    await tapId("btnJourneyAndLeaderBoard");
    await tapId("LEADER_BOARD_SCREEN");
  });

  // status user : UNVERIFIED
  it("LINE 78 - Tasker see and press LEADER-BOARD", async () => {
    await initData("user/updateUser", {
      phone: "0834567891",
      isoCode: "VN",
      dataUpdate: { status: "UNVERIFIED" },
    });
    await waitForElement("ChooseCountry", 1000, "id");
    await loginWithPhoneAndPassword("0834567891", "123456", "VN");
    await waitForElement("TabAccount", 1000);
    await tapId("TabAccount");
    await expectElementVisible("Hành trình", "text");
    await tapId("btnJourneyAndLeaderBoard");
    await tapId("LEADER_BOARD_SCREEN");
    await expectElementVisible("Danh sách đang được cập nhật!", "text");
  });
  // status user : IN_PROBATION
  it("LINE 94 - Tasker see and press LEADER-BOARD", async () => {
    await initData("user/updateUser", {
      phone: "0834567891",
      isoCode: "VN",
      dataUpdate: { status: "IN_PROBATION" },
    });
    await waitForElement("ChooseCountry", 1000, "id");
    await loginWithPhoneAndPassword("0834567891", "123456", "VN");
    await waitForElement("TabAccount", 1000);
    await tapId("TabAccount");
    await expectElementVisible("Hành trình", "text");
    await tapId("btnJourneyAndLeaderBoard");
    await tapId("LEADER_BOARD_SCREEN");
    await expectElementVisible("Danh sách đang được cập nhật!", "text");
  });
  // status user : LOCKED
  it("LINE 110 - Tasker see and press LEADER-BOARD", async () => {
    await initData("user/updateUser", {
      phone: "0834567891",
      isoCode: "VN",
      dataUpdate: { status: "LOCKED" },
    });
    await waitForElement("ChooseCountry", 1000, "id");
    await loginWithPhoneAndPassword("0834567891", "123456", "VN");
    await waitForElement(
      "Tài khoản của bạn bị tạm khoá. Bạn không thể nhận những việc mới. Liên hệ chúng tôi để biết thêm chi tiết.",
      1000,
      "text"
    );
    await waitForElement("TabAccount", 1000);
    await tapId("TabAccount");
    await expectElementVisible("Hành trình", "text");
    await tapId("btnJourneyAndLeaderBoard");
    await tapId("LEADER_BOARD_SCREEN");
    await expectElementVisible("Danh sách đang được cập nhật!", "text");
  });

  // status user : ACTIVE
  it("LINE 132 - Tasker see and press LEADER-BOARD", async () => {
    await initData("user/updateUser", {
      phone: "0834567891",
      isoCode: "VN",
      dataUpdate: { status: "INACTIVE" },
    });
    await waitForElement("ChooseCountry", 1000, "id");
    await loginWithPhoneAndPassword("0834567891", "123456", "VN");
    await expectElementVisible("Tài khoản của bạn chưa được kích hoạt, hãy kích hoạt ngay", "text");
  });
});
