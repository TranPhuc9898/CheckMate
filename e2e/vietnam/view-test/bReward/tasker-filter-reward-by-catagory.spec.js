/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-12-02 15:47:33
 * @modify date 2023-06-05 17:06:13
 * @desc [Tasker see reward ]
 * case 1: Tasker filter reward by category
 */
const {
  tapId,
  tapText,
  initData,
  tapHeaderBack,
  expectElementVisible,
  expectElementNotExist,
  loginWithPhoneAndPassword,
} = require('../../../step-definitions');

describe('FILE: flow-test/bReward/tasker-filter-reward-by-catagory.spec.js - Tasker filter reward by category', () => {
  beforeEach(async () => {
    await device.launchApp();
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
        "bReward": {
          "categories": [
            {
              "name": "Entertainment",
              "text": {
                "vi": "Giải trí",
                "en": "Entertainment",
                "ko": "오락 및 취미",
                "th": "เอ็นเตอร์เทนเมนต์"
              },
              "icon": "https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/avatars/kzLBwJZdsJfbyX5Wi",
              "status": "INACTIVE",
              "weight": 4
            },
            {
              "name": "Services",
              "text": {
                "vi": "Dịch vụ",
                "en": "Services",
                "ko": "서비스",
                "th": "การบริการ"
              },
              "icon": "https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/campaigns/DgaA7aPwcPCrQP2RQ",
              "status": "ACTIVE",
              "weight": 1
            },
            {
              "name": "Shopping",
              "text": {
                "vi": "Mua sắm",
                "en": "Shopping",
                "ko": "쇼핑",
                "th": "ช้อปปิ้ง"
              },
              "icon": "https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/avatars/qw65B3yXHsyTfZDdk",
              "status": "ACTIVE",
              "weight": 0
            }
          ]
        }
      }
    })
    await device.reloadReactNative();
  });

  it('LINE 80 - Tasker filter reward by category', async () => {
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
      type: "TOP_DEALS",
      CategoryName: "Shopping"
    });
    await device.reloadReactNative();
    try {
      await loginWithPhoneAndPassword("0834567891", "123456");
    } catch (error) {
    }
    await tapId("TabBenefit");
    await tapText("bReward");
    await expectElementNotExist("category_Entertainment");
    await expectElementVisible("category_Shopping");
    await tapId("category_Shopping");
    await expectElementVisible("itemReward_0");
    await tapHeaderBack();
    await expectElementVisible("category_Services");
    await tapId("category_Services");
    await expectElementNotExist("itemReward_0");
  });

})
