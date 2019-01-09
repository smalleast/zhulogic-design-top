/**
 * 终端数据传输工具类，token信息的获取
 *
 * @author Hooks Huang
 */

import GE from '@/constants/global-events'
import GU from '@/constants/global-utils'

//呼起APP应用的功能
export default {
  toggleTerminal(inType,_objC){
    if (GU.browser.versions.ios) {
      window.webkit.messageHandlers.iOS_ZLGAPP.postMessage({
        type: inType,
        objc:_objC
      });
    } else if (GU.browser.versions.android) {
      let params = {
        type: inType,
        objc: _objC
      };
      //安卓需要强类型String
      window.android.ANDROID_ZLGAPP(JSON.stringify(params));
    }
  }
} 