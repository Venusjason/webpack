//该文件定义公用js方法

/*
  浏览器信息
*/
export const BrowserInfo = {
  versions: function () {
    var u = navigator.userAgent,
      app = navigator.appVersion;
    return {
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核 webKit:
      gecko: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核 gecko:
      firefox: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad webApp:
      //u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) == " qq" //是否QQ
    };
  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

/*
  query参数解析
*/
export const getQueries = function (urlStr) {
  // 获取 URL 参数的值,并支持utf-8解码 返回一个对象
  urlStr = urlStr || window.location.href
  if (urlStr.indexOf('?') == -1) {
    console.error('url无过滤参数')
    return {}
  }
  let str = urlStr.split('?')[1] //获取url中"?"符后的字串
  if (str.substr(str.length - 1, 1) == '&') { //对最后一项如果多余& 截取
    str = str.substr(0, str.length - 1)
  }
  let theRequest = new Object();
  if (str.indexOf("?") == -1) {
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  }
  console.log(`获取参数键值对: `, theRequest)
  return theRequest
}

/*针对微信分享出链接异常拼接参数的处理
  如 http://192.168.1.83:3000/index.html?from=singlemessage#/game?showId=22
  对Url重新解析
*/
export const resetUrl = function (url = window.location.href) {
  let hrefArr = url.split('#'),
    newHref = hrefArr[0].split('?')[0] + '#'
  newHref += hrefArr[1]
  let queries = getQueries(hrefArr[0])
  for (let key in queries) {
    newHref += newHref.indexOf('?') > -1
      ? `&${key}=${queries[key]}`
      : `?${key}=${queries[key]}`
  }
  return newHref
}

/*
  生产环境与测试环境配置
*/
export const appConfig = function () {
  let arr = [
    {
      name: 'test',
      desc: '测试环境和开发环境参数配置',
      appid: 'wx8fc20b3cc2f7bba8',
      apiHost: 'http://temporary.birdjia.com/bird_dsp/act/'
    }, {
      name: 'test',
      desc: '生产环境参数配置',
      appid: 'wx34f0c9c5c44af4b5',
      apiHost: 'https://birdpush.com/act/'
    }
  ]
  return arr[0] //发布测试包和生产包 手动修改该选项
}