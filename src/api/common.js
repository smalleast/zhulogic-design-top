export const imgBaseUrl = process.env.VUE_APP_IMAGE_BASE_URL
export function constructQueryParams(params) {
  let url = constructUrl(params);
  return url.slice(0, url.length - 1);
}
function constructUrl(params = "") {
  if (typeof params != "object") {
    return "";
  }
  let url = "?";
  for (let key in params) {
    let value = params[key];
    if (typeof value == "object") {
      url += constructUrl(value).replace("?", "");
    } else if (value || value === 0) {
      url = `${url}${key}=${value}&`;
    }
  }
  return url;
}
export function deconstructUrl(url = "") {
  if (!url.includes("?")) {
    return;
  }
  let params = {};
  let arr = url.split("?")[1].split("&");
  arr.forEach(function(item) {
    let entries = item.split("=");
    params[entries[0]] = decodeURI(entries[1]);
  });
  return params;
}
export function getLocationSearch() {
  if (!window.location.search) {
    return {};
  }
  return deconstructUrl(window.location.search);
}
export function updateLocationHref(filter) {
  window.history.pushState(
    {},
    "",
    window.location.href.split("?")[0] + this.constructQueryParams(filter)
  );
}

export function convertDateToString(value,type) {
  if (!value) {
    return "";
  }
  let d = new Date(value);
  let year = d.getFullYear();
  let month = "0" + (d.getMonth() + 1);
  let day = "0" + d.getDate();
  let hour = "0" + d.getHours() + "";
  let minutes = "0" + d.getMinutes() + "";
  let seconds = "0" + d.getSeconds() + "";
  if(type == 'date'){
    return  year +
      "-" +
      month.substr(-2, 2) +
      "-" +
      day.substr(-2, 2)
  }else{
    return (
      year +
      "-" +
      month.substr(-2, 2) +
      "-" +
      day.substr(-2, 2) +
      " " +
      hour.substr(-2, 2) +
      ":" +
      minutes.substr(-2, 2) +
      ":" +
      seconds.substr(-2, 2)
    );
  }
}
export function convertStringToDate(value) {
  return new Date(decodeURIComponent(value));
}
export function dataToTree(a, idStr, pidStr, chindrenStr) {
  let r = [],
    hash = {},
    id = idStr,
    pid = pidStr,
    children = chindrenStr,
    i = 0,
    j = 0,
    len = a.length;
  for (; i < len; i++) {
    hash[a[i][id]] = a[i];
  }
  for (; j < len; j++) {
    let aVal = a[j],
      hashVP = hash[aVal[pid]];
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = []);
      hashVP[children].push(aVal);
    } else {
      r.push(aVal);
    }
  }
  return r;
}
export function fixedTo(value, digit = 2) {
  let val = value.toFixed(digit + 1);
  return Number(val.substring(-2, Number(val.length - 1)));
}
