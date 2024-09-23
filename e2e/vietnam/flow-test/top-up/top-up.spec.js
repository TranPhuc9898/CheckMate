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
} = require("../../../step-definitions");
const moment = require("moment");

describe("FILE: vietnam/flow-test/top-up/top-up.spec.js - Tasker log-in and go to finance", () => {
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

  it("LINE 37 - Tasker dont see QR Code", async () => {
    await initData("vn/update/settingSystem", {
      depositIntruction: [
        {
          "city": "Hồ Chí Minh",
          "address": "Ngân hàng Techcombank chi nhánh Thắng Lợi",
          "accountHolder": "CÔNG TY TNHH BTASKEE",
          "accountNumber": "19130355143051",
          "bankName": {
            "vi": "Ngân hàng Techcombank",
            "en": "Techcombank",
            "ko": "Techcombank"
          },
          "bankDepartment": {
            "vi": "Chi nhánh Thắng Lợi",
            "en": "Thắng Lợi Branch",
            "ko": "Thắng Lợi 지점"
          },
          "urlQRCode": ""
        }
      ],
    });
    await device.reloadReactNative();
    await waitForElement("ChooseCountry", 1000, "id")
    await loginWithPhoneAndPassword("0834567891", "123456", "VN");
    await tapId("TabAccount");
    await waitForElement("Finance", 1000, "id");
    await expectElementVisible("Tài chính", "text")
    await tapId("Finance");
    await waitForElement("Topup", 1000, "id");
    await expectElementVisible("Nạp tiền", "text");
    await tapId("Topup");
    await expectElementNotVisible("btnDowQRCode");
  });

  it("LINE 72 - Tasker see and PROCESSING", async () => {
    await initData("vn/update/settingSystem", {
      depositIntruction: [
        {
          "city": "Hồ Chí Minh",
          "address": "Ngân hàng Techcombank chi nhánh Thắng Lợi",
          "accountHolder": "CÔNG TY TNHH BTASKEE",
          "accountNumber": "19130355143051",
          "bankName": {
            "vi": "Ngân hàng Techcombank",
            "en": "Techcombank",
            "ko": "Techcombank"
          },
          "bankDepartment": {
            "vi": "Chi nhánh Thắng Lợi",
            "en": "Thắng Lợi Branch",
            "ko": "Thắng Lợi 지점"
          },
          "urlQRCode": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJdCjz7F3aczgnb23KvX5nHS823hMQ4n1AuA&usqp=CAU"
        }
      ],
    });
    await device.reloadReactNative();
    await waitForElement("ChooseCountry", 1000, "id")
    await loginWithPhoneAndPassword("0834567891", "123456", "VN");
    await tapId("TabAccount");
    await waitForElement("Finance", 1000, "id");
    await expectElementVisible("Tài chính", "text")
    await tapId("Finance");
    await waitForElement("Topup", 1000, "id");
    await expectElementVisible("Nạp tiền", "text");
    await tapId("Topup");
    await tapId("btnDowQRCode");
    await waitForElement("Lưu hình ảnh thành công", 1000, "text");
    await expectElementVisible("Lưu hình ảnh thành công", "text");
    // Ghi chú
    await waitForElement("scrollTopUp", 10000, "id")
    await swipe("scrollTopUp", "up")
    // Ngân hàng
    await waitForElement("Nạp vào số tài khoản", 1000, "text");
    await expectElementVisible("Nạp vào số tài khoản", "text");
    // Số tài khoản
    await expectElementVisible("labelContentTransfer", "id");
    // Chủ tài khoản
    await expectElementVisible("labelInfoAccount", "id");
    await expectElementVisible("labelBankInfo", "id");
    // Số tiền nạp tối thiểu
    await expectElementVisible("labelMinCost", "id");
    // Ghi chú
    await expectElementVisible("labelNote", "id");
    await expectElementVisible("Tài khoản của bạn sẽ được cập nhật trong vòng 24 giờ kể từ lúc chuyển tiền.", "text")

  });
});
