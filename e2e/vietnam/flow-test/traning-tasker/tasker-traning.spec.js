/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-11-16 15:47:33
 * @modify date 2022-11-16 15:47:33
 * @desc [Tasker traning input Indo]
 */
/**
 * case 1: Tasker not have training test
 * case 2: Tasker pass training test
 * case 3: Tasker test false training test and lock if false 2turn
 * case 4: Tasker false test and backend open
 */

const {
  tapId,
  expectElementVisible,
  initData,
  waitForElement,
  swipe,
  expectElementNotExist,
  fetchApi,
  tapText,
  expectIdToHaveText,
} = require("../../../step-definitions");

describe("FILE: vietnam/flow-test/accept-task/accept-task-cleaing-indo.spec.js - Tasker accept tassk cleaing indo", () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData("resetData");
    await initData("vn/user/addUserToService", {
      phone: "0834567891",
      type: "INSERT",
      serviceName: "CLEANING",
    });
    await initData("/user/updateUser", {
      phone: "0834567891",
      isoCode: "VN",
      dataUpdate: {
        status: "UNVERIFIED",
      },
    });
    await initData("update-user/unset-fields", {
      phone: "0834567891",
      isoCode: "VN",
      fields: ["checkInput"],
    });
    await initData("vn/training/resetData", {});
    await initData("vn/training/create-training-test", {});
    await device.reloadReactNative();
  });

  afterEach(async () => {
    await initData("/user/updateUser", {
      phone: "0834567891",
      isoCode: "VN",
      dataUpdate: {
        status: "ACTIVE",
      },
    });
  });

  it("LINE 32 - Tasker not have training test", async () => {
    await waitForElement("Chào mừng bạn đến với bTaskee", 500, "text");
  });

  it("LINE 61 - Tasker faild training INPUT 3 time", async () => {
    await swipe("scrollVertical", "up");
    await waitForElement("Bài kiểm tra đầu vào", 500, "text");
    await tapId("btnTestAdmissionTestNow");
    await waitForElement("btnStartTraining", 500);
    await tapId("btnStartTraining");
    await tapId("btnConfirmStartTraining");
    await waitForElement("answer-1-B", 500);
    await tapId("answer-1-A");
    await tapId("answer-2-C");
    await swipe("scrollQuiz", "up");
    await tapId("answer-3-B");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");

    await waitForElement("Rất tiếc", 2000, "text");
    await expectElementVisible("Kết quả: 1/3", "text");
    await expectElementVisible(
      "Bạn chưa vượt qua bài kiểm tra. Bạn còn 2 lần làm lại. Hãy cẩn thận nhé!",
      "text"
    );
    await tapText("Đóng");
    await swipe("scrollQuiz", "down");
    await tapId("answer-1-A");
    await tapId("answer-2-C");
    await swipe("scrollQuiz", "up");
    await tapId("answer-3-B");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");
    await waitForElement("Rất tiếc", 2000, "text");

    await expectElementVisible("Kết quả: 1/3", "text");
    await expectElementVisible(
      "Bạn chưa vượt qua bài kiểm tra. Bạn còn 1 lần làm lại. Hãy cẩn thận nhé!",
      "text"
    );
    await tapText("Đóng");
    await swipe("scrollQuiz", "down");
    await tapId("answer-1-A");
    await tapId("answer-2-C");
    await swipe("scrollQuiz", "up");
    await tapId("answer-3-B");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");
    await waitForElement("Rất tiếc", 2000, "text");
    await expectElementVisible(
      "Bạn đã không vượt qua được bài kiểm tra. Vui lòng liên hệ với tổng đài để biết thêm chi tiết!",
      "text"
    );
    await tapText("Xem kết quả");

    // So sánh kết quả
    await swipe("scrollQuiz", "down");
    // Câu 1 sai
    await expectElementVisible("answer-1-A-failed");
    await expectElementVisible("answer-1-B-success");
    // Câu 2 sai
    await expectElementVisible("answer-2-C-failed");
    await expectElementVisible("answer-2-B-success");
    // Câu 3 đúng
    await swipe("scrollQuiz", "up");
    await expectElementVisible("answer-3-B-correct");
  });

  it("LINE 117 - Tasker pass training INPUT", async () => {
    await swipe("scrollVertical", "up");
    await waitForElement("Bài kiểm tra đầu vào", 500, "text");
    await tapId("btnTestAdmissionTestNow");
    await waitForElement("btnStartTraining", 500);
    await tapId("btnStartTraining");
    await tapId("btnConfirmStartTraining");
    await waitForElement("answer-1-B", 500);
    await tapId("answer-1-A");
    await tapId("answer-2-B");
    await swipe("scrollQuiz", "up");
    await tapId("answer-3-B");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");
    await waitForElement("Thông báo", 2000, "text");
    await expectIdToHaveText(
      "alertContent",
      "Chúc mừng đã hoàn thành bài kiểm tra"
    );
    await tapId("btnCloseAlert");
  });

  it("LINE 129 - Tasker pass training test TRAINING_QUALITY + TRAINING_REGULATIONS(3+4)", async () => {
    const user = await initData("user/get-user", {
      phone: "0834567891",
      isoCode: "VN",
    });
    await initData("user/updateUser", {
      phone: "0834567891",
      isoCode: "VN",
      dataUpdate: { checkInput: "TASKER_BASIC" },
    });
    await initData("vn/training/create-training-history", {
      phone: "0834567891",
      status: "PASS",
      type: "TRAINING_INPUT",
    });
    await initData("vn/training/create-training-history", {
      phone: "0834567891",
      status: "PASS",
      type: "TRAINING_BASIC",
    });
    await fetchApi("v2/backend-user/force-tasker-do-additional-test", {
      taskerId: user._id,
    });
    await device.reloadReactNative();
    await tapId("TabNotification");
    await tapId("TabNotificationSystem");
    await tapId("notification_0");
    await expectElementVisible("btnStartTraining");
    await tapId("btnStartTraining");
    await tapId("btnConfirmStartTraining");
    await waitForElement("answer-1-B", 500);
    await tapId("answer-1-A");
    await tapId("answer-2-B");
    await swipe("scrollQuiz", "up");
    await tapId("answer-3-B");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");
    await tapId("btnStartTraining");
    await tapId("btnConfirmStartTraining");
    await tapId("answer-1-B");
    await tapId("answer-2-B");
    await swipe("scrollQuiz", "up");
    await tapId("answer-3-B");
    await tapId("btnFinishTest");
    await tapId("btnConfirmFinishTest");
    await waitForElement("Thông báo", 2000, "text");
    await expectIdToHaveText(
      "alertContent",
      "Chúc mừng đã hoàn thành bài kiểm tra"
    );
    await tapId("btnCloseAlert");
  });
});
