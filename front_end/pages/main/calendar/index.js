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

// 早中晚时间划分
var HOUR_OF_DURATION = [[0, 8, 1], [8, 12, 2], [12, 14, 3], [14, 18, 4], [18, 24, 5]];

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

var arr24 = new Array(24);

var pageData = {
  dateData: {
    date: "",                //当前日期字符串
    arrDays: [],             //按月拆分的数组，存放日期信息
    arrWeeks: [],             //按星期拆分的数组，存放日期信息
    arrHours: arr24,             //按小时拆分的数组
  },
  hotList: [],
  checkbox: 0,
  selected: {},
  arrSelect: [],
  showFriend: false,
  activityId: '',
  openId: '',
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
var getSelectedStr = function (obj) {
  let arr = [];
  for (let item in obj) {
    let itemArr = [];
    for (let stamp in obj[item]) {
      itemArr.push(obj[item][stamp]);
    }
    arr.push(itemArr.join(';'));
  }
  return arr.join(';');
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
// 清洗hotList数据
// 月份天数表
var ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var gethotList = function (array, total) {
  let hotList = [];
  for(let i = 0; i < array.length; i++){
    for(let time in array[i]){
      hotList.push({
        alphabet: ALPHABET[i],
        stamp: time,
        date: time.slice(5, 7)+'月'+time.slice(8, 10)+'日 '+time.slice(11, 16)+'—'+time.slice(31, 36),
        rate: total <= 0 ? "0%" : (Math.round(array[i][time].length / total * 10000) / 100.00 + "%"),
        people: array[i][time],
      })
    }
  }
  return hotList;
}
// 点击事件
var refreshSelectData = function (item) {
  for (var q = 0; q < 42; q++) {
    if (pageData.dateData.arrDays[q]['item'] === item) {
      pageData.dateData.arrDays[q]['isSelected']['selectedDay'] = Boolean(pageData.selected[item] && pageData.selected[item]['day']);
      for (let j = 1; j <= 5; j++) {
        const value1 = Boolean(pageData.selected[item] && pageData.selected[item]['duration' + j]);
        pageData.dateData.arrDays[q]['isSelected']['selectedDuration' + j] = value1;
        if (value1) {
          pageData.dateData.arrDays[q]['isSelected']['selectedDay'] = true;
        };
      }
      for (let k = 0; k <= 23; k++) {
        const value2 = Boolean(pageData.selected[item] && pageData.selected[item]['hour' + k]);
        pageData.dateData.arrDays[q]['isSelected']['selectedHour' + k] = value2;
        if (value2) {
          pageData.dateData.arrDays[q]['isSelected']['selectedDay'] = true;
          for (let arr in HOUR_OF_DURATION) {
            if (k >= HOUR_OF_DURATION[arr][0] && k < HOUR_OF_DURATION[arr][1]) {
              pageData.dateData.arrDays[q]['isSelected']['selectedDuration' + HOUR_OF_DURATION[arr][2]] = true;
            }
          }
        }
      }
    }
  }
}

// 查看参与人数
var refreshJoinData = function () {
  switch (pageData.checkbox) {
    case 0:
      var res = pageData.monthJoinData;
      break;
    case 1:
      var res = pageData.weekJoinData;
      break;
    case 2:
      var res = pageData.dayJoinData;
      break;
    default:
      var res = pageData.monthJoinData;
  }
  if (pageData.checkbox === 0) {
    for (var n in res) {
      for (var resItme in res[n]) {
        for (var i = 0; i < 42; ++i) {
          if (pageData.dateData.arrDays[i]['item'] === resItme.slice(0, 10)) {
            pageData.dateData.arrDays[i]['joinNum'] = res[n][resItme].length;
          }
        }
      }
    }
  } else if (pageData.checkbox === 1) {
    for (var n in res) {
      for (var resItme in res[n]) {
        for (var i = 0; i < 42; ++i) {
          if (pageData.dateData.arrDays[i]['item'] === resItme.slice(0, 10)) {
            pageData.dateData.arrDays[i]['joinNum' + resItme.slice(10, 12)] = res[n][resItme].length;
          }
        }
      }
    }
  } else if (pageData.checkbox === 2) {
    for (var n in res) {
      for (var resItme in res[n]) {
        for (var i = 0; i < 42; ++i) {
          if (pageData.dateData.arrDays[i]['item'] === resItme.slice(0, 10)) {
            pageData.dateData.arrDays[i]['joinNum__' + resItme.slice(11, 13)] = res[n][resItme].length;
          }
        }
      }
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
    pageData.dateData.arrDays[i]['isSelected'] = {};
    pageData.dateData.arrDays[i]['i'] = i;
    pageData.dateData.arrDays[i]['isToday'] = Boolean(curYear === new Date().getFullYear() && curMonth === new Date().getMonth() && (i - offset + 1 === new Date().getDate()));
    pageData.dateData.arrDays[i]['isSelectable'] = isSelectable(pageData.dateData.arrDays[i]);
  }
  for (var i = 0; i < 42; ++i) {
    var item = pageData.dateData.arrDays[i]['item'];
    refreshSelectData(item);
  }
  refreshJoinData();
  pageData.dateData.weekNum = Math.ceil((getDayCount(curYear, curMonth) + offset) / 7);
  pageData.dateData.arrWeeks = pageData.dateData.arrWeeks.slice(0, pageData.dateData.weekNum)
  for (var i = 0; i < pageData.dateData.weekNum; ++i) {
    pageData.dateData.arrWeeks[i] = pageData.dateData.arrDays.slice(i * 7, i * 7 + 7);
  }

  pageData.dateData.curWeek = Math.ceil((curDay + offset) / 7);
  if (checkbox === 0) {
    pageData.dateData.date = [curYear + '年' + (curMonth + 1) + '月'];
  } else if (checkbox === 1) {
    pageData.dateData.date = [curYear + '年' + (curMonth + 1) + '月第' + pageData.dateData.curWeek + '周'];
  } else if (checkbox === 2) {
    pageData.dateData.date = [curYear + '年' + (curMonth + 1) + '月' + curDay + '日', getOffset() + curDay - 1];
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
        _this.setData({
          acitvityData: res.data.data,
          shareInfo: {
            title: res.data.data ? res.data.data.name : '',
            desc: res.data.data ? res.data.data.description : '',
            path: res.data.data ? '/pages/main/calendar/index?acitvityId=' + res.data.data.id : '',
          }
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
    return this.shareInfo;
  },
  getJoinData: function () {
    var _this = this;
    switch (_this.data.checkbox) {
      case 0:
        var url = 'https://www.chengfpl.com/weili/user/participation/day?activityId=' + this.data.activityId;
        break;
      case 1:
        var url = 'https://www.chengfpl.com/weili/user/participation/partofday?activityId=' + this.data.activityId;
        break;
      case 2:
        var url = 'https://www.chengfpl.com/weili/user/participation/hour?activityId=' + this.data.activityId;
        break;
      case 3:
        var url = 'https://www.chengfpl.com/weili/user/participation/interval?activityId=' + this.data.activityId;
        break;
      default:
        var url = 'https://www.chengfpl.com/weili/user/participation/day?activityId=' + this.data.activityId;
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
            pageData.monthJoinData = res.data.data,
            refreshJoinData();
            _this.setData({
              dateData: pageData.dateData,
              monthJoinData: pageData.monthJoinData,
            });
            break;
          case 1:
            pageData.weekJoinData = res.data.data,
            refreshJoinData();
            _this.setData({
              dateData: pageData.dateData,
              weekJoinData: pageData.weekJoinData,
            });
            break;
          case 2:
            pageData.dayJoinData = res.data.data,
            refreshJoinData();
            _this.setData({
              dateData: pageData.dateData,
              dayJoinData: pageData.dayJoinData,
            });
            break;
          case 3:
            pageData.hotList = gethotList(res.data.data.slice(0,5), _this.data.acitvityData.count)
            _this.setData({
              hotList: pageData.hotList,
            });
            break;
          default:
            pageData.monthJoinData = res.data.data,
            refreshJoinData();
            _this.setData({
              dateData: pageData.dateData,
              monthJoinData: pageData.monthJoinData,
            });
        }
      },
      fail: function (res) {
      }
    })
  },

  // // // // // // // // // // // // // // 
  //
  //            页面交互函数
  //
  // // // // // // // // // // // // // // 

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
  showMonth: function () {
    pageData.checkbox = 0;
    this.setData({
      checkbox: pageData.checkbox,
    })
    this.getJoinData();
    refreshPageData(curYear, curMonth, curDay, this.data.checkbox);
    this.setData({
      dateData: pageData.dateData,
    })
  },
  showWeek: function () {
    pageData.checkbox = 1;
    this.setData({
      checkbox: pageData.checkbox,
    })
    this.getJoinData();
    refreshPageData(curYear, curMonth, curDay, this.data.checkbox);
    this.setData({
      dateData: pageData.dateData,
    })
  },
  showDay: function () {
    pageData.checkbox = 2;
    this.setData({
      checkbox: pageData.checkbox,
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
    this.getJoinData();
  },
  selectDay: function (e) {
    var target = e.currentTarget.dataset.dayIndex;
    var item = getSelectedItem(target.year, target.month, target.day);
    if (target.isSelectable && target.isCurentMonth) {
      if (!pageData.selected[item]) {
        pageData.selected[item] = {};
      }
      if (target.isSelected.selectedDay) {
        delete pageData.selected[item];
      } else {
        pageData.selected[item]['day'] = getTimestamps(target.year, target.month, target.day, 0, 24);
        for (let i = 1; i <= 5; i++) {
          pageData.selected[item]['duration' + i] = getTimestamps(target.year, target.month, target.day, HOUR_OF_DURATION[i - 1][0], HOUR_OF_DURATION[i - 1][1]);
        }
        for (let i = 0; i <= 23; i++) {
          pageData.selected[item]['hour' + i] = getTimestamps(target.year, target.month, target.day, i, i + 1);
        }
      }
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
    var weekIndex = e.currentTarget.dataset.weekIndex;
    var item = getSelectedItem(target.year, target.month, target.day);
    if (target.isSelectable && target.isCurentMonth) {
      if (!pageData.selected[item]) {
        pageData.selected[item] = {};
      }
      if (pageData.selected[item]['duration' + weekIndex]) {
        delete pageData.selected[item]['duration' + weekIndex];
        for (let hour = HOUR_OF_DURATION[weekIndex - 1][0]; hour < HOUR_OF_DURATION[weekIndex - 1][1]; hour++) {
          delete pageData.selected[item]['hour' + hour];
        }
      } else {
        pageData.selected[item]['duration' + weekIndex] = getTimestamps(target.year, target.month, target.day, HOUR_OF_DURATION[weekIndex - 1][0], HOUR_OF_DURATION[weekIndex - 1][1]);
        for (let hour = HOUR_OF_DURATION[weekIndex - 1][0]; hour < HOUR_OF_DURATION[weekIndex - 1][1]; hour++) {
          pageData.selected[item]['hour' + hour] = getTimestamps(target.year, target.month, target.day, hour, hour + 1);
        }
      }
      this.setData({
        selected: pageData.selected,
      })
      refreshSelectData(item);
      this.setData({
        dateData: pageData.dateData,
      });
    }
  },
  selectHour: function (e) {
    var hour = e.currentTarget.dataset.hourIndex;
    var item = getSelectedItem(curYear, curMonth + 1, curDay);
    if (isSelectable({ year: curYear, month: curMonth + 1, day: curDay })) {
      if (!pageData.selected[item]) {
        pageData.selected[item] = {};
      }
      if (pageData.selected[item]['hour' + hour]) {
        delete pageData.selected[item]['hour' + hour];
      } else {
        pageData.selected[item]['hour' + hour] = getTimestamps(curYear, curMonth + 1, curDay, hour, hour + 1);
      }
    }
    this.setData({
      selected: pageData.selected,
    })
    refreshSelectData(item);
    this.setData({
      dateData: pageData.dateData,
    });
  },
  clickHotList: function(e){
    let obj = {
      0: { 'stamp': e.currentTarget.dataset.obj.stamp}
    };
    this.setData({
      selected: obj,
    })
  },
  hideFriendSelected: function(){
    pageData.showFriend = !pageData.showFriend;
    this.setData({
      showFriend: pageData.showFriend,
    })
  },
  clearSelected: function(){
    pageData.selected = {};
    this.setData({
      selected: pageData.selected,
    })
    refreshPageData(curYear, curMonth, curDay, this.data.checkbox);
    this.setData({
      dateData: pageData.dateData,
    })
    console.log(pageData.dateData);
  },
  invite: function(){
    var _this = this;
    wx.navigateTo({
      // url: '../form/index',
      url: '../../me/invite/index?activityId='+_this.data.activityId,
    })
  },
  submit: function () {
    var _this = this;
    var time = getSelectedStr(this.data.selected);
    wx.request({
      url: 'https://www.chengfpl.com/weili/user/create/participation',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      data: {
        openId: _this.data.openId,
        activityId: _this.data.activityId,
        time: time,
      },

      complete: function (res) {
        wx.hideLoading()
      },
      success: function (res) {
        wx.showToast({
          title: '成功',
        })
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