const {
  expectElementVisible,
  initData,
  expectElementNotExist,
  tapText,
  expectIdToHaveText,
  waitForElement,
} = require("../../../step-definitions");

describe("FILE: check-version/check-version.spec.js - Tasker have old version, which mean the need to update", () => {
  beforeEach(async () => {
    await device.launchApp();
  });

  afterEach(async () => {
    await initData('th/update/settingSystem', {
      versionApp: {
        "ios": {
          "version": "0.0.1",
        },
        "android": {
          "version": "0.0.1",
        }
      }
    });
  })


  // Test Case 1
  it("LINE 15 - App Tasker old 0.9.0 dont show anything", async () => {
    await initData('th/update/settingSystem', {
      versionApp: {
        "ios": {
          "version": "0.9.0",
          "link": "https://itunes.apple.com/us/app/btaskee-partner/id1201094811?mt=8",
          "description": "Vui lòng cập nhật phiên bản mới nhất.",
          "isShow": true,
        },
        "android": {
          "version": "0.9.0",
          "link": "https://play.google.com/store/apps/details?id=com.btaskee.partner",
          "description": "Vui lòng cập nhật phiên bản mới nhất.",
          "isShow": true,
        }
      }
    });

    await device.reloadReactNative();
    await expectElementNotExist("Thông báo", "text");
    await expectElementNotExist(
      "Có phiên bản mới. Vui lòng cập nhập để trải nghiệm những tính năng mới nhất.",
      "text"
    );
    await expectElementNotExist(
      "Đang cập nhập hệ thống. Vui lòng quay lại sau.",
      "text"
    );
    await expectElementNotExist("Cập nhập ngay", "text");
  });
  // Test Case 2: version 2.0.0, isForce = false -> hiện alert có phiên bản mới
  it("LINE 23 - version 2.0.0, isForce = false -> hiện alert có phiên bản mới", async () => {
    await initData('th/update/settingSystem', {
      versionApp: {
        "ios": {
          "version": "2.2.0",
          "link": "https://itunes.apple.com/us/app/btaskee-partner/id1201094811?mt=8",
          "description": "Vui lòng cập nhật phiên bản mới nhất.",
          "isShow": true,
        },
        "android": {
          "version": "2.2.0",
          "link": "https://play.google.com/store/apps/details?id=com.btaskee.partner",
          "description": "Vui lòng cập nhật phiên bản mới nhất.",
          "isShow": true,
        }
      }
    });
    await device.reloadReactNative();
    await expectElementVisible("Thông báo", "text");
    // await expectElementVisible(
    //   "Có phiên bản mới. Vui lòng cập nhập để trải nghiệm những tính năng mới nhất.",
    //   "text"
    // );
    await expectElementVisible("Cập nhập ngay", "text");
    await expectElementVisible("Đóng", "text");
    await tapText("Đóng");
  });
  // Test Case 3: version 1.9.0, isForce = true -> hiện trang bắt buộc phải tải app
  it("LINE 37 - Tasker have old version need to update now", async () => {
    await initData('th/update/settingSystem', {
      versionApp: {
        "ios": {
          "version": "1.9.0",
          "link": "https://itunes.apple.com/us/app/btaskee-partner/id1201094811?mt=8",
          "description": "Vui lòng cập nhật phiên bản mới nhất.",
          "isShow": true,
        },
        "android": {
          "version": "1.9.0",
          "link": "https://play.google.com/store/apps/details?id=com.btaskee.partner",
          "description": "Vui lòng cập nhật phiên bản mới nhất.",
          "isShow": true,
        }
      }
    });
    await device.reloadReactNative();
    // await expectElementVisible("textNewversionText");
    await expectElementVisible("Cập nhập ngay", "text");
    await tapText("Đóng");
  });

  //Test Case 4: isAllSystem = true, version 0.9.0 -> Hiện trang hệ thống đang bảo trì
  it("LINE 100 - version 0.9.0 show maintain screen ", async () => {
    await initData('th/update/settingSystem', {
      versionApp: {
        "ios": {
          "version": "0.9.0",
          "link": "https://itunes.apple.com/us/app/btaskee-partner/id1201094811?mt=8",
          "description": "Vui lòng cập nhật phiên bản mới nhất.",
        },
        "android": {
          "version": "0.9.0",
          "link": "https://play.google.com/store/apps/details?id=com.btaskee.partner",
          "description": "Vui lòng cập nhật phiên bản mới nhất.",
        }
      },
      maintain: {
        "isAllSystem": true,
      }
    });
    await device.reloadReactNative();
    await expectElementVisible("textMaintain");
    await expectElementNotExist("Thông Báo", "text");
  });

  //Test Case 5: isAllSystem = true, version 2.1.0, isForce = false -> Hiện trang hệ thống đang bảo trì
  it("LINE 59 - isMaintain = true isForce = false version 2.0.0 show maintain screen ", async () => {
    await initData('th/update/settingSystem', {
      versionApp: {
        "ios": {
          "version": "2.1.0",
          "link": "https://itunes.apple.com/us/app/btaskee-partner/id1201094811?mt=8",
          "description": "Vui lòng cập nhật phiên bản mới nhất.",
        },
        "android": {
          "version": "2.1.0",
          "link": "https://play.google.com/store/apps/details?id=com.btaskee.partner",
          "description": "Vui lòng cập nhật phiên bản mới nhất.",
        }
      },
      maintain: {
        "isAllSystem": true,
      }
    });
    await device.reloadReactNative();
    await waitForElement("textMaintain", 1000);
    await expectElementVisible("textMaintain");
    await expectIdToHaveText('textMaintain', 'Đang cập nhập hệ thống. Vui lòng quay lại sau.');
    await expectElementNotExist("Thông Báo", "text");
  });

  //Test Case 5: isAllSystem = true, version 2.1.0, isForce = true -> Hiện trang hệ thống đang bảo trì
  it("LINE 148 - isMaintain = true isForce = true version 2.0.0 show maintain screen ", async () => {
    await initData('th/update/settingSystem', {
      versionApp: {
        "ios": {
          "version": "2.1.0",
          "link": "https://itunes.apple.com/us/app/btaskee-partner/id1201094811?mt=8",
          "description": "Vui lòng cập nhật phiên bản mới nhất.",
          "isForce": true,
        },
        "android": {
          "version": "2.1.0",
          "link": "https://play.google.com/store/apps/details?id=com.btaskee.partner",
          "description": "Vui lòng cập nhật phiên bản mới nhất.",
          "isForce": true,
        }
      },
      maintain: {
        "isAllSystem": true,
      }
    });
    await device.reloadReactNative();
    await waitForElement("textMaintain", 1000);
    await expectElementVisible("textMaintain");
    await expectIdToHaveText('textMaintain', 'Đang cập nhập hệ thống. Vui lòng quay lại sau.');
    await expectElementNotExist("Thông Báo", "text");
  });

  //Test Case 6: isMaintain = false, version 2.0.0, isForce = true -> hiện trang bắt buộc phải tải app. Do ưu tiên tải bản mới
  it("LINE 59 - isAllSystem = false isForce = true version 2.0.0 show newVersion screen ", async () => {
    await initData('th/update/settingSystem', {
      versionApp: {
        "ios": {
          "version": "2.1.0",
          "link": "https://itunes.apple.com/us/app/btaskee-partner/id1201094811?mt=8",
          "description": "Vui lòng cập nhật phiên bản mới nhất.",
          "isForce": true,
        },
        "android": {
          "version": "2.1.0",
          "link": "https://play.google.com/store/apps/details?id=com.btaskee.partner",
          "description": "Vui lòng cập nhật phiên bản mới nhất.",
          "isForce": true,
        }
      },
      maintain: {
        "isAllSystem": false,
      }
    });
    await device.reloadReactNative();
    await waitForElement("Cập nhập ngay", 1000, 'text');
    await expectElementVisible("Cập nhập ngay", "text");
    await expectElementNotExist("Đóng", "text");
    await initData('th/update/settingSystem', {
      versionApp: {
        "ios": {
          "version": "0.9.0",
          "link": "https://itunes.apple.com/us/app/btaskee-partner/id1201094811?mt=8",
          "description": "Vui lòng cập nhật phiên bản mới nhất.",
          "isAllSystem": true,
          "isForce": true,
        },
        "android": {
          "version": "0.9.0",
          "link": "https://play.google.com/store/apps/details?id=com.btaskee.partner",
          "description": "Vui lòng cập nhật phiên bản mới nhất.",
          "isAllSystem": true,
          "isForce": true,
        }
      },
      maintain: {
        "isAllSystem": false,
      }
    });
  });
});
