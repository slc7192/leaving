// var request = axios.create({
//     baseURL: 'http://teashop.yanxukj.com/malls/',
//     baseURL:'http://teashop.yanxukj.com/evaluationscore/'
// })
// 商城接口
const good_baseURL = 'http://teashop.yanxukj.com/malls/';
// const good_baseURL = 'http://192.168.35.246:81/malls/';
// const good_baseURL = 'http://192.168.1.110:80/malls/';
// const good_baseURL = 'http://192.168.1.123:83/malls/';


// 预约接口
// const reserve_baseURL = 'http://192.168.1.110:80/reserve/';
const reserve_baseURL = 'http://teashop.yanxukj.com/reserve/';

// 评论接口
// const comment_baseURL = 'http://teashop.yanxukj.com/evaluationscore/';
const comment_baseURL = 'http://teashop.yanxukj.com/malls/'
// const comment_baseURL = 'http://192.168.1.123/evaluationscore/';
// 

// 优惠券接口
// const coupon_baseURL ="http://192.168.1.116:8080/coupon/"
const coupon_baseURL ="http://www.sellglobal.cn/rose-33/"


//支付接口(本地)
const Pay_baseURL= 'http://www.sellglobal.cn/rose-33/';
// const Pay_baseURL= 'http://www.sellglobal.cn/rose-33/';
// ssy
const api_link = {
    api_findCustomer: good_baseURL + 'api/findCustomer', // 查询用户信息
    api_editCustomer: good_baseURL + 'api/editCustomer', // 保存用户信息
    imgUploadPost: good_baseURL + 'api/imgUploadPost', // 上传图片
    plu_sendSms: good_baseURL + 'api/sendSms', // 发送验证码
    plu_isSendSms: good_baseURL + 'api/isSendSms', // 验证手机号
    api_loginOnCustomer: good_baseURL + 'api/loginOnCustomer', // 用户登录
    api_addCustomer: good_baseURL + 'api/addCustomer', // 用户注册
    api_resetCustomer_password: good_baseURL + 'api/resetCustomerPassword'
}

function _axios({
    that,
    tk,
    api,
    cbk,
    data
}) {
    axios.defaults.headers.token = tk;
    axios.post(api, data).then(res => {
        // console.log('函数返回值', res)
        cbk(res.data)
    })
}

// dyp
function bord(obj={title:'',msg:'',api:'',mess:{},tag:true,url:''}){
    const alertmsg = window.document.createElement("div");
    alertmsg.className = "leave_message";
    let str='';
    if(obj.tag){
     str=`<div class="message">
    <div class="message_title">
        <span>${obj.title}</span>
        <img src="../img/order/close.png" alt="">
    </div>
    <div class="message_txt">
        <p><span>${obj.msg}</span></p>
        <div class="btn_group">
            <b class="handler fir handler_ensure">确认</b>
            <b class="handler handler_cancel">取消</b>
        </div>
    </div>
    </div>`;
}else{
        str=`<div class="message">
        <div class="message_title">
            <span>${obj.title}</span>
            <img src="../img/order/close.png" alt="">
        </div>
        <div class="message_txt">
            <p><span>${obj.msg}</span></p>
            <div class="btn_group">
                <b class="handler fir handler_ensure">确认</b>
            </div>
        </div>
        </div>`;
    }
            alertmsg.innerHTML = str;
            window.document.body.append(alertmsg);
            const closeTag = alertmsg.getElementsByTagName('img')[0]
            const ensure = alertmsg.getElementsByClassName('handler_ensure')[0]
            if(obj.tag){
                const btn_cancel = alertmsg.getElementsByClassName('handler_cancel')[0];
                btn_cancel.onclick = function () {
                    window.document.body.removeChild(alertmsg);
                }
            }
            closeTag.onclick = function () {
                window.document.body.removeChild(alertmsg);
            }
                ensure.onclick = function () {
                    window.document.body.removeChild(alertmsg);
                   if(obj.api||obj.dept||obj.order){
                    axios.post(obj.api,obj.mess).then(res => {
                        if (res.data.stateCode == '200') {
                            window.history.go(0);
                        }
                    })
                   }else if(obj.url){
                       if(obj.url=="nojump"){
                       }else if(obj.url=='-1'){
                        window.history.go(-1)
                       }else{
                        window.location.href = obj.url
                       }
                   }else{
                    window.history.go(0);
                   }
                   
                }
}