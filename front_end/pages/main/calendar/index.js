// // // // // // // // // // // // // // 
//
//            日历相关函数
//
// // // // // // // // // // // // // // 

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

//获取两个时间戳之间间隔的天数
var getOffDays = function (startDate, endDate) {
  //得到时间戳相减 得到以毫秒为单位的差  
  var mmSec = (endDate.getTime() - startDate.getTime());
  //单位转换为天并返回 
  return (mmSec / 3600000 / 24);
};

var arr24 = new Array(24);

var pageData = {
  dateData: {
    date: "",                //当前日期字符串
    arrDays: [],             //按月拆分的数组，存放日期信息
    arrWeeks: [],             //按星期拆分的数组，存放日期信息
    arrHours: arr24,             //按小时拆分的数组
  },
  hot_list: [
    { seq: 'A', duration: "4月25日（今天） 18:00-20:00", vote_rate: '50' },
    { seq: 'B', duration: "4月26日（明天） 08:00-10:00", vote_rate: '20' },
    { seq: 'C', duration: "4月26日（明天） 16:00-18:00", vote_rate: '20' },
    { seq: 'D', duration: "4月27日（周五） 10:00-12:00", vote_rate: '10' },
    { seq: 'D', duration: "4月27日（周五） 10:00-12:00", vote_rate: '10' },
    { seq: 'D', duration: "4月27日（周五） 10:00-12:00", vote_rate: '10' },
  ],
  checkbox: 0,
  selected: {},
  arrSelect: [],
}

//获取此月第一天相对视图显示的偏移
var getOffset = function () {
  var offset = new Date(curYear, curMonth, 1).getDay();
  offset = offset == 0 ? 6 : offset - 1; //注意这个转换，Date对象的getDay函数返回返回值是 0（周日） 到 6（周六） 
  return offset;
}

var addZero = function (num) {
  if (num < 10) {
    return '0' + num;
  }
  return num;
}

var getTimestamps = function (year, month, day, start, end) {
  var startTime = year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(start) + ':00:00';
  var endTime = year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(end) + ':00:00';
  return startTime + '_' + endTime;
}
var getSelectedItem = function (year, month, day) {
  return [year, addZero(month), addZero(day)].join('-');
}

var isSelectable = function (item) {
  var start = {
    'year': new Date().getFullYear(),
    'month': new Date().getMonth() + 1,
    'day': new Date().getDate(),
  }
  var itemTime = parseInt([item.year, addZero(item.month), addZero(item.day)].join(''), 10);
  var startTime = parseInt([start.year, addZero(start.month), addZero(start.day)].join(''), 10);
  return itemTime >= startTime;
}

// 点击事件
var refreshSelectData = function (item) {
  for (var i = 0; i < 42; ++i) {
    if (pageData.dateData.arrDays[i]['item'] === item) {
      pageData.dateData.arrDays[i]['isSelected'] = Boolean(pageData.selected[item] && pageData.selected[item]['day']);
    }
  }
}


