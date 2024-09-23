/**
 * @description Danh sách mã lỗi sau khi gọi API
 */

// ----- ACTIVATION CODE ------
// Quá giới hạn gửi sms
export const MAX_SMS_RESEND_ACTIVATION = "MAX_SMS_RESEND_ACTIVATION";
// User không tồn tại
export const USER_NOT_FOUND = "USER_NOT_FOUND";
// User chưa được kích hoạt
export const ACTIVATION_CODE_INVALID = "ACTIVATION_CODE_INVALID";

// ----- END ACTIVATION CODE -----

// ----- LOGIN -----
// Tài khoản bị khóa
export const USER_LOCKED = "USER_LOCKED";
// Sai mật khẩu
export const INVALID_PASSWORD = "INVALID_PASSWORD";
// User chưa được kích hoạt
export const USER_INACTIVE = "USER_INACTIVE";
// Tài khoản đã đăng ký là Asker
export const USER_TYPE_INCORRECT = "USER_TYPE_INCORRECT";
// Tài khoản không có quyền truy cập có status là UNVERIFIED và IN_PROBATION
export const USER_PERMISSION_DENIED = "USER_PERMISSION_DENIED";
// Lỗi mạng, không có kết nối
export const NETWORK_REQUEST_FAILED = "NETWORK_REQUEST_FAILED";
//----- END LOGIN -----

//----- CANCEL -----
export const CANCEL_LIMITED = "CANCEL_LIMITED";
// ----- END CANCEL -----

// User bị xóa
export const TASKER_NOT_FOUND = "TASKER_NOT_FOUND";
// Không thấy có bài traning input
export const TRAINING_TASKER_NOT_FOUND = "TRAINING_TASKER_NOT_FOUND";
// Quá số lần làm bài traning input
export const MAX_EXECUTE_TRAINING = "MAX_EXECUTE_TRAINING";

// Token expired
export const TOKEN_EXPIRED = "TOKEN_EXPIRED";

// Danh sách mã lỗi sẽ tự động được hiển thị, không có action thêm, chỉ đóng thông báo
const errorList: Array<object> = [
  // Activate code
  {
    code: MAX_SMS_RESEND_ACTIVATION,
    message: "ACCOUNT_ACTIVATION_MESSAGE_MAX_RESEND_REACH",
  },
  {
    code: USER_NOT_FOUND,
    message: "SEND_OTP_MESSAGE_ACCOUNT_NOT_EXIST",
  },
  {
    code: ACTIVATION_CODE_INVALID,
    message: "ACCOUNT_ACTIVATION_ERROR_CODE",
  },
  // End Activate code

  // Login
  {
    code: ACTIVATION_CODE_INVALID,
    message: "ACCOUNT_ACTIVATION_ERROR_CODE",
  },
  {
    code: INVALID_PASSWORD,
    message: "ACCOUNT_ACTIVATION_ERROR_CODE",
  },
  // End Login

  {
    code: NETWORK_REQUEST_FAILED,
    message: "NETWORK_REQUEST_FAILED",
  },
  // Cancel
  {
    code: CANCEL_LIMITED,
    message: "CANCEL_TASK_FAILED_LIMITED",
  },
  // End cancel
];

export default errorList;
