import Vue from "vue";
import { IMAGE_BASE_URL } from '@/constants'
import moment from 'moment'
Vue.filter('currency', function (value, _currency, decimals) {
    if (!isFinite(value) || !value && value !== 0) return '';
    _currency = _currency != null ? _currency : '$';
    decimals = decimals != null ? decimals : 2;
    let stringified = Math.abs(value).toFixed(decimals);
    let _int = decimals > 0 ? stringified.slice(0, -1 - decimals) : stringified;
    let i = _int.length % 3;
    let head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
    let _float = decimals > 0 ? stringified.slice(-1 - decimals) : '';
    let sign = value < 0 ? '-' : '';
    let digitsRE = /(\d{3})(?=\d)/g;
    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
});

Vue.filter('toDate', function (inValue, format = 'YYYY-MM-DD') {
    return inValue ? moment(inValue).format(format) : '';
});
Vue.filter('toDateTime', function (inValue, format = 'YYYY-MM-DD HH:mm:ss') {
    return inValue ? moment(inValue).format(format) : '';
});
Vue.filter('toImg', function (inValue) {
    return inValue ? IMAGE_BASE_URL + '/' + inValue : '';
})
Vue.filter('getDate', (value, type) => {
    if (!value) {
        return '-';
    }
    let d = new Date(value);
    let year = d.getFullYear();
    let month = '0' + (d.getMonth() + 1);
    let day = '0' + d.getDate();
    let hour = '0' + d.getHours() + '';
    let minutes = '0' + d.getMinutes() + '';
    let seconds = '0' + d.getSeconds() + '';
    if (type == 'date') {
        return year + '-' + month.substr(-2, 2) + '-' + day.substr(-2, 2)
    } else {
        return year + '-' + month.substr(-2, 2) + '-' + day.substr(-2, 2) + ' ' + hour.substr(-2, 2) + ':'
            + minutes.substr(-2, 2) + ':' + seconds.substr(-2, 2);
    }

});
Vue.filter('getLastDay', (value, type) => {
    if (!value) {
        return '-';
    }
    let d = new Date(value);
    let year = d.getFullYear();
    let month = '0' + (d.getMonth() + 1);
    let day = '0' + d.getDate();
    let hour = '0' + d.getHours() + '';
    let minutes = '0' + d.getMinutes() + '';
    let seconds = '0' + d.getSeconds() + '';
    if (type == 'date') {
        return year + '-' + month.substr(-2, 2) + '-' + day.substr(-2, 2)
    } else {
        return year + '-' + month.substr(-2, 2) + '-' + day.substr(-2, 2);
    }

});
//文件过滤
Vue.filter("toFile", function (key, len = 4) {
    if (!key) return
    let lastIndex = key.lastIndexOf(".");
    let preName = key.substring(0, lastIndex);//去除后缀名的文件名称
    let suffix = key.substring(lastIndex, key.length);//后缀名
    let name = preName.length > 4 ? key.substring(0, len) : preName;
    let filename = name + '..' + suffix;
    return filename;
});
//电话过滤
Vue.filter("toPhone", function (key, len = 2, lastLen = 2) {
    if (!key) return
    let suffix = key.substring(key.length - lastLen, key.length);//后缀名
    let name = key.substring(0, len);
    let _str = '';
    for (let i = 0; i < key.length - len - lastLen; i++) {
        _str += "*";
    }
    let filename = name + _str + suffix;
    return filename;
});
//名字过滤
Vue.filter("toName", function (key, len = 1, lastLen = 1) {
    if (!key) return
    if (key.length > 1) {
        let suffix = key.substring(key.length - lastLen, key.length);//后缀名
        let name = key.substring(0, len);
        let filename = name + '*' + suffix;
        return filename;
    }
    return key
});
//地址过滤
Vue.filter("toAddress", function (key) {
    if (!key) return
    return key.replace('[$]', '');
});
