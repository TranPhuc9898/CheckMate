const {
  tapId,
  scroll,
  swipe,
  initData,
  tapHeaderBack,
  expectElementVisible,
  expectElementNotExist,
  fetchApi,
  loginWithPhoneAndPassword,
} = require("../../../step-definitions");

describe("FILE: vietnam/flow-test/active-account/tasker-complete-procedure-actice-account.spec.js - Tasker complete procedure active account", () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData("id/user/addUserToService", {
      phone: "0834567891",
      type: "INSERT",
      serviceName: "CLEANING",
    });
    await initData("/user/updateUser", {
      phone: "0834567891",
      isoCode: "ID",
      dataUpdate: {
        status: "UNVERIFIED",
      },
    });
    await initData("update-user/unset-fields", {
      phone: "0834567891",
      isoCode: "ID",
      fields: ["checkInput"],
    });
    await initData("id/training/resetData", {});
    await device.reloadReactNative();
    try {
      await loginWithPhoneAndPassword("0834567891", "123456");
    } catch (error) {}
  });

  it("LINE 40 - Tasker register without test", async () => {
    await expectElementNotExist("indicator");
    await expectElementVisible("processingBackground");
    await swipe("scrollVertical", "up");
    await expectElementVisible("stepActiveAccount");
    await expectElementNotExist("stepAdmissionTest");
    await expectElementNotExist("stepTrainingBasic");
    await expectElementVisible("btnUploadProfile");
    await tapId("btnUploadProfile");
    await expectElementVisible("Cập nhật hồ sơ", "text");
  });

  // Sau khi chọn xong dịch vụ, rồi tới update profile tới bước đang xử lý.
  it("LINE 53 - Tasker register without test", async () => {
    // Get user
    const user = await initData("user/get-user", {
      phone: "0834567891",
      isoCode: "ID",
    });
    await expectElementNotExist("indicator");
    await expectElementVisible("processingBackground");
    await swipe("scrollVertical", "up");
    await expectElementVisible("stepActiveAccount");
    await expectElementNotExist("stepAdmissionTest");
    await expectElementNotExist("stepTrainingBasic");
    await expectElementVisible("btnUploadProfile");
    await tapId("btnUploadProfile");
    // View
    await expectElementVisible("Căn cước công dân", "text");
    await expectElementVisible("Giấy xác nhận cư trú", "text");
    await expectElementVisible("Sơ yếu lý lịch", "text");
    await expectElementVisible("Giấy xác nhận hạnh kiểm", "text");
    // View
    await expectElementVisible("cardIdentity");
    await expectElementVisible("cardHouseHold");
    await expectElementVisible("cardCurriculum");
    await expectElementVisible("cardCertificate");
    await expectElementVisible("Cập nhật hồ sơ", "text");
    // Call api update image
    await fetchApi("v3/api-tasker-indo/update-tasker-profile", {
      taskerId: user._id,
      identityCard: [
        "https://toanphambucket.s3.amazonaws.com/mystore%2Fidentityx64351ae5cb10700adcfd4728-iesve",
        "https://toanphambucket.s3.amazonaws.com/mystore%2Fidentityx64351ae5cb10700adcfd4728-njenm",
      ],
      household: [
        "https://toanphambucket.s3.amazonaws.com/mystore%2Fidentityx64351ae5cb10700adcfd4728-guflv",
        "https://toanphambucket.s3.amazonaws.com/mystore%2Fidentityx64351ae5cb10700adcfd4728-hkfg",
      ],
    });
    await device.reloadReactNative();
    await swipe("scrollVertical", "up");
    await expectElementVisible("btnUpdateProfileSuccess");
    await swipe("scrollVertical", "down");
    await expectElementVisible("Đang xử lý", "text");
  });
  // Sau khi chọn xong dịch vụ, update hết profile, status === APPROVED, đặt lịch thành công.
  it("LINE 97 - Tasker register without test", async () => {
    // Get user
    const user = await initData("user/get-user", {
      phone: "0834567891",
      isoCode: "ID",
    });

    await expectElementNotExist("indicator");
    await expectElementVisible("processingBackground");
    await swipe("scrollVertical", "up");
    await expectElementVisible("stepActiveAccount");
    await expectElementNotExist("stepAdmissionTest");
    await expectElementNotExist("stepTrainingBasic");
    await expectElementVisible("btnUploadProfile");
    await tapId("btnUploadProfile");
    // View
    await expectElementVisible("Căn cước công dân", "text");
    await expectElementVisible("Giấy xác nhận cư trú", "text");
    await expectElementVisible("Sơ yếu lý lịch", "text");
    await expectElementVisible("Giấy xác nhận hạnh kiểm", "text");
    // View
    await expectElementVisible("cardIdentity");
    await expectElementVisible("cardHouseHold");
    await expectElementVisible("cardCurriculum");
    await expectElementVisible("cardCertificate");
    await expectElementVisible("Cập nhật hồ sơ", "text");
    // Call api update image
    await fetchApi("v3/api-tasker-indo/update-tasker-profile", {
      taskerId: user._id,
      identityCard: [
        "https://toanphambucket.s3.amazonaws.com/mystore%2Fidentityx64351ae5cb10700adcfd4728-iesve",
        "https://toanphambucket.s3.amazonaws.com/mystore%2Fidentityx64351ae5cb10700adcfd4728-njenm",
      ],
      household: [
        "https://toanphambucket.s3.amazonaws.com/mystore%2Fidentityx64351ae5cb10700adcfd4728-guflv",
        "https://toanphambucket.s3.amazonaws.com/mystore%2Fidentityx64351ae5cb10700adcfd4728-hkfg",
      ],
    });
    await tapHeaderBack();
    await swipe("scrollVertical", "up");
    await expectElementVisible("btnUpdateProfileSuccess");
    await swipe("scrollVertical", "down");
    await expectElementVisible("titleProcessing");
    await expectElementVisible("btnMakeAppointmentDisabled");
    const taskerProfile = await initData("/id/update-image/", {
      taskerId: user._id,
    });

    // Call api update status profile
    await fetchApi("v2/backend-user/update-tasker-profile", {
      taskerProfileId: taskerProfile.taskerProfileId,
      identityCardStatus: "APPROVED",
      householdStatus: "APPROVED",
      isoCode: "ID",
    });
    await device.reloadReactNative();
    // Make appointment
    await expectElementVisible("titleApproved");
    await tapId("btnMakeAppointment");
    await expectElementVisible("titleChooseDateTime");
    await tapId("btnNext");
    await expectElementVisible("titleChooseAddress");
    await tapId("checkbox_0");
    await tapId("btnConfirm");
    await expectElementVisible("titleMakeAppointmentSuccess");
    await expectElementVisible("dateAppointment");
    await expectElementVisible("phoneNumberAppointment");
    await expectElementVisible("addressAppointment");
    await expectElementVisible("btnChat");
    await expectElementVisible("btnCall");
    await expectElementVisible("Chúng mừng", "text");
  });

  // Update Profile nhưng bị 1 status === REJECTED
  it("LINE 171 - Tasker have status === REJECTED", async () => {
    // Get user
    const user = await initData("user/get-user", {
      phone: "0834567891",
      isoCode: "ID",
    });

    await expectElementNotExist("indicator");
    await expectElementVisible("processingBackground");
    await swipe("scrollVertical", "up");
    await expectElementVisible("stepActiveAccount");
    await expectElementNotExist("stepAdmissionTest");
    await expectElementNotExist("stepTrainingBasic");
    await expectElementVisible("btnUploadProfile");
    await tapId("btnUploadProfile");
    // View
    await expectElementVisible("Căn cước công dân", "text");
    await expectElementVisible("Giấy xác nhận cư trú", "text");
    await expectElementVisible("Sơ yếu lý lịch", "text");
    await expectElementVisible("Giấy xác nhận hạnh kiểm", "text");
    // View
    await expectElementVisible("cardIdentity");
    await expectElementVisible("cardHouseHold");
    await expectElementVisible("cardCurriculum");
    await expectElementVisible("cardCertificate");
    await expectElementVisible("Cập nhật hồ sơ", "text");
    // Call api update image
    await fetchApi("v3/api-tasker-indo/update-tasker-profile", {
      taskerId: user._id,
      identityCard: [
        "https://toanphambucket.s3.amazonaws.com/mystore%2Fidentityx64351ae5cb10700adcfd4728-iesve",
        "https://toanphambucket.s3.amazonaws.com/mystore%2Fidentityx64351ae5cb10700adcfd4728-njenm",
      ],
      household: [
        "https://toanphambucket.s3.amazonaws.com/mystore%2Fidentityx64351ae5cb10700adcfd4728-guflv",
        "https://toanphambucket.s3.amazonaws.com/mystore%2Fidentityx64351ae5cb10700adcfd4728-hkfg",
      ],
    });
    await tapHeaderBack();
    await swipe("scrollVertical", "up");
    await expectElementVisible("btnUpdateProfileSuccess");
    await swipe("scrollVertical", "down");
    await expectElementVisible("titleProcessing");
    await expectElementVisible("btnMakeAppointmentDisabled");
    const taskerProfile = await initData("/id/update-image/", {
      taskerId: user._id,
    });

    // Call api update status profile
    await fetchApi("v2/backend-user/update-tasker-profile", {
      taskerProfileId: taskerProfile.taskerProfileId,
      identityCardStatus: "APPROVED",
      householdStatus: "REJECTED",
      isoCode: "ID",
    });
    await device.reloadReactNative();
    // Make appointment
    await expectElementVisible("btnUploadProfile");
    await tapId("btnUploadProfile");
  });
});
