const {
  tapId,
  expectElementVisible,
  initData,
  tapText,
  waitForElement,
  swipe,
  tapHeaderBack,
  typeToTextField,
} = require("../../../step-definitions");
const expect = require("chai").expect;
const moment = require("moment");

describe("FILE: indonesia/flow-test/kits-and-chemicals/kits-and-chemicals-indo.spec.js - Tasker press Notification", () => {
  beforeEach(async () => {
    await device.launchApp();
  });
  it("LINE 18 - Tasker Press Kits And Chemicals", async () => {
    await device.reloadReactNative();
    await tapId("TabAccount");
    await swipe("scrollViewAccount", "up");
    await tapId("btnKitsAndChemicals");
    await expectElementVisible("Khăn đa năng", "text");
    await tapId("getKitAndChemicals");
    await expectElementVisible("Khăn đa năng", "text");
    await expectElementVisible("Xem nơi bán", "text");
    await tapId("btnBuyKitChemicals");
  });

  it("LINE 30 - Tasker Press Kits And Chemicals", async () => {
    await device.reloadReactNative();
    await tapId("TabAccount");
    await swipe("scrollViewAccount", "up");
    await tapId("btnKitsAndChemicals");
    await tapId("TAB_CHEMICALS");
    await expectElementVisible("Xịt lau kính", "text");
    await tapId("getKitAndChemicals");
    await expectElementVisible("Xịt lau kính", "text");
    await expectElementVisible("Xem nơi bán", "text");
    await tapId("btnBuyKitChemicals");
  });
});
