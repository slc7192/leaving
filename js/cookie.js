//设置cookie
function setCookie(name,value){
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
//获取cookie
function getCookie(name){
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg)){
      return unescape(arr[2]);
  }else{
      return null;
  }
}
//删除cookie 
function delCookie(name){
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval=getCookie(name);
  if(cval!=null){
      document.cookie= name + "="+cval+";expires="+exp.toGMTString();
  } 
}
//清除所有cookie
function clearAllCookie() {
  var date=new Date();
  date.setTime(date.getTime()-10000);
  var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
  console.log("需要删除的cookie名字："+keys);
  if (keys) {
      for (var i =  keys.length; i--;)
        document.cookie=keys[i]+"=''; expire="+date.toGMTString()+"; path=/";
  }
}