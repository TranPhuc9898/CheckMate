/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-12-02 15:47:33
 * @modify date 2022-12-02 15:47:33
 * @desc [Tasker see reward Indo]
 */
/**
 * case 1: Tasker see reward and redeem success
 * case 2: Tasker see reward and redeem false
 * case 3: Tasker see my gift
 * case 4: Tasker see gift used
 * case 5: Tasker see gift expired
 */

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
  
    it('LINE 50 - Tasker see reward and redeem success', async () => {
      await initData("user/updateUser", { phone: "0834567891", isoCode: "VN", dataUpdate: { point: 50000 } });
      await initData('vn/incentive/create-incentive', {
        ClearCollection: true,
        IsShowHomePage: true,
        point: 500,
        note: `- Mã ưu đãi chỉ áp dụng cho công việc Dọn dẹp nhà ca lẻ.\n- Mã khuyến mãi có giá trị sử dụng 01 lần duy nhất\n- Không có giá trị quy đổi thành tiền mặt, không hoàn trả\n- Không áp dụng đồng thời cùng các chương trình ưu đãi khác\n- Mã chỉ có hạn sử dụng 30 ngày kể từ lúc Khách hàng thao tác đổi điểm.`,
        from: 'SYSTEM',
        image: 'https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/bRewards/vietnam/undefined/Cleaning 50K.jpg',
        City: ['Hồ Chí Minh'],
        title: 'Giảm 50,000đ khi đặt lịch Dọn dẹp nhà trên ứng dụng bTaskee!',
        content: 'Giảm 50,000đ khi đặt lịch Dọn dẹp nhà trên ứng dụng bTaskee. Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của bTaskee!',
        type:"RECOMMEND_FOR_YOU"
      });
      await device.reloadReactNative();
      await waitForElement("ChooseCountry",1000,"id")
      await loginWithPhoneAndPassword("0834567891", "123456", "VN");
      await tapId("TabBenefit");
      await tapText("bReward")
      await expectElementVisible("txtReward0");
      await tapId("txtReward0");
  
      await expectElementVisible("Giảm 50,000đ khi đặt lịch Dọn dẹp nhà trên ứng dụng bTaskee!","text");
      await expectElementVisible("500","text");
      await expectElementVisible("bPoint","text");
  
      await swipe("scrollReward","up");
      await expectElementVisible("Thông tin ưu đãi","text");
      await expectElementVisible("Điều khoản sử dụng","text");
  
      await tapId("btnRedeem");
      await expectElementVisible("Xác nhận đổi điểm","text");
      await expectElementVisible("Bạn chắc chắn muốn đổi khuyến mãi này?","text");
      await tapText("Xác nhận");
      await expectElementVisible("Đổi quà thành công","text");
      await tapText("Đóng");
      //
       await expectElementVisible("TabBReward","id");
       // text : Giảm 50,000 khi đặt lịch Dọn dẹp nhà ...
       await expectElementVisible("txtNewGift","id");
       await tapId("itemNewGift0");
       await expectElementVisible("Giảm 50,000đ khi đặt lịch Dọn dẹp nhà trên ứng dụng bTaskee!","text");
       await expectElementVisible("Ngày hết hạn","text");
       await expectElementVisible("Thông tin ưu đãi","text");
       await swipe("scrollGiftDetail","up");
    });
  
    it('LINE 97 - Tasker see reward and redeem false', async () => {
      await initData("user/updateUser", { phone: "0834567891", isoCode: "VN", dataUpdate: { point: 0 } });
      await initData('vn/incentive/create-incentive', {
        ClearCollection: true,
        IsShowHomePage: true,
        point: 500,
        note: `- Mã ưu đãi chỉ áp dụng cho công việc Dọn dẹp nhà ca lẻ.\n- Mã khuyến mãi có giá trị sử dụng 01 lần duy nhất\n- Không có giá trị quy đổi thành tiền mặt, không hoàn trả\n- Không áp dụng đồng thời cùng các chương trình ưu đãi khác\n- Mã chỉ có hạn sử dụng 30 ngày kể từ lúc Khách hàng thao tác đổi điểm.`,
        from: 'SYSTEM',
        image: 'https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/bRewards/vietnam/undefined/Cleaning 50K.jpg',
        City: ['Hồ Chí Minh'],
        title: 'Giảm 50,000đ khi đặt lịch Dọn dẹp nhà trên ứng dụng bTaskee!',
        content: 'Giảm 50,000đ khi đặt lịch Dọn dẹp nhà trên ứng dụng bTaskee. Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của bTaskee!',
        type:"RECOMMEND_FOR_YOU"
      });
      await device.reloadReactNative();
      await waitForElement("ChooseCountry",1000,"id")
      await loginWithPhoneAndPassword("0834567891", "123456", "VN");
      await tapId("TabBenefit");
      await tapText("bReward")
      await expectElementVisible("txtReward0");
      await tapId("txtReward0");
  
      await expectElementVisible("Giảm 50,000đ khi đặt lịch Dọn dẹp nhà trên ứng dụng bTaskee!","text");
      await expectElementVisible("500","text");
      await expectElementVisible("bPoint","text");
  
      await swipe("scrollReward","up");
      await expectElementVisible("Thông tin ưu đãi","text");
      await expectElementVisible("Điều khoản sử dụng","text");
  
      await tapId("btnRedeem");
      await expectElementVisible("Xác nhận đổi điểm","text");
      await expectElementVisible("Bạn chắc chắn muốn đổi khuyến mãi này?","text");
      await tapText("Xác nhận");
      await expectElementVisible("Bạn không đủ điểm để đổi quà.","text");
      await tapText("Đóng");
    });

    it('LINE 134 - Tasker see gift used', async () => {
      await initData("user/updateUser", { phone: "0834567891", isoCode: "VN", dataUpdate: { point: 0 } });
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
      await initData('vn/gift/create-gift', {
        ClearCollection: true,
        note: `- Mã khuyến mại có giá trị sử dụng 01 lần duy nhất.\n- Không có giá trị quy đổi thành tiền mặt, không hoàn trả.\n- Áp dụng khi đăng kí trực tiếp tại Thiên Yoga (28 Trần Bình Trọng, Quận Hải Châu, TP Đà Nẵng).*`,
        from: 'SYSTEM',
        image: 'https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/bRewards/vietnam/undefined/Cleaning 50K.jpg',
        City: ['Hồ Chí Minh'],
        title: 'bTaskee Incentive',
        content: 'Các bài tập Yoga sẽ giúp bạn sở hữu một cơ thể khỏe mạnh, một vóc dáng dẻo dai và một tinh thần thoải mái, tràn đầy năng lượng.\nNgoài ra, bộ môn Yoga còn giúp cơ thể loại bỏ các độc tố, thúc đẩy tuần hoàn máu giúp cơ thể trẻ trung hơn.',
        phone: "0834567891",
        isUsed: true,
        isoCode:"VN"
      });
      await device.reloadReactNative();
      await waitForElement("ChooseCountry",1000,"id")
      await loginWithPhoneAndPassword("0834567891", "123456", "VN");
      await tapId("TabBenefit");
      await tapText("bReward");
      await tapId("btnMyGift");
      await expectElementNotExist("itemNewGift0");
      await tapId("TabMyReward");
      await expectElementVisible("itemUsedGift0");
      await expectElementVisible("Đã dùng", "text");
    });

    it('LINE 176 - Tasker see gift expired', async () => {
      await initData("user/updateUser", { phone: "0834567891", isoCode: "VN", dataUpdate: { point: 0 } });
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
      await initData('vn/gift/create-gift', {
        ClearCollection: true,
        note: `- Mã khuyến mại có giá trị sử dụng 01 lần duy nhất.\n- Không có giá trị quy đổi thành tiền mặt, không hoàn trả.\n- Áp dụng khi đăng kí trực tiếp tại Thiên Yoga (28 Trần Bình Trọng, Quận Hải Châu, TP Đà Nẵng).*`,
        from: 'SYSTEM',
        image: 'https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/bRewards/vietnam/undefined/Cleaning 50K.jpg',
        City: ['Hồ Chí Minh'],
        title: 'bTaskee Incentive',
        content: 'Các bài tập Yoga sẽ giúp bạn sở hữu một cơ thể khỏe mạnh, một vóc dáng dẻo dai và một tinh thần thoải mái, tràn đầy năng lượng.\nNgoài ra, bộ môn Yoga còn giúp cơ thể loại bỏ các độc tố, thúc đẩy tuần hoàn máu giúp cơ thể trẻ trung hơn.',
        phone: "0834567891",
        expired: true
      });
      await device.reloadReactNative();
      await waitForElement("ChooseCountry",1000,"id")
      await loginWithPhoneAndPassword("0834567891", "123456", "VN");
      await tapId("TabBenefit");
      await tapText("bReward");
      await tapId("btnMyGift");
      await expectElementNotExist("itemNewGift0");
      await tapId("TabMyReward");
      await expectElementVisible("itemUsedGift0");
      await expectElementVisible("Hết hạn", "text");
    });

    it('LINE 208 - Tasker see and change redeem', async () => {
      await initData("user/updateUser", { phone: "0834567891", isoCode: "VN", dataUpdate: { point: 100000 } });
      await initData('vn/incentive/create-incentive', {
        ClearCollection: true,
        IsShowHomePage: true,
        point: 100,
        originalPoint:200,
        from: 'SYSTEM',
      });
      await device.reloadReactNative();
      await waitForElement("ChooseCountry",1000,"id")
      await loginWithPhoneAndPassword("0834567891", "123456", "VN");
      await tapId("TabBenefit");
      await tapText("bReward");
      await tapId('txtReward0')
      await scroll('scrollReward', 300, 'down', 0.5, 0.5,0.5);
      
      await expectElementVisible("Liên hệ","text")
      await expectElementVisible("0834567891","text")
      await swipe('scrollReward', 'up');
      await expectElementVisible("btaskee@gmail.com","text")
      await expectElementVisible("Danh sách cửa hàng","text")
      await expectElementVisible("Chi nhánh Hồ Chí Minh","text")
      await expectElementVisible("168 Nguyễn Gia Trí, P. 25, Q. Bình Thạnh, HCM","text")
      await expectElementVisible("Hiện tại có 3 chi nhánh hoạt động","text");
      await tapId("btnDataStore");
      await expectElementVisible("Danh sách cửa hàng","text")
      await expectElementVisible("btnStoreItem0","id")
      await tapHeaderBack();
      await expectElementVisible("IOS","text")
    });

    it('LINE 240 - Tasker not see branch store', async () => {
      await initData("user/updateUser", { phone: "0834567891", isoCode: "VN", dataUpdate: { point: 100000 } });
      await initData('vn/incentive/create-incentive', {
        ClearCollection: true,
        IsShowHomePage: true,
        point: 100,
        originalPoint:200,
        office:[""],
        from: 'SYSTEM',

      });
      await device.reloadReactNative();
      await waitForElement("ChooseCountry",1000,"id")
      await loginWithPhoneAndPassword("0834567891", "123456", "VN");
      await tapId("TabBenefit");
      await tapText("bReward");
      await tapId('txtReward0')
      await scroll('scrollReward', 300, 'down', 0.5, 0.5,0.5);
      
      await expectElementVisible("Liên hệ","text")
      await expectElementVisible("0834567891","text")
      await swipe('scrollReward', 'up');
      await expectElementVisible("btaskee@gmail.com","text")
      await expectElementVisible("Danh sách cửa hàng","text")
      await expectElementVisible("Chi nhánh Hồ Chí Minh","text")
      await expectElementVisible("168 Nguyễn Gia Trí, P. 25, Q. Bình Thạnh, HCM","text")
      await expectElementNotExist("btnDataStore",'id');
    });

    it('LINE 269 - Tasker not see social', async () => {
      await initData("user/updateUser", { phone: "0834567891", isoCode: "VN", dataUpdate: { point: 100000 } });
      await initData('vn/incentive/create-incentive', {
        ClearCollection: true,
        IsShowHomePage: true,
        point: 100,
        originalPoint:200,
        social:{},
        from: 'SYSTEM',

      });
      await device.reloadReactNative();
      await waitForElement("ChooseCountry",1000,"id")
      await loginWithPhoneAndPassword("0834567891", "123456", "VN");
      await tapId("TabBenefit");
      await tapText("bReward");
      await tapId('txtReward0')
      await scroll('scrollReward', 300, 'down', 0.5, 0.5,0.5);
      await expectElementVisible("Liên hệ","text")
      await expectElementVisible("0834567891","text")
      await swipe('scrollReward', 'up');
      await expectElementVisible("Danh sách cửa hàng","text")
      await expectElementVisible("Chi nhánh Hồ Chí Minh","text")
      await expectElementVisible("168 Nguyễn Gia Trí, P. 25, Q. Bình Thạnh, HCM","text")
      await expectElementVisible("Hiện tại có 3 chi nhánh hoạt động","text");
      await tapId("btnDataStore");
      await expectElementVisible("Danh sách cửa hàng","text")
      await expectElementVisible("btnStoreItem0","id")
      await expectElementNotExist("btnDataStore",'id');
      await tapHeaderBack();
      await expectElementNotExist("IOS","text")
    });
  })
  