# zhulogic-design-top
## 组件之间传值 采用全局变量
```js
import VueEventProxy from 'vue-event-proxy'
//全局事件代理
Vue.use(VueEventProxy)
```
```js   global-events.js
const prefix = 'global:'

export default {
  // 商品规格状态
  SKU_STATUS: `${prefix}SKU_STATUS`,
  
}

```
```js
mounted(){
    this.$on(GE.SKU_STATUS, ()=>{
      console.log('123')
    })

  }
```
```js
 methods:{
    onClickBigBtn(){
      this.$emit(GE.SKU_STATUS)
    }
  }
```


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
