const {
  expectElementVisible,
  initData,
  expectElementNotExist,
  tapText,
  logout, tapId,
  swipe,
  waitForElement,
  loginWithPhoneAndPassword,
  typeToTextField,
} = require("../../../step-definitions");

describe("FILE: delete-account/delete-account.spec.js - Tasker have delete account", () => {
  beforeEach(async () => {
    await initData('/user/createUser', {
      phone: '0834567892',
      isoCode: 'VN',
      resetUser: true,
      taskDone: 100,
      avgRating: 5.0,
    });
    await initData("vn/user/addUserToService", {
      phone: "0834567892",
      type: "INSERT",
      serviceName: "CLEANING",
    });
    await device.launchApp();

    try {
      await logout()
    } catch (error) {
    }
  });
  // Test Case 1: Khi account đang có task thì không xoá được
  it("LINE 35 - Tasker Delete Success", async () => {
    await device.reloadReactNative();
    await loginWithPhoneAndPassword("0834567892", "123456");
    await waitForElement("TabAccount", 1000);
    await tapId("TabAccount");
    await swipe("scrollViewAccount", "up");
    await waitForElement("SettingsDetail", 1000);
    await tapId("SettingsDetail");
    await swipe("ScrollViewSettings", "up");
    await waitForElement("btnDeleteAccount", 1000);
    await tapId("btnDeleteAccount");
    await expectElementVisible("Bạn không muốn là bTasker nữa ư?", "text")
    await swipe("scrollDeleteAccount", "up");
    await expectElementVisible("Tôi đồng ý với điều khoản và xác nhận xoá tài khoản", "text")
    await waitForElement("btnAgree", 1000);
    await tapId("btnAgree");
    await waitForElement("btnDeleteAccount2", 1000);
    await tapId("btnDeleteAccount2");
    await expectElementVisible("Lý do", "text")
    await expectElementVisible("Vui lòng nhập lý do bạn muốn xoá tài khoản.(Vui lòng nhập ít nhất 20 ký tự)", "text")
    await typeToTextField("textInputOtherReason", "bTaske  bTaske bTaske")
    await waitForElement("btnConfirm", 1000);
    await tapId("btnConfirm");
    await tapText("Xác nhận");
    await waitForElement("Tài khoản của bạn đã bị xoá vĩnh viễn trên hệ thống của bTaskee. Chúng tôi rất tiếc vì sự bỏ lỡ của bạn. Mong bạn sẽ quay lại sớm nhất có thể.", 1000, 'text');
    await tapText("Đóng");
  })

  // Test Case 2: Khi user xoá thành công
  it("LINE 64 - Tasker Delete Success", async () => {
    await device.reloadReactNative();
    await loginWithPhoneAndPassword("0834567892", "123456");
    await waitForElement("TabAccount", 1000);
    await tapId("TabAccount");
    await swipe("scrollViewAccount", "up");
    await waitForElement("SettingsDetail", 1000);
    await tapId("SettingsDetail");
    await swipe("ScrollViewSettings", "up");
    await waitForElement("btnDeleteAccount", 1000);
    await tapId("btnDeleteAccount");
    await expectElementVisible("Bạn không muốn là bTasker nữa ư?", "text")
    await swipe("scrollDeleteAccount", "up");
    await expectElementVisible("Tôi đồng ý với điều khoản và xác nhận xoá tài khoản", "text")
    await waitForElement("btnAgree", 1000);
    await tapId("btnAgree");
    await waitForElement("btnDeleteAccount2", 1000);
    await tapId("btnDeleteAccount2");
    await expectElementVisible("Lý do", "text")
    await expectElementVisible("Vui lòng nhập lý do bạn muốn xoá tài khoản.(Vui lòng nhập ít nhất 20 ký tự)", "text")
    await typeToTextField("textInputOtherReason", "bTaske  bTaske bTaske")
    await waitForElement("btnConfirm", 1000);
    await tapId("btnConfirm");
    await tapText("Xác nhận");
    await waitForElement("Tài khoản của bạn đã bị xoá vĩnh viễn trên hệ thống của bTaskee. Chúng tôi rất tiếc vì sự bỏ lỡ của bạn. Mong bạn sẽ quay lại sớm nhất có thể.", 1000, 'text');
    await tapText("Đóng");
    // Log Out
    // Màn hình đăng nhập
    await expectElementVisible("Đăng ký", "text")
    await expectElementVisible("Quên mật khẩu?", "text")
    await loginWithPhoneAndPassword("0834567891", "123456");
  })
});
