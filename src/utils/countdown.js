import moment from 'moment'

let countdownInterval
const interval = 1000

/**
 * 订单付款截止时间剩余，截止时间为创建订单后的2个小时
 *
 * @param {String} createTime order create time
 */
export function orderPayEndDuration (createTime,hoursNum=2) {
  if (!createTime) return
   const diffTime = moment(createTime).add('hours', hoursNum).diff(moment(),'milliseconds')
  if (diffTime < 0) {
    // 已过期，返回空值
    return
  }

  return moment.duration(diffTime, 'milliseconds')
}

export function startCountdown (duration, callback) {
  countdownInterval = setInterval(_ => {
    if (duration - interval < 0) {
      stopCountdown()
      callback()
      return
    }

    duration = moment.duration(duration - interval, 'milliseconds')
    callback(duration)
  }, interval)
}

export function stopCountdown () {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
}
