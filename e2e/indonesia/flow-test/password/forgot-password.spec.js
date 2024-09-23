const {
  tapId,
  typeToTextField,
  fillActiveCode,
  expectElementVisible,
  logout,
  waitForElement,
  tapText,
  swipe,
} = require("../../../step-definitions");

describe("FILE: vietnam/flow-test/password/forgot-password.spec.js - Forgot password and take it again", () => {
  beforeEach(async () => {
    await device.launchApp();
    try {
      await logout()
    } catch (error) {
    }
    await device.reloadReactNative();
  });
  // test suggest
   it("LINE 21 - Tasker forgot password", async () => {
    // Nhấn vào trang quên mật khẩu
    await tapId("btnForgotPassword");
    await expectElementVisible("Quên mật khẩu", "text");
    await expectElementVisible(
      "Nhập số điện thoại đã đăng ký để nhận lại mật khẩu của bạn",
      "text"
    );
    await typeToTextField("txtInputPhoneNumber", "0834567891");
    await tapId("btnResendPassword");
    // Vào trang OTP để fill mã kích hoạt
    await fillActiveCode("0834567891", "+62");
    // Vào trang Set Password
    await expectElementVisible("Thiết lập mật khẩu mới", "text");
    await typeToTextField("setPasswordInput", "1234567");
    await waitForElement("Lưu", 1000, "text");
    await tapText("Lưu");
    await waitForElement("TabMyTask", 1000);
    await tapId("TabAccount");
    await expectElementVisible("Thông tin", "text");
    await tapId("btnProfileDetail");
    await swipe("ProfileDetail", "up");
    await tapId("btnChangePassword");
    // Vào màn hình Thay đổi mật khẩu
    await expectElementVisible("Thay đổi mật khẩu", "text");
    await typeToTextField("txtOldPassword", "1234567");
    await typeToTextField("txtNewPassword", "123456");
    await expectElementVisible("Mật khẩu cũ", "text");
    await expectElementVisible("Mật khẩu mới", "text");
    await expectElementVisible("Đồng ý", "text");
    await tapId("btnAcceptChangPassword");
    await expectElementVisible("Đổi mật khẩu thành công", "text");
    await expectElementVisible("btnClose");
    await tapId("btnClose");
  });

  // test false
   it("LINE 56 - Tasker have blanked textinput", async () => {
    await tapId("btnForgotPassword");
    await expectElementVisible("Quên mật khẩu", "text");
    await expectElementVisible(
      "Nhập số điện thoại đã đăng ký để nhận lại mật khẩu của bạn",
      "text"
    );
    await typeToTextField("txtInputPhoneNumber", "");
    // Nếu tasker để khoảng trắng thì nút btnResendPassword không được nhấn
    await expectElementVisible("btnResendPassword");
    await expectElementVisible(
      "Gửi lại mật khẩu",
      "text"
    );

  });

  // test false
   it("LINE 74 - Tasker have wrong numberphone", async () => {
    await tapId("btnForgotPassword");
    await expectElementVisible("Quên mật khẩu", "text");
    await expectElementVisible(
      "Nhập số điện thoại đã đăng ký để nhận lại mật khẩu của bạn",
      "text"
    );
    await typeToTextField("txtInputPhoneNumber", "0834567821");
    // Nếu tasker nhập sai số điện thoại
    await expectElementVisible("btnResendPassword");
    await tapId("btnResendPassword");
    await expectElementVisible(
      "Tài khoản không tồn tại",
      "text"
    );
    await tapText("Đóng");
  });
  // test false : IF tasker nhập sai mã OTP nhìu lần hide resend
   it("LINE 92 - Tasker have wrong numberphone", async () => {
    await tapId("btnForgotPassword");
    await expectElementVisible("Quên mật khẩu", "text");
    await expectElementVisible(
      "Nhập số điện thoại đã đăng ký để nhận lại mật khẩu của bạn",
      "text"
    );
    await typeToTextField("txtInputPhoneNumber", "0834567891");
    await tapId("btnResendPassword");
    await typeToTextField("activationCode", "1234");
    await tapId('btnActivate');
    await expectElementVisible(
      "Mã kích hoạt không đúng. Vui lòng thử lại.",
      "text"
    );
    await tapText("Đóng");
  });
});


