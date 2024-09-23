/**
 * @author [QuanNguyen]
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-06-02 17:09:06
 * @modify date 2023-06-02 18:15:05
 * @desc [Tasker see bPoint transaction]
 */

/**
 * case 1: Tasker see received bPoint transaction
 * case 2: Tasker see used bPoint transaction
 * case 3: Tasker have not transaction
 */

const {
  tapId,
  initData,
  expectElementVisible,
  loginWithPhoneAndPassword,
} = require("../../../step-definitions");
const moment = require("moment");

describe("FILE: view-test/bReward/tasker-see-reward.spec.js - Tasker see reward Indo", () => {
  beforeEach(async () => {
    await device.launchApp();
  });

  it("LINE 28 - Tasker see received bPoint transaction", async () => {
    await initData("user/updateUser", {
      phone: "0834567891",
      isoCode: "VN",
      dataUpdate: { point: 500 },
    });
    await initData("pointTransaction/insert", {
      phone: "0834567891",
      arrayLength: 10,
    });
    await device.reloadReactNative();
    try {
      await loginWithPhoneAndPassword("0834567891", "123456");
    } catch (error) {}
    await tapId("TabBenefit");
    await tapId("btnMyPoint");
    await expectElementVisible("btnViewBPointHistory");
    await tapId("btnViewBPointHistory");
    await expectElementVisible("TabReceivedBPoint");
    await expectElementVisible("TabUsedBPoint");
    await expectElementVisible("date_" + moment().format("DD/MM/YYYY"));
    await expectElementVisible("itemTransaction_0");
    await expectElementVisible("itemTransaction_1");
    await expectElementVisible("itemTransaction_2");
    await expectElementVisible("itemTransaction_3");
    await expectElementVisible("itemTransaction_4");
    await expectElementVisible("itemTransaction_5");
    await expectElementVisible("itemTransaction_6");
  });

  it("LINE 55 - Tasker see used bPoint transaction", async () => {
    await initData("user/updateUser", {
      phone: "0834567891",
      isoCode: "VN",
      dataUpdate: { point: 500 },
    });
    await initData("pointTransaction/insert", {
      phone: "0834567891",
      arrayLength: 10,
      type: "C",
    });
    await device.reloadReactNative();
    try {
      await loginWithPhoneAndPassword("0834567891", "123456");
    } catch (error) {}
    await tapId("TabBenefit");
    await tapId("btnMyPoint");
    await expectElementVisible("btnViewBPointHistory");
    await tapId("btnViewBPointHistory");
    await expectElementVisible("TabReceivedBPoint");
    await expectElementVisible("TabUsedBPoint");
    await tapId("TabUsedBPoint");
    await expectElementVisible("date_" + moment().format("DD/MM/YYYY"));
    await expectElementVisible("itemTransaction_0");
    await expectElementVisible("itemTransaction_1");
    await expectElementVisible("itemTransaction_2");
    await expectElementVisible("itemTransaction_3");
    await expectElementVisible("itemTransaction_4");
    await expectElementVisible("itemTransaction_5");
    await expectElementVisible("itemTransaction_6");
  });

  it("LINE 84 - Tasker have not transaction", async () => {
    await initData("user/updateUser", {
      phone: "0834567891",
      isoCode: "VN",
      dataUpdate: { point: 500 },
    });
    await initData("pointTransaction/insert", {
      phone: "0834567891",
    });
    await device.reloadReactNative();
    try {
      await loginWithPhoneAndPassword("0834567891", "123456");
    } catch (error) {}
    await tapId("TabBenefit");
    await tapId("btnMyPoint");
    await expectElementVisible("btnViewBPointHistory");
    await tapId("btnViewBPointHistory");
    await expectElementVisible("TabReceivedBPoint");
    await expectElementVisible("txtEmptyTransaction");
    await expectElementVisible("TabUsedBPoint");
    await tapId("TabUsedBPoint");
    await expectElementVisible("txtEmptyTransaction");
  });
});
