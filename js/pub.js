"use strict";

function _axios() {
  var para = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    url: url,
    json: json,
    fn: fn
  };

  $.ajax({
    type: "POST",
    url: para.url,
    contentType: "application/json",
    cache: true,
    async: true,
    data: para.json,
    dataType: 'json',
    success: function success(res) {
      if (para.fn) {
        para.fn(res);
      }
    },
    error: function error(err) {
      //请求出错处理
      console.error(err.statusText);
      // alert("出情况了");
    }
  });
}
// var baseURL = "http://192.168.3.123:82/medicalcare/";
//oracle版本
var baseURL = "http://192.168.2.107:81/CCL/";

var webSocket_url = "ws://192.168.35.246:80/medicalcare/";
var playURL = "http://192.168.2.124:8080/play-control/";

// var url = "http://192.168.3.135:8081/play-control/"
// var webSocket_url = baseURL
var url = baseURL
var api = {
  // departmentList: baseURL + 'department/list_page',
};
var pub = {
  // 公共接口地址
  _url: baseURL,
  // 详细接口api地址
  _DetailApi: {
    studentReg: "student/reg",//学生注册
    studentList:"api/listDictionary",//字典列表
    studentLogin:"student/login",//学生登陆
    studentInfo:"student/studentInfo",//学生信息查询
    studentJoin:"student/joinTeam",//学生加入实验
    studentEdit:"student/editStudent",//学生修改信息
    studentListTest:"student/listTestReportPage",//学生成绩
    videoFile:"api/fileUp",//上传视频
    studentVideo:"api/makeShortVideo",//上传视频
    videoList:"api/listShortVideoPage",//视频列表
    deleteVideo:"api/delExperimentRecords",//删除视频
    makeSoftArticle:"api/makeSoftArticle",//富文本编辑器提交内容
    flieup:"api/fileUpload",
    listSoftArticle:"api/listSoftArticlePage",//查询学生实验软文记录分页
    findSoftArticle:"api/findSoftArticle",//查询学生实验软文记录
    listGoods:"api/listGoodsDictionary",//商品列表
    saveShop:"api/makeShopStatic",//保存首页配置
    findShop:"api/findShopConfigure",//查询配置
    findShopDetail:"api/findShopDetails",//首页预览获取数据
    listShop:"api/listShopPage",//学生实验分页列表
    saveBonus:"api/saveBonusPoints",//新增 or 减少 点赞
  },
  /**
   * op 形参
   * @param {*} that this指向
   * @param {*} _url 公共接口地址
   * @param {*} ur 具体接口地址
   * @param {*} data 形参
   * @param {*} cbk 回调
   */
  _InitAjax(op) {
    $.ajax({
      type: "POST",
      // timeout : 1000, //超时时间设置，单位毫秒
      contentType: "application/json",
      url: op._url + op.ur,
      data: JSON.stringify(op.data),
      error: function (request) {

      },
      success: function (res) {
        op.cbk(res);
      },

      fail: function (r) {


      }
    });
  },
  _InitAxios(op) {
    var _op = op;
    axios({
      url: op._url + op.ur,
      method: "post",
      data: JSON.stringify(op.data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function (res) {
        _op.cbk(res.data);
      })
      .catch(function (cat) {

      });
  },

  /**
   *  截取页面链接中的参数
   *  window.location
   *  window的location对象
   *  search
   *  得到的是url中query部分
   *  substr()
   *  返回一个从指定位置开始的指定长度的子字符串
   *  这里设置为1，是为了把url中的?号去掉
   *  split()
   *  将一个字符串分割为子字符串，然后将结果作为字符串数组返回
   *  这里就是把query部分以&为分割符，分割
   */
  _LinkParm: function (variable) {
    var query = window.location.search.substring(1);//截取查询字符串?后面的参数
    // console.log(variable);
    console.log(query)
    var vars = query.split("&");   // 用&符号将其分割起来
    // console.log(vars);
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      // console.log(pair);
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
    var query1 = window.location.search.s;
  },

  /**
   * @param {*} event 输入框的值
   * @param {*} tgt 输入框绑定的值
   */
  _CheckPhone(event, tgt) {

    var phone = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
    if (!phone.test(tgt)) {
      alert("输入正确的手机号！");
      tgt = "";
    }
  },

  /**
   * 数组转对象
   */
  _change_obj(arr) {
    var _obj = {};
    for (var it = 0; it < arr.length; it++) {
      for (var item in arr[it]) {
        _obj[item] = arr[it][item];
      }
    }
    return _obj;
  },

  /**
   *
   * @param {*} old_r 原有数组
   * @param {*} new_r 新数组 需要连接到原有数组之上
   */
  _Arr_concat(old_r, new_r) {
    var arr = old_r;
    var _r = new_r;
    var _c = arr.concat(_r);
    old_r = _c;

    return old_r;
  },

  /**
   * 判断是否为空字符串
   * @param {*} obj  传入形参 即需要判断的字符串
   */
  _isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
      return true;
    } else {
      return false;
    }
  }

};
//获取URL参数
function getQueryVariable(variable) {
  var index;
  var query = window.location.search.substring(1);
  console.log(query);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
		  console.log(i);
    if (pair[0] == variable) { index = i }
  }
  console.log(index)
  if (index >= 0) {
    return vars[index].split("=")[1];
  } else {
    return "";
  }
}