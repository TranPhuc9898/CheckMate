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
  typeToTextField,
  expectElementNotVisible,
} = require("../../../step-definitions");

describe("FILE: flow-test/incentive/bReward-incentive.spec.js - Tasker see reward VN", () => {
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

    await initData("update/tasker-settings", {
      isoCode: "VN",
      dataUpdate: {
        bReward: {
          categories: [
            {
              name: "Entertainment",
              text: {
                vi: "Giải trí",
                en: "Entertainment",
                ko: "오락 및 취미",
                th: "เอ็นเตอร์เทนเมนต์",
              },
              icon: "https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/avatars/kzLBwJZdsJfbyX5Wi",
              status: "INACTIVE",
              weight: 4,
            },
            {
              name: "Services",
              text: {
                vi: "Dịch vụ",
                en: "Services",
                ko: "서비스",
                th: "การบริการ",
              },
              icon: "https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/campaigns/DgaA7aPwcPCrQP2RQ",
              status: "ACTIVE",
              weight: 1,
            },
            {
              name: "Food & Beverage",
              text: {
                vi: "Ẩm thực",
                en: "Food & Beverage",
                ko: "식음료",
                th: "อาหารและเครื่องดื่ม",
              },
              icon: "https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/avatars/q7BAt33dnakPootcZ",
              status: "ACTIVE",
              weight: 2,
            },
            {
              name: "Travel",
              text: {
                vi: "Du lịch",
                en: "Travel",
                ko: "여행",
                th: "การท่องเที่ยว",
              },
              icon: "https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/campaigns/JFgX2oZNrqFiJ5xX7",
              status: "ACTIVE",
              weight: 3,
            },
            {
              name: "Shopping",
              text: {
                vi: "Mua sắm",
                en: "Shopping",
                ko: "쇼핑",
                th: "ช้อปปิ้ง",
              },
              icon: "https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/avatars/qw65B3yXHsyTfZDdk",
              status: "ACTIVE",
              weight: 0,
            },
          ],
        }
      },
    });
    await device.launchApp();
    await device.reloadReactNative();
  });

  it("LINE 50 - Tasker search category and see vouchers", async () => {
    await initData("user/updateUser", {
      phone: "0834567891",
      isoCode: "VN",
      dataUpdate: { point: 50000 },
    });
    await initData("vn/incentive/create-incentive", {
      ClearCollection: true,
      IsShowHomePage: true,
      point: 500,
      note: `- Mã ưu đãi chỉ áp dụng cho công việc Dọn dẹp nhà ca lẻ.\n- Mã khuyến mãi có giá trị sử dụng 01 lần duy nhất\n- Không có giá trị quy đổi thành tiền mặt, không hoàn trả\n- Không áp dụng đồng thời cùng các chương trình ưu đãi khác\n- Mã chỉ có hạn sử dụng 30 ngày kể từ lúc Khách hàng thao tác đổi điểm.`,
      from: "SYSTEM",
      image:
        "https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/bRewards/vietnam/undefined/Cleaning 50K.jpg",
      City: ["Hồ Chí Minh"],
      title: "Giảm 50,000đ khi đặt lịch Dọn dẹp nhà trên ứng dụng bTaskee!",
      content:
        "Giảm 50,000đ khi đặt lịch Dọn dẹp nhà trên ứng dụng bTaskee. Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của bTaskee!",
      type: "EXCLUSIVE_DEAL",
      categoryName: "Food & Beverage",
    });

    await device.reloadReactNative();
    await waitForElement("ChooseCountry", 1000, "id");
    await loginWithPhoneAndPassword("0834567891", "123456", "VN");
    await tapId("TabBenefit");
    await tapText("bReward");
    await waitForElement("btnRewardSearch", 1000, "id");
    // Tìm kiếm ưu đãi
    // await expectElementVisible("btnSearchVouchers","id");
    await tapId("btnRewardSearch");
    await waitForElement("btnSearchVouchers", 1000, "id");
    // See Vouchers
    await typeToTextField("btnSearchVouchers", "bTaskeee");
    await expectElementVisible("Tìm kiếm gần đây", "id");
    await waitForElement("rewardSearch0", 1000, "id");
    await expectElementNotVisible("rewardSearch0", "id");
    await expectElementVisible("bTaskeee", "id");
  });


  // Không thấy mã vouchers
  it("LINE 50 - Tasker search category and see vouchers", async () => {
    await initData("user/updateUser", {
      phone: "0834567891",
      isoCode: "VN",
      dataUpdate: { point: 50000 },
    });
    await initData("vn/incentive/create-incentive", {
      ClearCollection: true,
      IsShowHomePage: true,
      point: 500,
      note: `- Mã ưu đãi chỉ áp dụng cho công việc Dọn dẹp nhà ca lẻ.\n- Mã khuyến mãi có giá trị sử dụng 01 lần duy nhất\n- Không có giá trị quy đổi thành tiền mặt, không hoàn trả\n- Không áp dụng đồng thời cùng các chương trình ưu đãi khác\n- Mã chỉ có hạn sử dụng 30 ngày kể từ lúc Khách hàng thao tác đổi điểm.`,
      from: "SYSTEM",
      image:
        "https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/bRewards/vietnam/undefined/Cleaning 50K.jpg",
      City: ["Hồ Chí Minh"],
      title: "Giảm 50,000đ khi đặt lịch Dọn dẹp nhà trên ứng dụng bTaskee!",
      content:
        "Giảm 50,000đ khi đặt lịch Dọn dẹp nhà trên ứng dụng bTaskee. Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của bTaskee!",
      type: "EXCLUSIVE_DEAL",
      categoryName: "Food & Beverage",
    });
    await device.reloadReactNative();
    await waitForElement("ChooseCountry", 1000, "id");
    await loginWithPhoneAndPassword("0834567891", "123456", "VN");
    await tapId("TabBenefit");
    await tapText("bReward");
    await waitForElement("btnRewardSearch", 1000, "id");
    // Tìm kiếm ưu đãi
    // await expectElementVisible("btnSearchVouchers","id");
    await tapId("btnRewardSearch");
    await waitForElement("btnSearchVouchers", 1000, "id");
    // See Vouchers
    await typeToTextField("btnSearchVouchers", "bTaskeee");
    await expectElementNotVisible("rewardSearch0", "id");
    await expectElementVisible("Tìm kiếm gần đây", "text");
  });
});
