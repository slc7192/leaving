var index = new Vue({
  el:"#app",
  data:{
    goods:"",
    // indexbao:[
    //   {img:'../img/details/商品详情页.jpg',name:'宝贝一'}
    // ],
    indexshoe:[
      {img:'../img/details/商品详情页.jpg',name:'模板一'}
    ],
    indexlist:[
      {img:'../img/index/red.png',name:'红色',id:1},
      {img:'../img/index/blue.png',name:'蓝色',id:2},
    ],
    options: [],
    fileUp:pub._url+'/api/fileUp',
    value: '',
    isshow:false,
    isshow2:false,
    isshow3:false,
    isshow4:false,
    ischange:false,
    activeName: 'first',
    dialogImageUrl: '',
    dialogImageUrl1: '',
    dialogImageUrl2: '',
    dialogVisible: false,
    dialogVisible1: false,
    dialogVisible2: false,
    input_cou:'',//logo店铺名称
    imageUrl:'',
    activeColor:'#db2522',
    actColor:'#fff2f2',
    index_s:'0',
    // 单选框
    goods_radio: '',//基本信息
    description_radio:'',//包装说明
    qualification_radio:'',//产品资质
    detailsPic_radio:'',//详情图
    evaluation_radio:'',//用户评价
    checkList_radio:'',//评价等级
    textarea:'',
    checked:false,
    tabledata:[],
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
    goods_name:'', //商品名称
    goods_price:'', //商品价格
    goods_full1:'', //满
    goods_minus1:'', //减
    goods_full2:'', //满
    goods_minus2:'', //减
    goods_spec:'', //规格
    goods_val:'',
    // 详情配置
    dictionary_value:[],//产品参数
    set_description:'',//包装说明
    set_qualification:'',//产品资质
    fileList1:[],
    set_detailsPic:'',//详情图
    fileList2:[],
    checkList:[],//评价等级
    check:'',//评价内容
    hideUpload: false,
    limitCount:6,
    studentid:'',
    lasna:'',
    experiment:{},
    
  },
  created(){
    this.studentid=pub._LinkParm('student_id'); 
    this.lasna = localStorage.getItem("dept_id");//学生本身的店铺id
    
    console.log(this.slid);
    this.getinit();
    this.listGoods();
    this.findConfigure();
  },
  methods:{ 
    // 切换颜色
    change(bol,index){
      // console.log(bol,index);
      this.index_s=index;
      this.index_s==1 ? color='红色' : color="蓝色";
      this.$confirm(`是否确认模板颜色为${color}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.index_s==1 ? this.activeColor='#db2522': this.activeColor='#0365c6';
          this.index_s==1 ? this.actColor='#fff2f2': this.actColor='#b9dcff';
          this.$message({
            message: '配色选择成功',
            type: 'success'
          });
          this.save();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },

    href(tag){
      console.log(this.id,this.goods_id)
      if(tag){
        if(this.id==''){
          this.$message({
            message: '宝贝和店铺详情页模板不能为空',
            type: 'warning'
          });
          return;
        }
        
        window.open('../html/commdetails.html?id='+this.id+'&'+'stepid='+this.newid);
      }else{
        window.location.href='../html/usecenter.html?student_id='+this.studentid;
      }
      
    },

    // 左侧下拉框商品字典列表
    listGoods(){
      var _this = this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.listGoodsDictionary,//商品字典列表接口
        data:{},
        cbk:function cbk(res){
          if(res.stateCode=="200"){
            var data=res.data;
            _this.options=data;
          }
        }
      })
    },

    // findShop
    findShop(){
      var _this = this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.findShop,//商品字典列表接口
        data:{
          "student_id":_this.studentid,
          "dept_id":_this.lasna,
          'template_id':_this.template_id
        },
        cbk:function cbk(res){
          if(res.stateCode=="200"){
            _this.newid=res.data.id;
          }
        }
      })
    },

    // 商品详情配置
    findConfigure(){
      var _this = this;
      if(null==_this.goods_id||_this.goods_id==''){
        _this.$message({
          message: '请选择宝贝和店铺详情页模板',
          type: 'warning'
        });
      }else{
        pub._InitAxios({
          _url:pub._url,
          ur:pub._DetailApi.findGoodsConfigure,//商品详情配置接口
          data:{
            "student_id":_this.studentid, //学生学号
            "dept_id":_this.lasna, //店铺编号
            "template_id":_this.template_id, //店铺模板编号
            "goods_id":_this.goods_id,//商品编号
          },
          cbk:function cbk(res){
            console.log(11111,res)
            _this.findShop();
            if(res.stateCode=="200" && res.data!=null){ 
              var data=res.data;
              _this.id=data.id;
              // 换色
              _this.index_s=data.index_s;
              _this.activeColor=data.activeColor;
              _this.actColor=data.actColor;
              // 宝贝主图
              _this.goods=data.goods.goods_id+","+data.goods.goods_name;
              _this.goods_id=data.goods.goods_id;
              _this.goods_name=data.goods_name;
              _this.goods_picture_list=data.goods_picture_list;
              // 基础信息
              _this.goods_price=data.goods.goods_price;
              _this.goods_full1=data.goods.goods_full1;
              _this.goods_minus1=data.goods.goods_minus1;
              _this.goods_full2=data.goods.goods_full2;
              _this.goods_minus2=data.goods.goods_minus2;
              _this.goods_spec=data.goods.goods_spec;
              _this.goods_val=data.goods.goods_val;
              _this.goods_radio=data.goods.goods_radio;
              // 详情配置
              _this.dictionary_value=data.set.dictionary_value;
              _this.set_description=data.set.set_description;
              _this.set_qualification=data.set.set_qualification;
              _this.set_detailsPic=data.set.set_detailsPic;
              _this.checkList=data.set.checkList;
              _this.check=data.set.check;
              _this.description_radio=data.set.description_radio;
              _this.qualification_radio=data.set.qualification_radio;
              _this.detailsPic_radio=data.set.detailsPic_radio;
              _this.evaluation_radio=data.set.evaluation_radio;
              _this.checkList_radio=data.set.checkList_radio;
              // 宝贝主图图片显示
              for(var i=0;i<_this.goods_picture_list.length;i++){
                var file={};
                // console.log(_this.goods_picture_list[i])
                file.url= pub._url+_this.goods_picture_list[i];
                _this.fileList.push(file);
                // 超过6张则隐藏图片
                if(_this.fileList.length>=_this.limitCount){
                  _this.hideUpload = _this.fileList.length >= _this.limitCount;
                }
              }

              // 产品资质图片回显
              for(var i=0;i<_this.set_qualification.length;i++){
                var file1={};
                file1.url= pub._url+_this.set_qualification[i];
                _this.fileList1.push(file1);
              }

              // 详情图图片回显
              for(var i=0;i<_this.set_detailsPic.length;i++){
                var file2={};
                file2.url= pub._url+_this.set_detailsPic[i];
                _this.fileList2.push(file2);
              }

              // 字典
              //_this.tabledata;
              // 数据
              //var data = data.set.tabledata;
              var tabdata = data.set.tabledata;
              

              if(null!=tabdata){
                  for(var i=0;i<tabdata.length;i++){
                    var dic =  tabdata[i]
                    for(var j=0;j<tabdata.length;j++){
                      if(dic.dictionary_id == tabdata[j].dictionary_id){
                        dic.dictionary_value = tabdata[j].dictionary_value;
                        if(null==tabdata[j].dictionary_value || tabdata[j].dictionary_value==''){
                          dic.check_status=false;
                        }else{
                          dic.check_status=true;
                          console.log(typeof(dic.check_status));
                        }
                      }
                    } 
                  }
                 setTimeout(()=>{
                  _this.tabledata=tabdata;
                  console.log(_this.tabledata)
                 },100)
              }
              
              }else if(res.data===null){
                console.log(45645);
              }else{
                console.log(res.stateMsg)
              }
          }
        })
      }
    },
    checkChange(index){
      console.log(index);
      this.$set(this.tabledata[index], 'check_status', this.tabledata[index].check_status?true:false);
    },
    // 商品详情静态化
    save(obj){
      // 宝贝主图
      this.goods_picture_list=[];
      for(var i=0;i<this.fileList.length;i++){
        this.goods_picture_list.push(this.fileList[i].url.replace(pub._url,""));
      }
      // 产品资质
      this.set_qualification=[];
      for(var i=0;i<this.fileList1.length;i++){
        this.set_qualification.push(this.fileList1[i].url.replace(pub._url,""));
        if(this.fileList1.length>1){
          console.log("只能一张")
        }
      }
      // 详情图
      this.set_detailsPic=[];
      for(var i=0;i<this.fileList2.length;i++){
        this.set_detailsPic.push(this.fileList2[i].url.replace(pub._url,""));
      }
      // 宝贝参数
      this.dictionary_value=[];
      for(var i=0;i<this.tabledata.length;i++){
        this.dictionary_value.push(this.tabledata[i].dictionary_value);
      }
      var _this=this;
      // 基础信息
      var goods={
        goods_price:_this.goods_price, //宝贝售价
        goods_full1:_this.goods_full1, //满
        goods_minus1:_this.goods_minus1, //减
        goods_full2:_this.goods_full2, //满
        goods_minus2:_this.goods_minus2, //减
        goods_spec:_this.goods_spec, //规格
        goods_val:_this.goods_val, //规格
        goods_id:_this.goods_id, //商品编号 
        goods_name:_this.goods_name, //商品名称
        goods_radio:_this.goods_radio,//显示/不显示
      }
      // 详情配置
      var set={
        tabledata:_this.tabledata,//产品参数
        set_description:_this.set_description,//包装说明
        set_qualification:_this.set_qualification,//产品资质
        set_detailsPic:_this.set_detailsPic,//详情图
        checkList:_this.checkList,//评价等级
        check:_this.check,//评价内容
        description_radio:_this.description_radio,//显示/不显示
        qualification_radio:_this.qualification_radio,
        detailsPic_radio:_this.detailsPic_radio,
        evaluation_radio:_this.evaluation_radio,
        checkList_radio:_this.checkList_radio,
      }
      this.experiment={
        // 换色
        index_s:_this.index_s,
        activeColor:_this.activeColor,
        actColor:_this.actColor,
        // 宝贝主图
        goods_picture_list:_this.goods_picture_list,
        // 基础信息
        goods:goods,
        // 宝贝详情配置
        set:set,
      }
     
      if(obj==1 && _this.goods_picture_list==""){
        _this.$message({
          message: '未添加图片',
          type: 'warning'
        });
      }else if(obj==1 && _this.goods_picture_list.length<3){
        _this.$message({
          message: '上传图片不能少于3张',
          type: 'warning'
        });
      }else if(obj==2 && this.goods_price==""){
        _this.$message({
          message: '宝贝售价不能为空',
          type: 'warning'
        });
      }else if(obj==2 && (_this.goods_radio==0 && this.goods_full1=="" || this.goods_minus1=="" || this.goods_full2=="" || this.goods_minus2=="")){
          _this.$message({
            message: '优惠信息不能为空',
            type: 'warning'
          });
      }else if(obj==2 && this.goods_val==""){
        _this.$message({
          message: '宝贝规格数值不能为空',
          type: 'warning'
        });
      }else if(obj==2 && this.goods_spec==""){
        _this.$message({
          message: '宝贝规格单位不能为空',
          type: 'warning'
        });
      }else{
        this.saveall();
      }
    },

    saveall(){
      var _this=this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.makeGoodsDetailsStatic,//商品详情静态化
        data:{
          "student_id":_this.studentid,
          "dept_id":_this.lasna,
          "template_id":_this.template_id,
          "experiment_module_data":this.experiment,
          "goods_id":_this.goods_id
        } ,
        cbk:function cbk(res){
          _this.id=res.data.id;
          if(res.stateCode=="200"){
            _this.$message({
                type: 'success',
                message: "保存成功"
              });
            _this.editor(0);
          }else{
            this.$message.error(res.stateMsg);
          }
        }
      })
    },
    // 详情产品参数名称
    getinit(){
      var _this=this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.listDictionary,//字典列表接口
        data:
         {"dictionary_type_id":'good_attributes'}
        ,
        cbk:function cbk(res){
          if(res.stateCode=="200"){
            var list=res.data;
            _this.tabledata=list;
          }
        }
      })
    },

    // 下拉框
    changeSelect(){
      var da = this.goods.split(",");
     this.goods_id=da[0];
      this.goods_name=da[1];
      this.$message({
        message: '宝贝选择成功',
        type: 'success'
      });
    },

    // 悬浮显示按钮
    editor(bol){
      bol ==1 ? this.isshow2 =true : this.isshow2=false;
      bol ==2 ? this.isshow =true : this.isshow=false;
      bol ==4 ? this.isshow4 = true : this.isshow4 =false;
    },

    // 切换店铺模板
    changesol(name,str){
      this.$alert(`已选择${name}`, '模块选择成功', {
        confirmButtonText: '确定',
        callback: action => {
          this.template_id=str+1;
          console.log(this.template_id)
            this.findConfigure();
            this.$message({
              message: '模板选择成功',
              type: 'success'
            });
        }
      });
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },

    // 上传宝贝主图图片
    handleAvatarSuccess(res, file,fileList) {
      file.url=pub._url + res.data.files[0];
      this.fileList=fileList;
    },
    // 超过6张则隐藏图片
    imgChange(file, fileList){
      this.hideUpload = fileList.length >= this.limitCount;
    },
    // 宝贝主图
    handleRemove(file, fileList) {
      this.fileList=fileList;
      this.hideUpload = fileList.length >= this.limitCount;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    // 上传产品资质图片
    handleAvatarSuccess1(res, file,fileList) {
      file.url=pub._url + res.data.files[0];
      this.fileList1=fileList;
    },  
   
    // 产品资质图片
    handleRemove1(file, fileList) {
      this.fileList1=fileList;
    },
    handlePictureCardPreview1(file) {
      this.dialogImageUrl1 = file.url;
      this.dialogVisible1 = true;
    },

    // 上传详情图图片
    handleAvatarSuccess2(res, file,fileList) {
      file.url=pub._url + res.data.files[0];
      this.fileList2=fileList;

    },  
    // 详情图图片
    handleRemove2(file, fileList) {
      this.fileList2=fileList;
    },
    handlePictureCardPreview2(file) {
      this.dialogImageUrl2 = file.url;
      this.dialogVisible2 = true;
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
    }
  },
})