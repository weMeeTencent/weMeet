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

module.exports = {
  formatTime: formatTime,
  time2Stamp: time2Stamp
}
