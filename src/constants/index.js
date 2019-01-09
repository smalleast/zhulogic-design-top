// 后台服务基础地址
export const API_BASE_URL = process.env.VUE_APP_API_BASE_URL
// Aliyun OSS 服务基础地址
export const OSS_BASE_URL = process.env.VUE_APP_OSS_BASE_URL
//图片访问基础地址
export const IMAGE_BASE_URL = process.env.VUE_APP_IMAGE_BASE_URL
//接口访问服务基础地址
export const AJAX_URL = process.env.VUE_APP_AJAX_URL
//判断环境
export const VUE_BROWSER = process.env.VUE_APP_BROWSER

// 恐龙蛋汇率，25个蛋抵1块钱
export const EGG_EXCHARGE_RATE = 25
//付款方式 payType (integer, optional): 支付类型(1:恐龙蛋,2:微信,3:支付宝) ,
export const PAY_TYPE={
  EGG:1,
  WECHAT:2,
  ALIPAY:3
}
// exchangeMode (integer, optional): 兑换方式(1:用恐龙蛋,2:钱和恐龙蛋组合,3:钱)
export const EXCHANGE_MODE = {
  EGG: 1,
  GROUP: 2,
  MONEY: 3
}
// payStatus (integer, optional): 支付状态(1:未支付,2:已支付,3:支付失败,4:退款中,5:已退款) 
export const PAY_STATUS = {
  WAIT_PAY: 1,
  PAY_SUCCESS: 2,
  PAY_FAILD: 3,
  PAY_REFUND: 4,
  REFUND_SUCCESS: 5
}
// status (integer, optional): 订单状态(1:待付款,2:待发货,3:待收货,4:待评价,5:已完成,6:已取消,7:已关闭) 
export const ORDER_STATUS = {
  WAIT_PAY: 1,
  WAIT_PACKAGE: 2,
  WAIT_RECEIVE_PACKAGE: 3,
  WAIT_COMMENT: 4,
  FINISHED: 5,
  CANCEL: 6,
  CLOSED: 7
}
// status (integer, optional): 订单状态(1:待付款,2:待发货,3:待收货,4:待评价,5:已完成,6:已取消,7:已关闭) ,
export const ORDER_STATUS_ICON = {
  WAIT_PAY: 'https://chain-apply.oss-cn-shanghai.aliyuncs.com/egg-mall/point-money.png',
  WAIT_PACKAGE: 'https://chain-apply.oss-cn-shanghai.aliyuncs.com/egg-mall/point-dabao.png',
  WAIT_RECEIVE_PACKAGE: 'https://chain-apply.oss-cn-shanghai.aliyuncs.com/egg-mall/point-bus.png',
  WAIT_COMMENT: 'https://chain-apply.oss-cn-shanghai.aliyuncs.com/egg-mall/point-success.png',
  FINISHED: 'https://chain-apply.oss-cn-shanghai.aliyuncs.com/egg-mall/point-message.png',
  CANCEL: 'https://chain-apply.oss-cn-shanghai.aliyuncs.com/egg-mall/point-cancel.png',
  CLOSED: 'https://chain-apply.oss-cn-shanghai.aliyuncs.com/egg-mall/point-close.png'
}
//默认显示的图片（COMMENT:评价的默认图片）
export const DEFAULT_ICON={
  COMMENT:'https://chain-apply.oss-cn-shanghai.aliyuncs.com/egg-mall/no-comment.png'
}
// UPLOAD_TYPE (integer, optional): 上传文件的type(39:用户评价上传的图片)
export const UPLOAD_TYPE = {
  EVALUATION: 39,
}
// BACK_LIST (string, optional): 需要回退到app的页面(MallList:商品列表，OrderList:订单列表)
export const BACK_LIST = ['MallList','OrderList']
//COUNTDOWN_DATE (integer, optional): 以小时计算 （待付款2小时，待收货30天=>换算成720小时）
export const COUNTDOWN_DATE={
  WAIT_PAY:2,
  WAIT_RECEIVE_PACKAGE:720
}