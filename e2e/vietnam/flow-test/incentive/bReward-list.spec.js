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
  } = require('../../../step-definitions');
  
  describe('FILE: flow-test/incentive/bReward-incentive.spec.js - Tasker see reward VN', () => {
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

    // Đủ điểm để đổi quà và thấy gift mới
    it('LINE 51 - Tasker see gift used', async () => {
      await initData("user/updateUser", { phone: "0834567891", isoCode: "VN", dataUpdate: { point: 10000 } });
      await initData('vn/incentive/create-incentive', {
        ClearCollection: true,
        IsShowHomePage: true,
        point: 50,
        note: `- Mã khuyến mại có giá trị sử dụng 01 lần duy nhất.\n- Không có giá trị quy đổi thành tiền mặt, không hoàn trả.\n- Áp dụng khi đăng kí trực tiếp tại Thiên Yoga (28 Trần Bình Trọng, Quận Hải Châu, TP Đà Nẵng).*`,
        from: 'SYSTEM',
        image: 'https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/bRewards/vietnam/undefined/Cleaning 50K.jpg',
        City: ['Hồ Chí Minh'],
        title: 'bTaskee Incentive',
        content: 'Các bài tập Yoga sẽ giúp bạn sở hữu một cơ thể khỏe mạnh, một vóc dáng dẻo dai và một tinh thần thoải mái, tràn đầy năng lượng.\nNgoài ra, bộ môn Yoga còn giúp cơ thể loại bỏ các độc tố, thúc đẩy tuần hoàn máu giúp cơ thể trẻ trung hơn.',
      });
      await initData('/vn/gift/create-taskerGift', {
        ClearCollection: true,
        promotionCode:"BTASKEE&BTASKEE",
        type:"EXCLUSIVE_DEAL",
        phone:"0834567891",
        isoCode:"VN"
      });
      await device.reloadReactNative();
      await waitForElement("ChooseCountry",1000,"id")
      await loginWithPhoneAndPassword("0834567891", "123456", "VN");
      await tapId("TabBenefit");
      await tapText("bReward");
      await tapId("txtReward0");
      await swipe('scrollReward', 'up');
      await tapId("btnRedeem");
      await expectElementVisible("Xác nhận đổi điểm","text");
      await expectElementVisible("Bạn chắc chắn muốn đổi khuyến mãi này?","text");
      await tapText("Đồng ý");
      await expectElementVisible("Đổi quà thành công","text");
      await tapText("Đóng");
      await tapId("itemNewGift0","id");
      await expectElementVisible("txtBarCode","id");
      await expectElementVisible("txtPromotionCode","id");
    });
    // Không đủ điểm để và khôgn thấy được mã QR
    it('LINE 89 - Tasker see gift used', async () => {
        await initData("user/updateUser", { phone: "0834567891", isoCode: "VN", dataUpdate: { point: 1 } });
        await initData('vn/incentive/create-incentive', {
          ClearCollection: true,
          IsShowHomePage: true,
          point: 50,
          note: `- Mã khuyến mại có giá trị sử dụng 01 lần duy nhất.\n- Không có giá trị quy đổi thành tiền mặt, không hoàn trả.\n- Áp dụng khi đăng kí trực tiếp tại Thiên Yoga (28 Trần Bình Trọng, Quận Hải Châu, TP Đà Nẵng).*`,
          from: 'SYSTEM',
          image: 'https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/bRewards/vietnam/undefined/Cleaning 50K.jpg',
          City: ['Hồ Chí Minh'],
          title: 'bTaskee Incentive',
          content: 'Các bài tập Yoga sẽ giúp bạn sở hữu một cơ thể khỏe mạnh, một vóc dáng dẻo dai và một tinh thần thoải mái, tràn đầy năng lượng.\nNgoài ra, bộ môn Yoga còn giúp cơ thể loại bỏ các độc tố, thúc đẩy tuần hoàn máu giúp cơ thể trẻ trung hơn.',
        });
        await initData('/vn/gift/create-taskerGift', {
          ClearCollection: true,
          promotionCode:"BTASKEE&BTASKEE",
          type:"EXCLUSIVE_DEAL",
          phone:"0834567891",
          isoCode:"VN"
        });
        await device.reloadReactNative();
        await waitForElement("ChooseCountry",1000,"id")
        await loginWithPhoneAndPassword("0834567891", "123456", "VN");
        await tapId("TabBenefit");
        await tapText("bReward");
        await tapId("txtReward0");
        await swipe('scrollReward', 'up');
        await tapId("btnRedeem");
        await expectElementVisible("Xác nhận đổi điểm","text");
        await expectElementVisible("Bạn chắc chắn muốn đổi khuyến mãi này?","text");
        await tapText("Đồng ý");
        await expectElementVisible("Bạn không đủ điểm để đổi quà.","text");
        await tapText("Đóng");
      });
  })
  