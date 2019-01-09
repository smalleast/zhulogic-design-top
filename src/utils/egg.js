/**
 * 恐龙蛋工具类，计算恐龙蛋抵扣和订单总价、自动选择兑换方式等
 *
 * @author Hooks Zhang
 */
import { EGG_EXCHARGE_RATE, EXCHANGE_MODE } from '@/constants'

/**
 * 订单实付款，恐龙蛋 + 人民币
 */
export class RealPay {
  constructor (egg, money) {
    this.egg = egg
    this.money = money
  }
}

/**
 * 恐龙蛋换算金额产生小数时采用四舍五入保留两位小数。
 *
 * @param {Number} egg 恐龙蛋数量
 */
export function eggToMoney (egg) {
  return Number(egg / EGG_EXCHARGE_RATE).toFixed(2)
}

/**
 * 金额换算恐龙蛋产生小数时采用进1法取整。
 *
 * @param {Number} money 金额
 */
export function moneyToEgg (money) {
  return Math.ceil(money * EGG_EXCHARGE_RATE)
}

/**
 * 订单总计人民币，件数 * 单价
 *
 * @param {Number} count 商品件数
 * @param {Number} price 商品单价
 */
export function orderTotalMoney (count, price) {
  return count * price
}

/**
 * 计算单个商品实付金额，恐龙蛋和人民币
 *
 * @param {Number} exchangeMode 兑换方式
 * @param {Number} price 商品单价
 * @param {Number} balance 用户恐龙蛋余额
 */
export function realPaySingle (exchangeMode, price, balance) {
  switch (Number(exchangeMode)) {
    case EXCHANGE_MODE.EGG:
      return new RealPay(price * EGG_EXCHARGE_RATE, 0)
    case EXCHANGE_MODE.GROUP:
      let egg = balance
      let money = price - eggToMoney(balance)
      const totalPriceEgg = price * EGG_EXCHARGE_RATE

      // 边界值，实付恐龙蛋数量是否大于总价
      if (egg > totalPriceEgg) egg = totalPriceEgg
      // 边界值，实付金额是否小于 0
      if (money < 0) money = 0

      return new RealPay(egg, money)
    case EXCHANGE_MODE.MONEY:
      return new RealPay(0, price)
    default:
      return new RealPay(0, 0)
  }
}

/**
 * 实付恐龙蛋总数，单个商品实付的恐龙蛋数量 * 件数
 * 注意当前恐龙蛋余额的边界
 *
 * @param {RealPay} realPaySingle
 * @param {Number} count 商品件数
 * @param {Number} balance 恐龙蛋余额
 */
export function realPayTotalEgg (realPaySingle, count, balance) {
  const { egg } = realPaySingle
  let totalEgg = egg * count
  // 边界
  if (balance < totalEgg) totalEgg = balance
  return totalEgg
}

/**
 * 根据商品总数，单价计算订单实付款
 *
 * @param {Number} count 商品总数
 * @param {Number} price 商品单价
 * @param {Number} balance 用户恐龙蛋余额
 */
export function realPayTotalByCountAndPrice (count, price, balance) {
  const totalPrice = count * price

  if (balance === 0) {
    return new RealPay(0, totalPrice)
  }

  const discountMoney = eggToMoney(balance)
  // 如果可以全额恐龙蛋支付
  if (discountMoney > totalPrice) {
    return new RealPay(
      // 刚好够用恐龙蛋支付有可能是四舍五入才够的，使用用户本身的恐龙蛋余额作为实付
      discountMoney === totalPrice ? balance : totalPrice * EGG_EXCHARGE_RATE,
      0
    )
  }

  return realPayTotal(balance, totalPrice, discountMoney)
}

/**
 * 订单实付款
 *
 * @param {Number} realPayTotalEgg 订单实付总蛋数
 * @param {Number} totalPrice 订单总金额
 * @param {Number} discountMoney 抵扣金额
 */
export function realPayTotal (realPayTotalEgg, totalPrice, discountMoney) {
  // 订单实付款人民币：订单总计人民币 - 恐龙蛋抵扣金额
  return new RealPay(realPayTotalEgg, totalPrice - discountMoney)
}

/**
 * 自动选择兑换方式，商品详情页选择的是单个商品的兑换方式
 * 数量增加时，可能会导致兑换方式变更
 * @param {RealPay} realPayTotal 订单实付款
 */
export function autoExchangeMode (realPayTotal) {
  if (realPayTotal.money === 0) {
    return EXCHANGE_MODE.EGG
  }
  return realPayTotal.egg > 0 ? EXCHANGE_MODE.GROUP : EXCHANGE_MODE.MONEY
}
