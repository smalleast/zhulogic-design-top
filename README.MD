#vue-backdrop
> Mint-ui(Vue2.x) widget vue-backdrop based on sass &amp; webpack.


## resource:
+ http://www.cnblogs.com/Kummy/p/4966937.html
+ https://github.com/steven5538/vue-button
+ https://yarnpkg.com/en/docs/install


## props:
| name | type | value | description |
| :----| :----| :----| :----|
| visible  | Boolean | true/false | v-show |
| cssClass  | String | any | none |
| backgroundColor  | String | #000/#FFF | default background-color |
| zIndex  | Number | 1/2/100 | z-index |
| opacity  | Number | 0.1-1 | opacity |
| position  | String | 'absolute/fixed' | css position |


## usage:
```html
<vue-backdrop :visible="true" />
```
