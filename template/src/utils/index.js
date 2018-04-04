/*
 * @Author: jinxing@birdpush.com
 * @Date: 2018-04-04 17:56:12
 * @Last Modified by: jinxing@birdpush.com
 * @Last Modified time: 2018-04-04 17:57:55
 * @文件内封装公用函数和应用配置
 */

// 接口服务配置
const appConfigs = [
  {
    name: 'dev',
    appid: 'wx8fc20b3cc2f7bba8',
    apiHost: 'http://temporary.birdjia.com/bird_dsp/act/',
    otherApi: '/bird_dsp'
  }, {
    name: 'production',
    appid: 'wx34f0c9c5c44af4b5',
    apiHost: 'https://birdpush.com/act/',
    otherApi: ''
  }
]

export const appConfig = appConfigs[0]

export function GetQueries (urlStr) {
  // 获取 URL 参数的值,并支持utf-8解码 返回一个对象
  urlStr = urlStr || window.location.href
  if (urlStr.indexOf('?') === -1) {
    console.error('url无过滤参数')
    return {}
  }
  let str = urlStr.split('?')[1]
  if (str.substr(str.length - 1, 1) === '&') {
    // 对最后一项如果多余& 截取
    str = str.substr(0, str.length - 1)
  }
  let theRequest = {}
  if (str.indexOf('?') === -1) {
    var strs = str.split('&')
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
    }
  }
  console.log(`获取参数键值对: `, theRequest)
  return theRequest
}

// 对异常链接处理
export function DealErrHref (url = window.location.href) {
  // 微信分享后http://192.168.1.83:3000/index.html?from=singlemessage#/game?showId=22
  if (url.indexOf('.html?') > -1 && url.indexOf('#') > -1) {
    let hrefArr = url.split('#')
    let str1 = hrefArr[0].split('?')[0]
    let str2 = hrefArr[0].split('?')[1]
    let str77 = str1 + '#'
    str77 += hrefArr[1]
    str77 = str77.indexOf('?') > -1 ? str77 + '&' + str2 : str77 + '?' + str2
    return str77
  }
  return false
}