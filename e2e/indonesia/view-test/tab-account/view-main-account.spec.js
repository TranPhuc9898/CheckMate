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
    await initData("id/user/addUserToService", {
      phone: "0834567891",
      type: "INSERT",
      serviceName: "CLEANING"
    });
  });

  it('LINE 27 - See all data in main account indo', async () => {
    await initData('update-user/financialAccount', { phone: "0834567891", isoCode: "ID", financialAccountData: { ID_FMainAccount: 300000, ID_Promotion: 200000 } })
    await initData('id/tasker-task-history/create', { phone: "0834567891", cost: 500000 });
    await initData('id/update-user/remove-transaction', { phone: "0834567891" });
    await initData('update-user/transaction', { phone: "0834567891", amount: 500000 });
    await initData('id/update-user/remove-payout', { phone: "0834567891" });
    await initData('id/update/tasker-settings', { minPayout: 100000 });
    await initData('id/task/createTask',
      {
        resetCollection: true,
        serviceName: 'CLEANING',
        viewedTaskers: ["0834567891"],
        description: "My Task",
        acceptedTasker: "0834567891",
        date: moment().toDate(),
        cost: 300000,
        status: 'DONE',
        taskerRated: true,
      });
    await initData('id/task/createTask',
      {
        serviceName: 'CLEANING',
        viewedTaskers: ["0834567891"],
        description: "My Task",
        acceptedTasker: "0834567891",
        date: moment().toDate(),
        cost: 100000,
      });

    const taskCanceledId = await initData('id/task/createTask',
      {
        serviceName: 'CLEANING',
        viewedTaskers: ["0834567891"],
        description: "My Task",
        acceptedTasker: "0834567891",
        date: moment().toDate(),
        cost: 100000,
        status: 'CANCELED',
        taskPlace: {
          "country": "ID",
          "city": "Hồ Chí Minh",
          "district": "Tân Phú",
        }
      });

    await initData('update-user/profile',
      {
        phone: "0834567891",
        dataUpdate: {
          "TCBankNumber": "123456789",
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
                "country": "ID",
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
    await initData('id/insert-task-report-tasker',
      {
        phone: "0834567891",
        resetCollection: true,
        dataReport: {
          "createdAt": endWeek,
          "fromDate": startWeek,
          "toDate": endWeek,
          "numberOfDoneTask": 6.0,
          "avgRating": 5.0,
          "totalIncome": 180000.0,
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
    await initData('id/insert-task-report-tasker',
      {
        phone: "0834567891",
        dataReport: {
          "createdAt": endWeek2,
          "fromDate": startWeek2,
          "toDate": endWeek2,
          "numberOfDoneTask": 9.0,
          "avgRating": 5.0,
          "totalIncome": 360000.0,
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
    await initData('id/tasker-task-history/create',
      {
        phone: "0834567891",
        beginAt: moment().toDate(),
        endAt: moment().toDate(),
        cost: 500000
      });

    await device.reloadReactNative();
    await waitForElement('TabAccount', 1000);
    await tapId('TabAccount');
    await waitForElement('Tasker Cleaning', 500, 'text');
    await waitForElement('0834567891', 500, 'text');
    await expectIdToHaveText('mainAccount', '300,000Rp');
    await expectIdToHaveText('promotionAccount', '180,000Rp');
    await expectIdToHaveText('incomeThisWeek', '100,000Rp');
    await expectIdToHaveText('tasksThisWeek', '1');
    await expectIdToHaveText('incomeThisMonth', '500,000Rp');
    await tapId('Finance');
    await tapId('Withdraw');
    await typeToTextField('amountWithdraw', '1000000');
    await tapId('btnNext');
    await waitForElement('Số tiền bạn nhập không nằm trong khoảng cho phép rút. Vui lòng thử lại!', 500, 'text');
    await tapText('Đóng');
    await tapHeaderBack();
    await tapId('Withdraw');
    await typeToTextField('amountWithdraw', '5000');
    await tapId('btnNext');
    await waitForElement('Số tiền bạn nhập không nằm trong khoảng cho phép rút. Vui lòng thử lại!', 500, 'text');
    await tapText('Đóng');
    await tapHeaderBack();
    await tapId('Withdraw');
    await typeToTextField('amountWithdraw', '100000');
    await tapId('btnNext');
    await waitForElement('Bạn có chắc chắn muốn rút tiền khỏi tài khoản?', 500, 'text');
    await tapText('Đồng ý');
    await waitForElement('Tạo yêu cầu thành công', 500, 'text');
    await tapText('Đóng');
    await tapId('TabPayout');
    await expectIdToHaveText('trasaction-0', '100,000Rp');
    await tapHeaderBack();
    await tapId('IncomeDetail');
    await tapId('seeIncome');
    await expectIdToHaveText('totalIncome', '500,000Rp');
    await expectIdToHaveText('incomeThisMonth', '500,000Rp');
    await expectIdToHaveText('incomeSelectMonth', '100,000Rp');

    let thisMonth = moment().locale("vi").format('MMMM');
    thisMonth = thisMonth.charAt(0).toUpperCase() + thisMonth.slice(1);
    await tapText(thisMonth);
    let nextMonth = moment().subtract(1, 'months').locale("vi").format('MMMM');
    nextMonth = nextMonth.charAt(0).toUpperCase() + nextMonth.slice(1);
    await tapText(nextMonth);

    await expectIdToHaveText('incomeSelectMonth', '0Rp');
    await waitForElement('Không có công việc nào trong tháng này', 500, 'text');
    await tapHeaderBack();
    await tapId('WeeklyReport');
    await expectIdToHaveText('totalGoodRating', '1');
    await expectIdToHaveText('totalBadRating', '4');
    await expectIdToHaveText('taskSelectWeek', '6');
    await expectIdToHaveText('incomeSelectWeek', '180,000Rp');
    await expectIdToHaveText('goodRating_0', '1. Chị làm rất tốt sạch sẽ vui vẻ đúng giờ');
    await expectIdToHaveText('badRating_0', '1. Chị làm còn dơ');
    await waitForElement('Giảm 5 công việc so với tuần trước', 500, 'text');
    await waitForElement('Tăng 2 công việc so với tuần trước', 500, 'text');
    await tapText(`${moment().subtract(1, "week").startOf("isoWeek").locale("vi").format('DD/MM/YYYY')} - ${moment().subtract(1, "week").endOf("isoWeek").locale("vi").format('DD/MM/YYYY')}`);
    await tapText(`${moment().subtract(3, "week").startOf("isoWeek").locale("vi").format('DD/MM/YYYY')} - ${moment().subtract(3, "week").endOf("isoWeek").locale("vi").format('DD/MM/YYYY')}`);
    await expectIdToHaveText('totalGoodRating', '0');
    await expectIdToHaveText('totalBadRating', '0');
    await expectIdToHaveText('taskSelectWeek', '0');
    await expectIdToHaveText('incomeSelectWeek', '0Rp');
  });
})