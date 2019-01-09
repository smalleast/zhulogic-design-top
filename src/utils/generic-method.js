/**
 * 通用方法工具类
 *
 * @author Hooks Huang
 */
import Vue from 'vue';
import GE from '@/constants/global-events'
import { IMAGE_BASE_URL } from '@/constants'
import { ImagePreview } from 'vant';
Vue.use(ImagePreview);

export default {
  //全屏预览图片
  openPreview(lists, index) {
    let _images = lists.map(item => {
      return IMAGE_BASE_URL + item.key;
    });
    ImagePreview({
      images: _images,
      startPosition: index || 0,
      onClose() {
        // do something
      }
    });
  }
} 