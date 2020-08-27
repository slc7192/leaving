var index = new Vue({
  el:"#app",
  data:{
    options: [],
    activeName: 'first',
    dialogImageUrl: '',
    dialogImageUrl1: '',
    dialogImageUrl2: '',
    dialogVisible: false,
    dialogVisible1: false,
    dialogVisible2: false,
    input_cou:'',//logo店铺名称
    imageUrl:'',
    activeColor:'',
    actColor:'',
    index_s:'0',
    radio: '1',
    textarea:'',
    checked:false,
    tabledata:[],
    baseUrl:pub._url,
    // dictionary_name0:""
    // 宝贝主图
    goods_picture:'',
    goods_picture_list:[],
    fileList:[],
    // 基本信息
    id:'',
    student_id:'', //学生学号
    dept_id:'', //店铺编号
    template_id:'', //店铺模板编号
    goods_id:'', //商品编号
    shop_category_name:'',//宝贝名称
    goods_price:'', //商品价格
    goods_full1:'', //满
    goods_minus1:'', //减
    goods_full2:'', //满
    goods_minus2:'', //减
    goods_spec:'', //规格
    goods_val:'',
    goods_radio:'',//显示/不显示
    // 详情配置
    set_description:'',//包装说明
    set_qualification:'',//产品资质
    fileList1:[],
    set_detailsPic:'',//详情图
    fileList2:[],
    checkList:[],//评价等级
    check:'',//评价内容
    description_radio:'',
    qualification_radio:'',
    detailsPic_radio:'',
    evaluation_radio:'',
    checkList_radio:'',
    // 用户评价
    evaluation:[],
    student_id:'',//学生msg-id
    stepid:'',//
    logoimg:'',//logo图片
    step_name:'',//logo名字
    imurl:'',
    dw:''
  },
  created(){

    this.id=pub._LinkParm('id');
    this.dw=pub._LinkParm('dw');
    console.log(this.dw)
    this.stepid=pub._LinkParm('stepid');
    console.log(this.id,this.stepid)
    this.imurl=pub._url;
    this.student_id =JSON.parse(localStorage.getItem("msg")).student_id;
    this.findDetails();
    this.getinit();
  },
  methods:{
    // 商品预览页
    findDetails(){
      var _this = this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.findGoodsDetails,//商品详情接口
        data:{
          "id":_this.id,
        },
        cbk:function cbk(res){
          if(res.stateCode=="200"){
            console.log(11111,res);
            var data=res.data;
            // console.log(data);
            // 换色
            _this.index_s=data.index_s,
            _this.activeColor=data.activeColor;
            _this.actColor=data.actColor;
             // 宝贝主图
             _this.goods_id=data.goods.goods_id;
             _this.goods_name=data.goods_name;
             _this.goods_picture_list= data.goods_picture_list;
            //  console.log(_this.goods_picture_list)
             // 基础信息
             _this.shop_category_name=data.goods.shop_category_name;
             _this.goods_price=data.goods.goods_price;
             _this.goods_full1=data.goods.goods_full1;
             _this.goods_minus1=data.goods.goods_minus1;
             _this.goods_full2=data.goods.goods_full2;
             _this.goods_minus2=data.goods.goods_minus2;
             _this.goods_spec=data.goods.goods_spec;
             _this.goods_val=data.goods.goods_val;
             _this.goods_radio=data.goods.goods_radio;
             // 详情配置
             _this.tabledata=data.set.tabledata;
             _this.set_description=data.set.set_description;
             _this.set_qualification= pub._url+data.set.set_qualification;
             _this.set_detailsPic= pub._url+data.set.set_detailsPic;
             _this.description_radio=data.set.description_radio;
             _this.qualification_radio=data.set.qualification_radio;
             _this.detailsPic_radio=data.set.detailsPic_radio;
             //  用户评价
             _this.evaluation=data.evaluation;
             _this.evaluation_radio=data.set.evaluation_radio;
             _this.checkList_radio=data.set.checkList_radio;
             if(_this.index_s==1){
              $(".nav").removeClass("nav_s");
            }else{
              $(".nav").addClass("nav_s");
            }
          }
          if(_this.goods_radio=="1"){
            $('#nav_price').css('display','none');
          }else{
            $('#nav_price').css('display','block');
          }
          if(_this.description_radio=="1"){
            $('#bao').css('display','none');
          }else{
            $('#bao').css('display','block');
          }
          if(_this.qualification_radio=="1"){
            $('#zi').css('display','none');
          }else{
            $('#zi').css('display','block');
          }
          if(_this.detailsPic_radio=="1"){
            $('#miao').css('display','none');
          }else{
            $('#miao').css('display','block');
          }
          if(_this.evaluation_radio=="1"){
            $('#navc').css('display','none');
          }else{
            $('#navc').css('display','block');
          }
        }
      })
    },
    getinit(){
      var _this=this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.findShopDetail,
        data:{ 
          "id":_this.stepid,
          "student_id":_this.student_id
        },
        cbk:function cbk(res){
          if(res.stateCode=="200"){
            console.log(res.data);
            _this.logoimg=res.data.Logo.dialogImage;//logo照片
            _this.step_name=res.data.Logo.step_name;//logo名字
          }
        }
      });
    },
    goindex(){
      window.location.href='../index/index.html?id='+this.stepid;
    },
    shouYe(bol){
      console.log(bol)
      var backurl;
      if(bol){
        backurl="../html/details.html?student_id="+this.student_id;
      }else{
        backurl="../html/usecenter.html?student_id="+this.student_id+'#p1';
      }
      console.log(backurl)
      window.location.href=backurl;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 下拉选择框
    handleCommand(command) {
      this.$message('click on item ' + command);
    },
    // tabs
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  },
})