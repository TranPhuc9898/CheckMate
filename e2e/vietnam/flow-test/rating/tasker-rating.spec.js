/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-01-11 17:00:42
 * @modify date 2023-01-11 17:00:42
 * @desc [Tasker accept tassk cleaing]
 * case 1: Tasker rating task bad
 * case 2: Tasker rating task 5
 * case 2: Tasker cancel rating task
 */

const {
  tapId,
  expectElementVisible,
  initData,
  waitForElement,
  swipe,
  tapHeaderBack,
  loginWithPhoneAndPassword,
  typeToTextField,
  expectElementNotExist,
} = require("../../../step-definitions");
const moment = require("moment");

describe("FILE: vietnam/flow-test/rating/tasker-rating.spec.js - Tasker rating asker after done task", () => {
  beforeEach(async () => {
    await device.launchApp();
    await initData('user/createUser', {
      phone: '0834567892',
      isoCode: 'VN',
      resetUser: true,
      company: "0834567891",
    });
    await initData("user/updateUser", { phone: "0834567891", isoCode: "VN", dataUpdate: { taskDone: 30 } })
  });

  it("LINE 44 - Tasker rating task bad", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      acceptedTasker: "0834567891",
      description: "My Task",
      status: "DONE",
      date: moment().subtract(1, "d").hour(14).minute(30).toDate()
    });
    await device.reloadReactNative();

    await waitForElement("titleRating", 1000);
    await expectElementVisible("txtNotRating");
    await tapId("rating1");
    await swipe("scrollRating", "up");
    await tapId("label1");
    await tapId("label2");
    await tapId("label3");
    await typeToTextField("textInputReview", "Test review asker");
    await tapId("btnRating");
    await expectElementNotExist("titleRating");
  });

  it("LINE 57 - Tasker rating task 5", async () => {

    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      acceptedTasker: "0834567891",
      description: "My Task",
      status: "DONE",
      date: moment().subtract(1, "d").hour(14).minute(30).toDate()
    });
    await device.reloadReactNative();

    await waitForElement("titleRating", 1000);
    await expectElementVisible("txtNotRating");
    await tapId("rating5");
    await swipe("scrollRating", "up");
    await tapId("label1");
    await tapId("label2");
    await expectElementNotExist("label4");
    await typeToTextField("textInputReview", "Test review asker");
    await tapId("btnRating");
    await expectElementNotExist("titleRating");
  });

  it("LINE 76 - Tasker cancel rating task", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      acceptedTasker: "0834567891",
      description: "My Task",
      status: "DONE",
      date: moment().subtract(1, "d").hour(14).minute(30).toDate()
    });
    await device.reloadReactNative();

    await waitForElement("titleRating", 1000);
    await expectElementVisible("txtNotRating");
    await tapHeaderBack();
    await device.reloadReactNative();
    await expectElementNotExist("titleRating");
  });

  it("LINE 103 - Company cant rating task of employee", async () => {
    await initData("vn/task/createTask", {
      resetCollection: true,
      serviceName: "CLEANING",
      acceptedTasker: "0834567892",
      description: "My Task",
      status: "DONE",
      date: moment().subtract(1, "d").hour(14).minute(30).toDate(),
      company: "0834567891",
    });
    await device.reloadReactNative();

    await expectElementNotExist("txtNotRating");
  });

});
