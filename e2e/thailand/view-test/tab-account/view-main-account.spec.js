/**
 * @author ToanNguyen
 * @email [huutoan.nguyen@btaskee.com]
 * @create date 2022-10-11 17:00:42
 * @modify date 2022-10-11 17:00:42
 * @desc [View main tab account]
 * case 1: Tasker accept task auto confirm and navigate to Chat
 * case 2: Tasker accept task not confirm and navigate to waiting confirm
 */

const {
  tapId,
  initData,
  tapText,
  waitForElement,
  typeToTextField,
  expectIdToHaveText,
  tapHeaderBack,
} = require('../../../step-definitions');
const moment = require('moment');

describe('FILE: view-main-account.spec.js - View main tab account', () => {
  beforeEach(async () => {
    await device.launchApp();
  });

  it('LINE 29 - See all data in main account', async () => {
    await initData("th/user/addUserToService", {
      phone: "0834567891",
      type: "INSERT",
      serviceName: "CLEANING"
    });
    await initData('update-user/financialAccount', { phone: "0834567891", isoCode: "TH", financialAccountData: { TH_FMainAccount: 3000, TH_Promotion: 2000 } })
    await initData('th/tasker-task-history/create', { phone: "0834567891", cost: 5000 });
    await initData('th/update-user/remove-transaction', { phone: "0834567891" });
    await initData('update-user/transaction', { phone: "0834567891", amount: 5000 });
    await initData('th/update-user/remove-payout', { phone: "0834567891" });
    await initData('th/update/tasker-settings', { minPayout: 1000 });
    await initData('th/task/createTask',
      {
        resetCollection: true,
        serviceName: 'CLEANING',
        viewedTaskers: ["0834567891"],
        description: "My Task",
        acceptedTasker: "0834567891",
        date: moment().toDate(),
        cost: 3000,
        status: 'DONE',
      });
    await initData('th/task/createTask',
      {
        serviceName: 'CLEANING',
        viewedTaskers: ["0834567891"],
        description: "My Task",
        acceptedTasker: "0834567891",
        date: moment().toDate(),
        cost: 1000,
      });

    const taskCanceledId = await initData('th/task/createTask',
      {
        serviceName: 'CLEANING',
        viewedTaskers: ["0834567891"],
        description: "My Task",
        acceptedTasker: "0834567891",
        date: moment().toDate(),
        cost: 1000,
        status: 'CANCELED',
        taskPlace: {
          "country": "VN",
          "city": "Hồ Chí Minh",
          "district": "Tân Phú",
        }
      });

    await initData('update-user/profile',
      {
        phone: "0834567891",
        dataUpdate: {
          "taskCancelByTasker": [
            {
              "taskId": taskCanceledId,
              "serviceName": "CLEANING",
              "cancelDate": moment().toDate(),
              "reason": "WRONG_DATE",
              "serviceText": {
                "vi": "Dọn dẹp nhà",
                "en": "Cleaning",
                "ko": "가사 도우미",
                "th": "ทำความสะอาดบ้าน",
              },
              "duration": 3.0,
              "from": "TASKER_APP",
              "action": "CANCEL_TASK",
              "textDetail": "",
              "address": "67 Trần Văn Cần, Tân Thới Hoà, Tân Phú, Hồ Chí Minh, Vietnam",
              "status": "CONFIRMED",
              "createdBy": "mwEXrFZqZvenfwoHb",
              "date": moment().toDate(),
              "contactPhone": "0903673348",
              "taskPlace": {
                "country": "VN",
                "city": "Hồ Chí Minh",
                "district": "Tân Phú",
              }
            }
          ],
        }
      });

    const startWeek = moment().subtract(1, "week").startOf("isoWeek");
    const endWeek = moment().subtract(1, "week").endOf("isoWeek");
    const startWeek2 = moment().subtract(2, "week").startOf("isoWeek");
    const endWeek2 = moment().subtract(2, "week").endOf("isoWeek");
    await initData('th/insert-task-report-tasker',
      {
        phone: "0834567891",
        resetCollection: true,
        dataReport: {
          "createdAt": endWeek,
          "fromDate": startWeek,
          "toDate": endWeek,
          "numberOfDoneTask": 6.0,
          "avgRating": 5.0,
          "totalIncome": 1800.0,
          "suggestion": [],
          "goodRating": {
            "total": 1.0,
            "feedback": [],
            "review": [
              "Chị làm rất tốt sạch sẽ vui vẻ đúng giờ"
            ]
          },
          "badRating": {
            "total": 4.0,
            "feedback": [],
            "review": [
              "Chị làm còn dơ"
            ]
          }
        }
      });
    await initData('th/insert-task-report-tasker',
      {
        phone: "0834567891",
        dataReport: {
          "createdAt": endWeek2,
          "fromDate": startWeek2,
          "toDate": endWeek2,
          "numberOfDoneTask": 9.0,
          "avgRating": 5.0,
          "totalIncome": 3600.0,
          "suggestion": [],
          "goodRating": {
            "total": 6.0,
            "feedback": [],
            "review": [
              "Chị làm rất tốt sạch sẽ vui vẻ đúng giờ"
            ]
          },
          "badRating": {
            "total": 2.0,
            "feedback": [],
            "review": [
              "Chị làm còn dơ"
            ]
          }
        }
      });
    await initData('tasker-task-history/create',
      {
        phone: "0834567891",
        beginAt: moment().toDate(),
        endAt: moment().toDate(),
        cost: 5000
      });

    await device.launchApp();
    await waitForElement('TabAccount', 1000);
    await tapId('TabAccount');
    await waitForElement('Tasker TH', 500, 'text');
    await waitForElement('0834567891', 500, 'text');
    await expectIdToHaveText('mainAccount', '3,000฿');
    await expectIdToHaveText('promotionAccount', '1,800฿');
    await expectIdToHaveText('incomeThisWeek', '1,000฿');
    await expectIdToHaveText('tasksThisWeek', '1');
    await expectIdToHaveText('incomeThisMonth', '5,000฿');
    await tapId('Finance');
    await tapId('Withdraw');
    await typeToTextField('amountWithdraw', '10000');
    await tapId('btnNext');
    await waitForElement('Số tiền bạn nhập không nằm trong khoảng cho phép rút. Vui lòng thử lại!', 500, 'text');
    await tapText('Đóng');
    await tapHeaderBack();
    await tapId('Withdraw');
    await typeToTextField('amountWithdraw', '500');
    await tapId('btnNext');
    await waitForElement('Số tiền bạn nhập không nằm trong khoảng cho phép rút. Vui lòng thử lại!', 500, 'text');
    await tapText('Đóng');
    await tapHeaderBack();
    await tapId('Withdraw');
    await typeToTextField('amountWithdraw', '1000');
    await tapId('btnNext');
    await waitForElement('Bạn có chắc chắn muốn rút tiền khỏi tài khoản?', 500, 'text');
    await tapText('Đồng ý');
    await waitForElement('Tạo yêu cầu thành công', 500, 'text');
    await tapText('Đóng');
    await tapId('TabPayout');
    await expectIdToHaveText('trasaction-0', '1,000฿');
    await tapHeaderBack();
    await tapId('IncomeDetail');
    await tapId('seeIncome');
    await expectIdToHaveText('totalIncome', '5,000฿');
    await expectIdToHaveText('incomeThisMonth', '5,000฿');
    await expectIdToHaveText('incomeSelectMonth', '1,000฿');

    let thisMonth = moment().locale("vi").format('MMMM');
    thisMonth = thisMonth.charAt(0).toUpperCase() + thisMonth.slice(1);
    await tapText(thisMonth);
    let nextMonth = moment().subtract(1, 'months').locale("vi").format('MMMM');
    nextMonth = nextMonth.charAt(0).toUpperCase() + nextMonth.slice(1);
    await tapText(nextMonth);

    await expectIdToHaveText('incomeSelectMonth', '0฿');
    await waitForElement('Không có công việc nào trong tháng này', 500, 'text');
    await tapHeaderBack();
    await tapId('WeeklyReport');
    await expectIdToHaveText('totalGoodRating', '1');
    await expectIdToHaveText('totalBadRating', '4');
    await expectIdToHaveText('taskSelectWeek', '6');
    await expectIdToHaveText('incomeSelectWeek', '1,800฿');
    await expectIdToHaveText('goodRating_0', '1. Chị làm rất tốt sạch sẽ vui vẻ đúng giờ');
    await expectIdToHaveText('badRating_0', '1. Chị làm còn dơ');
    await waitForElement('Giảm 5 công việc so với tuần trước', 500, 'text');
    await waitForElement('Tăng 2 công việc so với tuần trước', 500, 'text');
    await tapText(`${moment().subtract(1, "week").startOf("isoWeek").locale("vi").format('DD/MM/YYYY')} - ${moment().subtract(1, "week").endOf("isoWeek").locale("vi").format('DD/MM/YYYY')}`);
    await tapText(`${moment().subtract(3, "week").startOf("isoWeek").locale("vi").format('DD/MM/YYYY')} - ${moment().subtract(3, "week").endOf("isoWeek").locale("vi").format('DD/MM/YYYY')}`);
    await expectIdToHaveText('totalGoodRating', '0');
    await expectIdToHaveText('totalBadRating', '0');
    await expectIdToHaveText('taskSelectWeek', '0');
    await expectIdToHaveText('incomeSelectWeek', '0฿');
  });
})