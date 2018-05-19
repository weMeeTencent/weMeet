const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function time2Stamp(time) {
  console.log("时间戳：" + time)
  const date = new Date(time);
  const stamp = Date.parse(date)
  console.log("时间戳：" + stamp)
  return stamp
}

function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}


function getCurrentPageUrl() {
  var pages = getCurrentPages();    //获取加载的页面
  var currentPage = pages[pages.length - 1];    //获取当前页面的对象
  var options = currentPage.options
  // var url = currentPage.route
  return options;
}


module.exports = {
  getCurrentPageUrl: getCurrentPageUrl,
  json2Form: json2Form,
  formatTime: formatTime,
  time2Stamp: time2Stamp
}
