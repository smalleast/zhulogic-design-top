import axios from 'axios'
import GE from '@/constants/global-events'

export default class {
  /**
   * @param {Vue Instance} vm
   */
  constructor (vm, order) {
    this.vm = vm
    this.order = order
  }

  /**
   * 确认收货
   */
  confirmReceipt () {
    const orderId = this.order.id
    this.vm.$confirm('确认收货？').then(_ => {
      axios
        .post('/im_api/orders/confirm_receipt', {
          orderId
        })
        .then(_ => {
          this.vm.$emit(GE.REFRESH_ORDER_LIST)
          this.vm.$emit('refresh')
        })
    })
  }

  /**
   * 取消订单
   */
  cancel () {
    const orderId = this.order.id
    this.vm.$confirm('确认取消订单？').then(_ => {
      axios
        .post('/im_api/orders/channel', {
          orderId
        })
        .then(_ => {
          this.vm.$emit(GE.REFRESH_ORDER_LIST)
          this.vm.$emit('refresh')
        })
    })
  }

  /**
   * 提醒发货
   *
   * @param {Vue Instance} vm
   */
  remindTheDelivery () {
    this.vm.$message({
      type: 'success',
      message: '提醒发货成功'
    })
  }

  /**
   * 立即付款
   *
   * @param {RealPay} realPay 订单实付款
   */
  payNow (realPay) {
    const { order } = this
    const query = {
      ...realPay,
      orderId: order.id,
      orderNo: order.code,
      createTime: order.createTime
    }

    this.vm.$router.push({
      path: '/order/pay',
      query
    })
  }

  /**
   * 打开查看物流弹窗
   */
  openDialogLogistics () {
    const [product] = this.order.products
    axios.get(`/im_api/orders/express/${this.order.id}`, { maskRequest: true }).then(response => {
      this.vm.$emit(GE.OPEN_DIALOG_LOGISTICS, product, response.data)
    })
  }

  detail () {
    this.vm.$router.push(`/me/orders/${this.order.id}`)
  }

  afterSales () {
    this.vm.$message({
      type: 'success',
      message: '申请售后服务'
    })
  }
}
