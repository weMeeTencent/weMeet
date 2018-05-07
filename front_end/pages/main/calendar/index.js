// // // // // // // // // // // // // // 
//
//            日历相关函数
//
// // // // // // // // // // // // // // 

var app = getApp();

//月份天数表
var DAY_OF_MONTH = [
  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
];

//判断当前年是否闰年
var isLeapYear = function (year) {
  if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0))
    return 1
  else
    return 0
};

//获取当月有多少天
var getDayCount = function (year, month) {
  return DAY_OF_MONTH[isLeapYear(year)][month];
};

//获取当前索引下是几号
var getDay = function (index) {
  return index - curDayOffset;
};

//获取两个时间戳之间间隔的天数
var getOffDays = function (startDate, endDate) {
  //得到时间戳相减 得到以毫秒为单位的差  
  var mmSec = (endDate.getTime() - startDate.getTime());
  //单位转换为天并返回 
  return (mmSec / 3600000 / 24);
};

//获取可选时间段
var getSelectable = function (startDate, endDate) {
  //得到时间戳相减 得到以毫秒为单位的差  
  var mmSec = (endDate.getTime() - startDate.getTime());
  //单位转换为天并返回 
  return (mmSec / 3600000 / 24);
};

var pageData = {
  dateData: {
    date: "",                //当前日期字符串
    arrDays: [],             //关于几号的信息
    isCurentMonth: [],           //是否显示此日期
    isSelectable: [],
    isToday: [],
  },

  hot_list: [
    { seq: 'A', duration: "4月25日（今天） 18:00-20:00", vote_rate: '50' },
    { seq: 'B', duration: "4月26日（明天） 08:00-10:00", vote_rate: '20' },
    { seq: 'C', duration: "4月26日（明天） 16:00-18:00", vote_rate: '20' },
    { seq: 'D', duration: "4月27日（周五） 10:00-12:00", vote_rate: '10' },
    { seq: 'D', duration: "4月27日（周五） 10:00-12:00", vote_rate: '10' },
    { seq: 'D', duration: "4月27日（周五） 10:00-12:00", vote_rate: '10' },
  ]
}

//获取此月第一天相对视图显示的偏移
var getOffset = function () {
  var offset = new Date(curYear, curMonth, 1).getDay();
  offset = offset == 0 ? 6 : offset - 1; //注意这个转换，Date对象的getDay函数返回返回值是 0（周日） 到 6（周六） 
  return offset;
}


//刷新全部数据
var refreshPageData = function (year, month, day) {
  curMonth = month;
  curYear = year;
  curDay = day;

  pageData.dateData.date = curYear + '年' + (curMonth + 1) + '月';

  var offset = getOffset();
  var offset2 = getDayCount(curYear, curMonth) + offset;
  for (var i = 0; i < 42; ++i) {
    pageData.dateData.isCurentMonth[i] = i < offset || i >= offset2 ? false : true;
    // pageData.dateData.isSelectable[i] = (curYear < new Date().getFullYear()) || (curMonth < new Date().getMonth()) || (curDay < new Date().getDate()) ? false : true;
    pageData.dateData.isToday[i] = curYear === new Date().getFullYear() && curMonth === new Date().getMonth() && (i - offset + 1 === new Date().getDate()) ? true : false;
    if (i < offset){
      if (curMonth === 0){
        pageData.dateData.arrDays[i] = getDayCount(curYear - 1, 11) - offset + 1 + i;
      } else {
        pageData.dateData.arrDays[i] = getDayCount(curYear, curMonth - 1) - offset + 1 + i;
      }
    } else if (i >= offset2) {
      pageData.dateData.arrDays[i] = i - offset2 + 1;
    } else{
      pageData.dateData.arrDays[i] = i - offset + 1;
    }
  }
};

// // // // // // // // // // // // // // 
//
//               初始化
//
// // // // // // // // // // // // // // 

var curDate = new Date();
var curMonth = curDate.getMonth();
var curYear = curDate.getFullYear();
var curDay = curDate.getDate();
refreshPageData(curYear, curMonth, curDay);

Page({
  data: pageData,
  onLoad: function () {
  },
  onShow: function () {
    this.setData({
      checkbox: 0,
    })
  },
  onShareAppMessage: function () {
    return {
      title: 'weMeet微历',
      desc: '微历，让相聚更容易。',
      path: '/pages/main/calendar/index'
    }
  },

  goToday: function (e) {
    curDate = new Date();
    curMonth = curDate.getMonth();
    curYear = curDate.getFullYear();
    curDay = curDate.getDate();
    refreshPageData(curYear, curMonth, curDay);
    this.setData({
      dateData: pageData.dateData,
    })
  },

  goLastMonth: function (e) {
    if (0 == curMonth) {
      curMonth = 11;
      --curYear
    }
    else {
      --curMonth;
    }
    refreshPageData(curYear, curMonth, 1);
    this.setData({
      dateData: pageData.dateData,
    })
  },

  goNextMonth: function (e) {
    if (11 == curMonth) {
      curMonth = 0;
      ++curYear
    }
    else {
      ++curMonth;
    }
    refreshPageData(curYear, curMonth, 1);
    this.setData({
      dateData: pageData.dateData,
    })
  },


  bindDateChange: function (e) {
    var arr = e.detail.value.split("-");
    refreshPageData(+arr[0], arr[1] - 1, +arr[2]);
    this.setData({
      dateData: pageData.dateData,
    })
  },



  // // // // // // // // // // // // // // 
  //
  //            页面交互函数
  //
  // // // // // // // // // // // // // // 

  showMonth: function () {
    this.setData({
      checkbox: 0
    })
  },
  showWeek: function () {
    this.setData({
      checkbox: 1
    })
  },
  showDay: function () {
    this.setData({
      checkbox: 2
    })
  },
  showHot: function () {
    this.setData({
      pre_checkbox: this.data.checkbox,
      checkbox: this.data.checkbox === 3 ? this.data.pre_checkbox : 3
    })
  }
});