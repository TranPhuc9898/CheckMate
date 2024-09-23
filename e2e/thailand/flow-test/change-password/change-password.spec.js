const {
  tapId,
  typeToTextField,
  expectElementVisible,
  tapText,
  waitForElement,
  swipe,
} = require("../../../step-definitions");

describe("FILE: flow-test/password/change-password.spec.js - Change Password", () => {
  beforeEach(async () => {
    await device.launchApp();
    await device.reloadReactNative();
  });
  // Test Success
  it("LINE 15 - Tasker change password", async () => {
    // Vào màn hình home
    await tapId("TabAccount");
    await expectElementVisible("Thông tin", "text");
    await tapId("btnProfileDetail");
    await swipe("ProfileDetail", "up");
    await tapId("btnChangePassword");
    // Vào màn hình Thay đổi mật khẩu
    await expectElementVisible("Thay đổi mật khẩu", "text");
    await typeToTextField("txtOldPassword", "123456");
    await typeToTextField("txtNewPassword", "1234567");
    await expectElementVisible("Mật khẩu cũ", "text");
    await expectElementVisible("Mật khẩu mới", "text");
    await expectElementVisible("Đồng ý", "text");
    await tapId("btnAcceptChangPassword");
    await expectElementVisible("Đổi mật khẩu thành công", "text");
    await expectElementVisible("btnClose");
    await tapId("btnClose");
    await tapId("btnChangePassword");
    // Vào màn hình Thay đổi mật khẩu
    await expectElementVisible("Thay đổi mật khẩu", "text");
    await typeToTextField("txtOldPassword", "1234567");
    await typeToTextField("txtNewPassword", "123456");
    await expectElementVisible("Mật khẩu cũ", "text");
    await expectElementVisible("Mật khẩu mới", "text");
    await expectElementVisible("Đồng ý", "text");
    await tapId("btnAcceptChangPassword");
    await tapId("btnClose");
  });

  // Test fail Wrong Input
  it("LINE 45 - Tasker have wrong input", async () => {
    // Vào màn hình home
    await tapId("TabAccount");
    await expectElementVisible("Thông tin", "text");
    await tapId("btnProfileDetail");
    await swipe("ProfileDetail", "up");
    await tapId("btnChangePassword");
    // Vào màn hình Thay đổi mật khẩu
    await expectElementVisible("Thay đổi mật khẩu", "text");
    // Nếu không đủ ký tự hoặc có khoảng trắng
    await typeToTextField("txtOldPassword", "");
    await typeToTextField("txtNewPassword", "");
    await expectElementVisible("Thông tin bắt buộc", "text");
    await expectElementVisible("Thông tin bắt buộc", "text");
    await typeToTextField("txtOldPassword", "123");
    await typeToTextField("txtNewPassword", "1234567");
    await expectElementVisible("Mật khẩu 6 - 12 ký tự, không khoảng trắng.", "text");
    await expectElementVisible("Mật khẩu mới", "text");
    // Nếu không nhập bất kỳ cái gì  ||  nếu nhập sai input thì nút đồng ý không thể ẩn được
    await expectElementVisible("btnAcceptChangPassword");
  });

  // Test fail: Wrong Password
  it("LINE 67 - Tasker have wrong Password", async () => {
    // Vào màn hình home
    await tapId("TabAccount");
    await expectElementVisible("Thông tin", "text");
    await tapId("btnProfileDetail");
    await swipe("ProfileDetail", "up");
    await tapId("btnChangePassword");
    // Vào màn hình Thay đổi mật khẩu
    await expectElementVisible("Thay đổi mật khẩu", "text");
    await typeToTextField("txtOldPassword", "1234567");
    await typeToTextField("txtNewPassword", "12345678");
    await tapId("btnAcceptChangPassword");
    // Nếu tasker nhập sai mật khẩu
    await expectElementVisible("Rất tiếc", "text");
    await expectElementVisible("Mật khẩu không đúng. Vui lòng nhập lại.", "text");
    await waitForElement('Đóng', 1000, "text");
    await tapText("Đóng");
    // Tasker sẽ nhấn lại mật khẩu.
  });
});
