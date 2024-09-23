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
  expectElementNotExist,
  tapText,
} = require('../../../step-definitions');

describe('FILE: view-test/bReward/tasker-see-reward-th.spec.js - Tasker see reward Indo', () => {
  beforeEach(async () => {
    await device.launchApp();
  });

  it('LINE 29 - Tasker see reward and redeem success', async () => {
    await initData("user/updateUser", { phone: "0834567891", isoCode: "TH", dataUpdate: { bPoint: { TH: 500 } } });
    await initData('th/incentive/create-incentive', {
      ClearCollection: true,
      IsShowHomePage: true,
      CodeList: [
        { code: '123', isUsed: false },
        { code: '1234', isUsed: false },
      ],
      point: 50,
      office: [{
        name: '28 Trần Bình Trọng, Quận Hải Châu, TP Đà Nẵng)',
        text: { vi: '28 Trần Bình Trọng, Quận Hải Châu, TP Đà Nẵng)' }
      }],
      note: `- Mã khuyến mại có giá trị sử dụng 01 lần duy nhất.\n- Không có giá trị quy đổi thành tiền mặt, không hoàn trả.\n- Áp dụng khi đăng kí trực tiếp tại Thiên Yoga (28 Trần Bình Trọng, Quận Hải Châu, TP Đà Nẵng).*`,
      from: 'SYSTEM',
      image: 'https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/bRewards/vietnam/undefined/Cleaning 50K.jpg',
      City: ['Hồ Chí Minh'],
      title: 'bTaskee Incentive',
      content: 'Các bài tập Yoga sẽ giúp bạn sở hữu một cơ thể khỏe mạnh, một vóc dáng dẻo dai và một tinh thần thoải mái, tràn đầy năng lượng.\nNgoài ra, bộ môn Yoga còn giúp cơ thể loại bỏ các độc tố, thúc đẩy tuần hoàn máu giúp cơ thể trẻ trung hơn.',
    });
    await device.reloadReactNative();
    await tapId("TabBenefit");
    await expectElementVisible("bTaskee Incentive0");
    await tapId("bTaskee Incentive0");
    await expectElementVisible("bTaskee Incentive", "text");
    await expectElementVisible("btnRedeem");
    await tapId("btnRedeem");
    await tapId("btnConfirmRedeem");
    await expectElementVisible("txtRedeemSuccess");
    await tapId("btnDone");
    await expectElementVisible("Ưu đãi của tôi", "text");
    await expectElementVisible("itemNewGift0");
  });

  it('LINE 64 - Tasker see reward and redeem false', async () => {
    await initData("user/updateUser", { phone: "0834567891", isoCode: "TH", dataUpdate: { bPoint: 0 } });
    await initData('th/incentive/create-incentive', {
      ClearCollection: true,
      IsShowHomePage: true,
      CodeList: [
        { code: '123', isUsed: false },
        { code: '1234', isUsed: false },
      ],
      point: 50,
      office: [{
        name: '28 Trần Bình Trọng, Quận Hải Châu, TP Đà Nẵng)',
        text: { vi: '28 Trần Bình Trọng, Quận Hải Châu, TP Đà Nẵng)' }
      }],
      note: `- Mã khuyến mại có giá trị sử dụng 01 lần duy nhất.\n- Không có giá trị quy đổi thành tiền mặt, không hoàn trả.\n- Áp dụng khi đăng kí trực tiếp tại Thiên Yoga (28 Trần Bình Trọng, Quận Hải Châu, TP Đà Nẵng).*`,
      from: 'SYSTEM',
      image: 'https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/bRewards/vietnam/undefined/Cleaning 50K.jpg',
      City: ['Hồ Chí Minh'],
      title: 'bTaskee Incentive',
      content: 'Các bài tập Yoga sẽ giúp bạn sở hữu một cơ thể khỏe mạnh, một vóc dáng dẻo dai và một tinh thần thoải mái, tràn đầy năng lượng.\nNgoài ra, bộ môn Yoga còn giúp cơ thể loại bỏ các độc tố, thúc đẩy tuần hoàn máu giúp cơ thể trẻ trung hơn.',
    });
    await device.reloadReactNative();
    await tapId("TabBenefit");
    await expectElementVisible("bTaskee Incentive0");
    await tapId("bTaskee Incentive0");
    await expectElementVisible("bTaskee Incentive", "text");
    await expectElementVisible("btnRedeem");
    await tapId("btnRedeem");
    await tapId("btnConfirmRedeem");
    await expectElementNotExist("txtRedeemSuccess");
    await expectElementVisible("Bạn không đủ điểm để đổi quà.", "text");
    await tapText("Đóng");
  });

  it('LINE 98 - Tasker see my gift', async () => {
    await initData("user/updateUser", { phone: "0834567891", isoCode: "TH", dataUpdate: { bPoint: 0 } });
    await initData('th/incentive/create-incentive', {
      ClearCollection: true,
      IsShowHomePage: true,
      CodeList: [
        { code: '123', isUsed: false },
        { code: '1234', isUsed: false },
      ],
      point: 50,
      office: [{
        name: '28 Trần Bình Trọng, Quận Hải Châu, TP Đà Nẵng)',
        text: { vi: '28 Trần Bình Trọng, Quận Hải Châu, TP Đà Nẵng)' }
      }],
      note: `- Mã khuyến mại có giá trị sử dụng 01 lần duy nhất.\n- Không có giá trị quy đổi thành tiền mặt, không hoàn trả.\n- Áp dụng khi đăng kí trực tiếp tại Thiên Yoga (28 Trần Bình Trọng, Quận Hải Châu, TP Đà Nẵng).*`,
      from: 'SYSTEM',
      image: 'https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/bRewards/vietnam/undefined/Cleaning 50K.jpg',
      City: ['Jakarta'],
      title: 'bTaskee Incentive',
      content: 'Các bài tập Yoga sẽ giúp bạn sở hữu một cơ thể khỏe mạnh, một vóc dáng dẻo dai và một tinh thần thoải mái, tràn đầy năng lượng.\nNgoài ra, bộ môn Yoga còn giúp cơ thể loại bỏ các độc tố, thúc đẩy tuần hoàn máu giúp cơ thể trẻ trung hơn.',
    });
    await initData('gift/create-gift-id', {
      ClearCollection: true,
      note: `- Mã khuyến mại có giá trị sử dụng 01 lần duy nhất.\n- Không có giá trị quy đổi thành tiền mặt, không hoàn trả.\n- Áp dụng khi đăng kí trực tiếp tại Thiên Yoga (28 Trần Bình Trọng, Quận Hải Châu, TP Đà Nẵng).*`,
      from: 'SYSTEM',
      image: 'https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/bRewards/vietnam/undefined/Cleaning 50K.jpg',
      city: ['Jakarta'],
      title: 'bTaskee Incentive',
      content: 'Các bài tập Yoga sẽ giúp bạn sở hữu một cơ thể khỏe mạnh, một vóc dáng dẻo dai và một tinh thần thoải mái, tràn đầy năng lượng.\nNgoài ra, bộ môn Yoga còn giúp cơ thể loại bỏ các độc tố, thúc đẩy tuần hoàn máu giúp cơ thể trẻ trung hơn.',
      phone: "0834567891"
    });
    await device.reloadReactNative();
    await tapId("TabBenefit");
    await tapId("btnMyGift");
    await expectElementVisible("itemNewGift0");
  });

  it('LINE 151 - Tasker see gift used', async () => {
    await initData("user/updateUser", { phone: "0834567891", isoCode: "TH", dataUpdate: { bPoint: 0 } });
    await initData('th/incentive/create-incentive', {
      ClearCollection: true,
      IsShowHomePage: true,
      CodeList: [
        { code: '123', isUsed: false },
        { code: '1234', isUsed: false },
      ],
      point: 50,
      office: [{
        name: '28 Trần Bình Trọng, Quận Hải Châu, TP Đà Nẵng)',
        text: { vi: '28 Trần Bình Trọng, Quận Hải Châu, TP Đà Nẵng)' }
      }],
      note: `- Mã khuyến mại có giá trị sử dụng 01 lần duy nhất.\n- Không có giá trị quy đổi thành tiền mặt, không hoàn trả.\n- Áp dụng khi đăng kí trực tiếp tại Thiên Yoga (28 Trần Bình Trọng, Quận Hải Châu, TP Đà Nẵng).*`,
      from: 'SYSTEM',
      image: 'https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/bRewards/vietnam/undefined/Cleaning 50K.jpg',
      City: ['Jakarta'],
      title: 'bTaskee Incentive',
      content: 'Các bài tập Yoga sẽ giúp bạn sở hữu một cơ thể khỏe mạnh, một vóc dáng dẻo dai và một tinh thần thoải mái, tràn đầy năng lượng.\nNgoài ra, bộ môn Yoga còn giúp cơ thể loại bỏ các độc tố, thúc đẩy tuần hoàn máu giúp cơ thể trẻ trung hơn.',
    });
    await initData('th/gift/create-gift', {
      ClearCollection: true,
      note: `- Mã khuyến mại có giá trị sử dụng 01 lần duy nhất.\n- Không có giá trị quy đổi thành tiền mặt, không hoàn trả.\n- Áp dụng khi đăng kí trực tiếp tại Thiên Yoga (28 Trần Bình Trọng, Quận Hải Châu, TP Đà Nẵng).*`,
      from: 'SYSTEM',
      image: 'https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/bRewards/vietnam/undefined/Cleaning 50K.jpg',
      city: ['Jakarta'],
      title: 'bTaskee Incentive',
      content: 'Các bài tập Yoga sẽ giúp bạn sở hữu một cơ thể khỏe mạnh, một vóc dáng dẻo dai và một tinh thần thoải mái, tràn đầy năng lượng.\nNgoài ra, bộ môn Yoga còn giúp cơ thể loại bỏ các độc tố, thúc đẩy tuần hoàn máu giúp cơ thể trẻ trung hơn.',
      phone: "0834567891",
      isUsed: true
    });
    await device.reloadReactNative();
    await tapId("TabBenefit");
    await tapId("btnMyGift");
    await expectElementNotExist("itemNewGift0");
    await tapId("TabMyReward");
    await expectElementVisible("itemUsedGift0");
    await expectElementVisible("Đã dùng", "text");
  });

  it('LINE 198 - Tasker see gift expired', async () => {
    await initData("user/updateUser", { phone: "0834567891", isoCode: "TH", dataUpdate: { bPoint: 0 } });
    await initData('th/incentive/create-incentive', {
      ClearCollection: true,
      IsShowHomePage: true,
      CodeList: [
        { code: '123', isUsed: false },
        { code: '1234', isUsed: false },
      ],
      point: 50,
      office: [{
        name: '28 Trần Bình Trọng, Quận Hải Châu, TP Đà Nẵng)',
        text: { vi: '28 Trần Bình Trọng, Quận Hải Châu, TP Đà Nẵng)' }
      }],
      note: `- Mã khuyến mại có giá trị sử dụng 01 lần duy nhất.\n- Không có giá trị quy đổi thành tiền mặt, không hoàn trả.\n- Áp dụng khi đăng kí trực tiếp tại Thiên Yoga (28 Trần Bình Trọng, Quận Hải Châu, TP Đà Nẵng).*`,
      from: 'SYSTEM',
      image: 'https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/bRewards/vietnam/undefined/Cleaning 50K.jpg',
      City: ['Jakarta'],
      title: 'bTaskee Incentive',
      content: 'Các bài tập Yoga sẽ giúp bạn sở hữu một cơ thể khỏe mạnh, một vóc dáng dẻo dai và một tinh thần thoải mái, tràn đầy năng lượng.\nNgoài ra, bộ môn Yoga còn giúp cơ thể loại bỏ các độc tố, thúc đẩy tuần hoàn máu giúp cơ thể trẻ trung hơn.',
    });
    await initData('th/gift/create-gift', {
      ClearCollection: true,
      note: `- Mã khuyến mại có giá trị sử dụng 01 lần duy nhất.\n- Không có giá trị quy đổi thành tiền mặt, không hoàn trả.\n- Áp dụng khi đăng kí trực tiếp tại Thiên Yoga (28 Trần Bình Trọng, Quận Hải Châu, TP Đà Nẵng).*`,
      from: 'SYSTEM',
      image: 'https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/bRewards/vietnam/undefined/Cleaning 50K.jpg',
      city: ['Jakarta'],
      title: 'bTaskee Incentive',
      content: 'Các bài tập Yoga sẽ giúp bạn sở hữu một cơ thể khỏe mạnh, một vóc dáng dẻo dai và một tinh thần thoải mái, tràn đầy năng lượng.\nNgoài ra, bộ môn Yoga còn giúp cơ thể loại bỏ các độc tố, thúc đẩy tuần hoàn máu giúp cơ thể trẻ trung hơn.',
      phone: "0834567891",
      expired: true
    });
    await device.reloadReactNative();
    await tapId("TabBenefit");
    await tapId("btnMyGift");
    await expectElementNotExist("itemNewGift0");
    await tapId("TabMyReward");
    await expectElementVisible("itemUsedGift0");
    await expectElementVisible("Hết hạn", "text");
  });
})