//刷新全部数据
var refreshPageData = function (year, month, day, checkbox) {
  curMonth = month;
  curYear = year;
  curDay = day;

  var offset = getOffset();
  var offset2 = getDayCount(curYear, curMonth) + offset;
  for (var i = 0; i < 42; ++i) {
    if (i < offset) {
      if (curMonth === 0) {
        pageData.dateData.arrDays[i] = {
          'year': curYear - 1,
          'month': 12,
          'day': getDayCount(curYear - 1, 11) - offset + 1 + i,
          'isCurentMonth': false,
          'item': getSelectedItem(curYear - 1, 12, getDayCount(curYear - 1, 11) - offset + 1 + i),
        };
      } else {
        pageData.dateData.arrDays[i] = {
          'year': curYear,
          'month': curMonth,
          'day': getDayCount(curYear, curMonth - 1) - offset + 1 + i,
          'isCurentMonth': false,
          'item': getSelectedItem(curYear, curMonth, getDayCount(curYear, curMonth - 1) - offset + 1 + i),
        };
      }
    } else if (i >= offset2) {
      if (curMonth === 11) {
        pageData.dateData.arrDays[i] = {
          'year': curYear + 1,
          'month': 1,
          'day': i - offset2 + 1,
          'isCurentMonth': false,
          'item': getSelectedItem(curYear + 1, 1, i - offset2 + 1),
        };
      } else {
        pageData.dateData.arrDays[i] = {
          'year': curYear,
          'month': curMonth + 2,
          'day': i - offset2 + 1,
          'isCurentMonth': false,
          'item': getSelectedItem(curYear, curMonth + 2, i - offset2 + 1),
        };
      }
    } else {
      pageData.dateData.arrDays[i] = {
        'year': curYear,
        'month': curMonth + 1,
        'day': i - offset + 1,
        'isCurentMonth': true,
        'item': getSelectedItem(curYear, curMonth + 1, i - offset + 1),
      };
    }
    var item = pageData.dateData.arrDays[i]['item'];
    pageData.dateData.arrDays[i]['isSelected'] = Boolean(pageData.selected[item] && pageData.selected[item]['day']);
    pageData.dateData.arrDays[i]['i'] = i;
    pageData.dateData.arrDays[i]['isToday'] = Boolean(curYear === new Date().getFullYear() && curMonth === new Date().getMonth() && (i - offset + 1 === new Date().getDate()));
    pageData.dateData.arrDays[i]['isSelectable'] = isSelectable(pageData.dateData.arrDays[i]);
  }

  // refreshSelectData(item);
  pageData.dateData.weekNum = Math.ceil((getDayCount(curYear, curMonth) + offset) / 7);
  pageData.dateData.arrWeeks = pageData.dateData.arrWeeks.slice(0, pageData.dateData.weekNum)
  for (var i = 0; i < pageData.dateData.weekNum; ++i) {
    pageData.dateData.arrWeeks[i] = pageData.dateData.arrDays.slice(i * 7, i * 7 + 7);
  }

  pageData.dateData.curWeek = Math.ceil((curDay + offset) / 7);
  if (checkbox === 0) {
    pageData.dateData.date = curYear + '年' + (curMonth + 1) + '月';
  } else if (checkbox === 1) {
    pageData.dateData.date = curYear + '年' + (curMonth + 1) + '月第' + pageData.dateData.curWeek + '周';
  } else if (checkbox === 2) {
    pageData.dateData.date = curYear + '年' + (curMonth + 1) + '月' + curDay + '日';
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
refreshPageData(curYear, curMonth, curDay, 0);

var util = require('../../../utils/util.js')

Page({
  data: pageData,
  onLoad: function () {
    var openId = getApp().openId;
    var activityId = util.getCurrentPageUrl()['activityId'];
    this.setData({
      openId: openId,
      activityId: activityId
    })
    var activityUrl = 'https://www.chengfpl.com/weili/user/select/activity?activityId=' + activityId;
    var _this = this;
    wx.request({
      url: activityUrl,
      data: { openId: openId },

      complete: function (res) {
        //dismiss进度条
        wx.hideLoading();
      },
      success: function (res) {
        console.log(res)
        _this.setData({
          acitvityData: res.data.data,
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '加载活动失败',
        })
      }
    })
    this.getJoinData();
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
  getJoinData: function () {
    var _this = this;
    switch (_this.data.checkbox) {
      case 0:
        var url = 'https://www.chengfpl.com/weili/user/temporary/participation/day?activityId=' + this.data.activityId;
        break;
      case 1:
        var url = 'https://www.chengfpl.com/weili/user/participation/partofday?activityId=' + this.data.activityId;
        break;
      case 2:
        var url = 'https://www.chengfpl.com/weili/user/participation/hour?activityId=' + this.data.activityId;
        break;
      default:
        var url = 'https://www.chengfpl.com/weili/user/temporary/participation/day?activityId=' + this.data.activityId;
    }
    wx.request({
      url: url,
      data: { openId: this.data.openId },
      complete: function (res) {
        wx.hideLoading();
      },
      success: function (res) {
        switch (_this.data.checkbox) {
          case 0:
            _this.setData({
              monthJoinData: res.data.data,
            })
            break;
          case 1:
            _this.setData({
              weekJoinData: res.data.data,
            })
            break;
          case 2:
            _this.setData({
              dayJoinData: res.data.data,
            })
            break;
          default:
            _this.setData({
              monthJoinData: res.data.data,
            })
        }
      },
      fail: function (res) {
      }
    })
    // refreshPageData(curYear, curMonth, curDay, this.data.checkbox);
    // this.setData({
    //   dateData: pageData.dateData,
    // })
  },
  goToday: function (e) {
    curDate = new Date();
    curMonth = curDate.getMonth();
    curYear = curDate.getFullYear();
    curDay = curDate.getDate();
    refreshPageData(curYear, curMonth, curDay, this.data.checkbox);
    this.setData({
      dateData: pageData.dateData,
    })
  },

  goLastMonth: function (e) {
    if (0 === curMonth) {
      curMonth = 11;
      --curYear
    }
    else {
      --curMonth;
    }
    refreshPageData(curYear, curMonth, 1, this.data.checkbox);
    this.setData({
      dateData: pageData.dateData,
    })
  },

  goNextMonth: function (e) {
    if (11 === curMonth) {
      curMonth = 0;
      ++curYear
    }
    else {
      ++curMonth;
    }
    refreshPageData(curYear, curMonth, 1, this.data.checkbox);
    this.setData({
      dateData: pageData.dateData,
    })
  },

  goLastWeek: function (e) {
    if (curDay <= 7) {
      if (curMonth === 0) {
        curMonth = 11;
        --curYear
      } else {
        --curMonth;
      }
      var dayCount = getDayCount(curYear, curMonth);
      curDay = dayCount + curDay - 7;
    } else {
      curDay = curDay - 7;
    }
    refreshPageData(curYear, curMonth, curDay, this.data.checkbox);
    this.setData({
      dateData: pageData.dateData,
    })
  },

  goNextWeek: function (e) {
    var dayCount = getDayCount(curYear, curMonth);
    if (curDay >= dayCount - 7) {
      if (curMonth === 11) {
        curMonth = 0;
        ++curYear
      } else {
        ++curMonth;
      }
      curDay = curDay + 7 - dayCount;
    } else {
      curDay = curDay + 7;
    }
    refreshPageData(curYear, curMonth, curDay, this.data.checkbox);
    this.setData({
      dateData: pageData.dateData,
    })
  },

  goLastDay: function (e) {
    if (curDay === 1) {
      if (curMonth === 0) {
        curMonth = 11;
        --curYear
      } else {
        --curMonth;
      }
      var dayCount = getDayCount(curYear, curMonth);
      curDay = dayCount;
    } else {
      --curDay;
    }
    refreshPageData(curYear, curMonth, curDay, this.data.checkbox);
    this.setData({
      dateData: pageData.dateData,
    })
  },

  goNextDay: function (e) {
    var dayCount = getDayCount(curYear, curMonth);
    if (curDay === dayCount) {
      if (curMonth === 11) {
        curMonth = 0;
        ++curYear
      } else {
        ++curMonth;
      }
      curDay = 1;
    } else {
      ++curDay;
    }
    refreshPageData(curYear, curMonth, curDay, this.data.checkbox);
    this.setData({
      dateData: pageData.dateData,
    })
  },

  goLast: function () {
    if (this.data.checkbox === 0) {
      this.goLastMonth();
    } else if (this.data.checkbox === 1) {
      this.goLastWeek();
    } else if (this.data.checkbox === 2) {
      this.goLastDay();
    }
  },
  goNext: function () {
    if (this.data.checkbox === 0) {
      this.goNextMonth();
    } else if (this.data.checkbox === 1) {
      this.goNextWeek();
    } else if (this.data.checkbox === 2) {
      this.goNextDay();
    }
  },
  bindDateChange: function (e) {
    var arr = e.detail.value.split("-");
    refreshPageData(+arr[0], arr[1] - 1, +arr[2], this.data.checkbox);
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
    this.getJoinData();
    refreshPageData(curYear, curMonth, curDay, this.data.checkbox);
    this.setData({
      dateData: pageData.dateData,
    })
  },
  showWeek: function () {
    this.setData({
      checkbox: 1
    })
    this.getJoinData();
    refreshPageData(curYear, curMonth, curDay, this.data.checkbox);
    this.setData({
      dateData: pageData.dateData,
    })
  },
  showDay: function () {
    this.setData({
      checkbox: 2
    })
    this.getJoinData();
    refreshPageData(curYear, curMonth, curDay, this.data.checkbox);
    this.setData({
      dateData: pageData.dateData,
    })
  },
  showHot: function () {
    this.setData({
      pre_checkbox: this.data.checkbox,
      checkbox: this.data.checkbox === 3 ? this.data.pre_checkbox : 3
    })
  },
  selectDay: function (e) {
    var target = e.currentTarget.dataset.dayIndex;
    console.log(target);
    var item = getSelectedItem(target.year, target.month, target.day);
    if (target.isSelectable && target.isCurentMonth) {
      if (!pageData.selected[item]) {
        pageData.selected[item] = {};
      }
      pageData.selected[item]['day'] = 1;
      pageData.selected[item]['day_stamps'] = getTimestamps(target.year, target.month, target.day, 0, 24);
      this.setData({
        selected: pageData.selected,
      });
      refreshSelectData(item);
      this.setData({
        dateData: pageData.dateData,
      });
    }
    if (target.isSelected) {
      delete pageData.selected[item];
      this.setData({
        selected: pageData.selected,
      });
      refreshSelectData(item);
      this.setData({
        dateData: pageData.dateData,
      });
    }

  },
  selectDuration: function (e) {
    var target = e.currentTarget.dataset.dayIndex;
    var start = e.currentTarget.dataset.weekIndex[1];
    var end = e.currentTarget.dataset.weekIndex[2];
    var item = getSelectedItem(target.year, target.month, target.day);
    if (!pageData.selected[item]) {
      pageData.selected[item] = {
        duration: {},
      };
    }
    pageData.selected[item]['duration'][e.currentTarget.dataset.weekIndex[0]] = getTimestamps(target.year, target.month, target.day, start, end);
    this.setData({
      selected: pageData.selected,
    })
  },
  selectHour: function (e) {
    var target = e.currentTarget.dataset.hourIndex;
    var selectDay = getTimestamps(curYear, curMonth + 1, curDay, target, target >= 23 ? target + 1 : target + 2);
    console.log(selectDay);
  },
  submit: function () {
    var _this = this;
    wx.request({
      url: 'https://www.chengfpl.com/weili/user/create/participation',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      data: {
        openId: _this.data.openId,
        activityId: _this.data.activityId,
        time: '2018-05-23 00:00:00_2018-05-23 24:00:00'
      },

      complete: function (res) {
        //dismiss进度条
        wx.hideLoading()
      },
      success: function (res) {
        //跳转
        if (res.statusCode == 200) {
          console.log(res)
        }

      },
      fail: function (res) {
        //tips
        wx.showToast({
          title: '发起活动失败',
        })
      }
    })
  },
});