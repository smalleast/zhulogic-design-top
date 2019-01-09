/**
 * 全局事件常量, 用于跨多级组件的事件传递
 * https://github.com/jser-club/vue-event-proxy
 *
 * @author Hooks Huang
 */
const prefix = 'global:'

export default {
  // 登录TOKEN
  MALL_TOKEN: `${prefix}MALL_TOKEN`,
  // 页面loading
  MALL_LOADING: `${prefix}MALL_LOADING`,
  // 商品规格状态
  SKU_STATUS: `${prefix}SKU_STATUS`,
  //商品规格的数量
  SKU_NUM: `${prefix}SKU_NUM`,
  //商品规格的信息
  SKU_DESC: `${prefix}SKU_DESC`,
  //商品下单专享（需要在住逻辑下过一次单）
  SKU_BUY: `${prefix}SKU_BUY`,
  //商品收货地址ID
  ADDRESS_ID: `${prefix}ADDRESS_ID`,
  //商品付款方式
  PRODUCT_PAY_METHOD: `${prefix}PRODUCT_PAY_METHOD`,
  //商品买家留言
  PRODUCT_BUY_MESSAGE: `${prefix}PRODUCT_BUY_MESSAGE`,
  //商品付款方式
  PAY_TYPE: `${prefix}PAY_TYPE`,
  //订单状态
  ORDER_STATUS: `${prefix}ORDER_STATUS`,
  //商品评价内容
  COMMENT_MESSAGE: `${prefix}COMMENT_MESSAGE`,
  //商品评价图片
  COMMENT_IMAGE: `${prefix}COMMENT_IMAGE`,
  //页面标题title
  MALL_TITLE: `${prefix}MALL_TITLE`,
  //点击按钮后刷新数据
  ORDER_REFRESH: `${prefix}ORDER_REFRESH`,
  //操作物流弹框
  ORDER_EXPRESS: `${prefix}ORDER_EXPRESS`,
  //操作订单服务协议框
  ORDER_SERVICE: `${prefix}ORDER_SERVICE`,
  //收货地址选择
  ORDER_ADDRESS: `${prefix}ORDER_ADDRESS`,
  //刷新默认收货地址
  ORDER_ADDRESS_REFRESH: `${prefix}ORDER_ADDRESS_REFRESH`,
  //收货地址编辑
  ORDER_ADDRESS_EDIT: `${prefix}ORDER_ADDRESS_EDIT`,
  //刷新地址列表
  ORDER_ADDRESS_EDIT_REFRESH: `${prefix}ORDER_ADDRESS_EDIT_REFRESH`,
}
