import Toast from 'react-native-root-toast'
import { NavigationActions } from 'react-navigation';
export const isBottom = (e: any) => {
  var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
  var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
  var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
  if (offsetY + oriageScrollHeight >= contentSizeHeight - 10){  //10来源于底部的loading文本加了paddingBottom：10
    return true
  } else {
    return false
  }
}

export const formatFiat = (num, precision:number=2) => {
  var parts;
  // 判断是否为数字
  if (!isNaN(parseFloat(num)) && isFinite(num)) {
      // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
      // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
      // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
      // 的值变成了 12312312.123456713
      num = Number(num);
      // 处理小数点位数
      num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
      // 分离数字的小数部分和整数部分
      parts = num.split('.');
      // 整数部分加[separator]分隔, 借用一个著名的正则表达式
      parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (','));

      return parts.join('.');
  }
  return NaN;
}

export const formatCurrency = (num, precision:number=6) => {
  if (!isNaN(parseFloat(num)) && isFinite(num)) {
    num = Number(num);
    num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
    return parseFloat(num).toString()
  }
}

export const formatDate = (dateObj, config: {year?: boolean, time?: boolean, minuteOver?: boolean, timezone?: string} = {year: false, time: false, minuteOver: false}) => {
  if (config.timezone === '0') {
    // dateObj = Date.parse(new Date(dateObj) as any)
    dateObj = new Date(Date.parse(new Date(dateObj) as any) - 8*60*60*1000)
  } else {
    dateObj = new Date(dateObj)
  }
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth() + 1 < 10? `0${dateObj.getMonth() + 1}`: `${dateObj.getMonth() + 1}`
  const date = dateObj.getDate() < 10? `0${dateObj.getDate()}`: `${dateObj.getDate()}`
  const hour = dateObj.getHours()  < 10? `0${dateObj.getHours()}`: `${dateObj.getHours()}`
  const minute = dateObj.getMinutes()  < 10? `0${dateObj.getMinutes()}`: `${dateObj.getMinutes()}`
  const second = dateObj.getSeconds()  < 10? `0${dateObj.getSeconds()}`: `${dateObj.getSeconds()}`
  let result = ``
  if (config.year) {
    result = `${year}-${month}-${date}`
  } else {
    result = `${month}-${date}`
  }
  if (config.time) {
    result = `${year}-${month}-${date} ${hour}:${minute}:${second}`
  }
  if (config.minuteOver) {
    result = `${month}-${date} ${hour}:${minute}`
  }
  return result
}

export const expireTime  = (startDate, endDate) => {
  startDate = new Date(startDate)
  endDate = new Date(endDate)
  let curDate = new Date() as any
  let expireNumber = parseInt((endDate - curDate).toString())
  let isEnd = parseInt((endDate - curDate).toString()) < 0
  let isStart = parseInt((curDate - startDate).toString()) > 0
  let second = '00'
  let minute = '00'
  let hour = '00'
  if (isStart && !isEnd) {
    let hourTmp = parseInt((expireNumber / 1000 / 60 / 60).toString())
    hour = hourTmp < 10? `0${hourTmp}`: `${hourTmp}`

    let minuteTmp = parseInt((expireNumber / 1000 % 3600 / 60).toString())
    minute = minuteTmp < 10? `0${minuteTmp}`: `${minuteTmp}`
    
    let secondTmp = parseInt((expireNumber / 1000 % 60).toString())
    second = secondTmp < 10? `0${secondTmp}`: `${secondTmp}`
  }
  return {hour, minute, second}
}

export const nextBroadcaseTime = () => {
  let hours = new Date().getHours()
  if (hours === 23) {
    return '00:00'
  }
  return `${hours + 1}:00`
}

export const inputFloat = (obj: string): string => { 
  obj = obj.replace(/[^\d.]/g, "");
  //必须保证第一位为数字而不是.
  obj = obj.replace(/^\./g, "");
  //保证只有出现一个.而没有多个.
  obj = obj.replace(/\.{2,}/g, ".");
  //保证.只出现一次，而不能出现两次以上 
  obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  return obj;
}

export const inputInt = (obj: string): string => { 
  return obj.replace(/[^\d]+/, '')
}

export const showToast = (msg: string) => {
  Toast.show(msg, {
    position: 0,
    duration: Toast.durations.LONG
  })
}

export const encryption = (data: string, bytes: number) => {
  if (data.length < bytes) {
    return data
  }
  const centerIndex = Math.floor(data.length / 2)
  let startIndex = centerIndex - Math.floor(bytes / 2)
  let endIndex = centerIndex + Math.floor(bytes / 2)
  let dataArrayTmp = data.split('')
  for (let i = startIndex; i <= endIndex; i++) {
    dataArrayTmp[i] = '*'
  }
  return dataArrayTmp.join('')
}

export const uploadImage = (params) => {
  let common_url = 'http://api.vocx.io/common/img/upload';  //服务器地址
  return new Promise(function (resolve, reject) {
      let formData = new FormData();
      let file = {uri: params.uri, type: params.type, name: params.fileName};
      formData.append("file", file);
      console.log('formData', formData)
      fetch(common_url, {
          method: 'POST',
          headers: {
              'Content-Type': 'multipart/form-data'
          },
          body: formData,
      }).then((response) => response.json())
          .then((responseData)=> {
              console.log('uploadImage', responseData);
              resolve(responseData);
          })
          .catch((err)=> {
              console.log('err', err);
              reject(err);
          });
  });
}

// 函数防抖
let isCalled = false, timer;
export const debounce = (functionTobeCalled, interval = 600) => {
  if (!isCalled) {
      isCalled = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
          isCalled = false;
      }, interval);
      return functionTobeCalled();
  }
};

export const resetNavigation = ( targetRoute ) => {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: targetRoute }),
    ],
  });
  return resetAction
}

export const AppConfig = {
  fixedFee: 0.005,
  version: '1.2.0',
  currencyPrecision: 6
}