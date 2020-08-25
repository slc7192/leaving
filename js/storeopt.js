var index = new Vue({
  el:"#app",
  data:{
    imglist:[
      {image:'../img/index/banner (1).png'},
      {image:'../img/index/banner (2).png'},
      {image:'../img/index/banner (3).png'},
      {image:'../img/index/banner (4).png'},
      {image:'../img/index/banner (5).png'},
    ],
    shou_img:[
      {ime:'../img/ar_down.png'}
    ],
    indexshoe:[
      {img:'../img/show2.jpg',name:'模板一'}
    ],
    indexlist:[
      // {img:'../img/index/green.png',name:'绿色',id:1},
      {img:'../img/index/red.png',name:'红色',id:1},
      {img:'../img/index/blue.png',name:'蓝色',id:2},
      // {img:'../img/index/purple.png',name:'紫色',id:4},
      // {img:'../img/index/orange.png',name:'橙色',id:5},
    ],
    isshow:false,
    isshow2:false,
    isshow3:false,
    isshow4:false,
    ischange:false,
    activeName: 'first',
    dialogImageUrl: [],//轮播内容图片
    didialogImageUrl:'',//logo图片
    dialogVisible: false,
    input_cou:'',//logo店铺名称
    input:'',//logo在售商品
    value_shou:true,//导航首页
    value_shang:false,//导航商品列表
    options: [],
    value: '',
    imageUrl:'',
    imgurllist:[],
    goods_id:'',
    goods_name:'',
    goods_list:[],
    template_id:'1',
    experiment_module_data:{},
    Logo:'',
    Navigation:{},
    Lunboimage:[],
    // form:{
      contractlist:[],
    // },
    inex:'0',
    activeColor:'#db2522',
    hideUpload: false,
    limitCount:6,
    imgurl:'',
    setid:'',
    studentid:'',
    lasna:'',
    surl:''
  },
  created(){
    this.surl=pub._url;
    this.imgurl=this.surl+'api/fileUp';
    
    this.studentid=pub._LinkParm('student_id');
    this.lasna = localStorage.getItem("dept_id");
    if(this.lasna!=null){
      
      this.getinit();
      
    }else{

      window.location.href="../html/login.html"
    }
  },
  methods:{
    getinit(){
      var _this=this;

      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.listGoods,
        data:{},
        cbk:function cbk(res){
          if(res.stateCode=="200"){
            _this.options=res.data;

            pub._InitAxios({
              _url:pub._url,
              ur:pub._DetailApi.findShop,
              data:{"student_id":_this.studentid,
              "dept_id":_this.lasna,
              'template_id':_this.template_id
              },
              cbk:function cbk(res){
                if(res.stateCode=="200"){
                    _this.setid=res.data.id;
                    _this.goods_list=res.data.goods_list;//宝贝内容配置
                    _this.input_cou=res.data.Logo.step_name;//店铺logo名称
                    _this.didialogImageUrl=res.data.Logo.dialogImage;//店铺logo图片
                    _this.value_shang=res.data.Navigation.value_shang;//导航
                    _this.value_shang==1?_this.value_shang=true : _this.value_shang=false;
                    _this.Lunboimage=res.data.Lunboimage;
                   
                    //图片回显
                    var suvl=res.data.Contractlist;
                    for(var i = 0 ;i <suvl.length; i++){
                      _this.contractlist.push({name:suvl[i].uid,url:suvl[i].url});
                    }
                    //判断是否显示新增图片按钮
                    if(res.data.Lunboimage.length>=6){
                      _this.hideUpload=true;
                    }
                    //修改颜色
                    if(res.data.color==2){
                      _this.activeColor='#0365C6';
                    }

                   
                }
              }
            })
          }
        }
      });
    },
    
    shotsee(bol){
      if(bol){
        window.location.href="../html/usecenter.html?student_id="+this.studentid
      }else{
        window.location.href="../index/index.html?id="+this.setid
      }
    },

    //实时监控选择的结果
    Times(val){
      this.goods_id=val.value;//小组id
      this.goods_name=val.label;//小组名字
    },

    editor(bol){
      bol ==1 ? this.isshow2 =true : this.isshow2=false;
      bol ==2 ? this.isshow =true : this.isshow=false;
      bol ==3 ? this.isshow3 = true : this.isshow3 =false;
      bol ==4 ? this.isshow4 = true : this.isshow4 =false;
    },

    change(bol,index) {
      this.inex=index;
      this.inex==1? color='红色' : color='蓝色'
      this.$confirm(`是否确认模板颜色为${color}?`, '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.inex==1?this.activeColor='#db2522' : this.activeColor='#0365C6';
        this.save();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
      
    },

    changesol(str,ind){
      this.template_id=ind+1;
      console.log(this.template_id)
      this.$message({
        message: `已选择${str}，模块选择成功`, 
        type: 'success'
      });
    },

    handleClick(tab, event) {
      // console.log(tab, event);
    },
    
    handlePictureCardPreview(file) {
      this.didialogImageUrl = file.url;
      console.log(file)
      this.dialogVisible = true;
    },
    //宝贝内容配置后得图片
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      if(this.goods_id==''){
        this.$message.error('请选择商品内容');
        return;
      }
      this.imgurllist.push(pub._url+res.data.files[0]);

      if(this.imgurllist.length>6){
        this.$message.error('图片最多上传6张');
      }

      var goos_count={
        goods_id:this.goods_id,
        goods_name:this.goods_name,
        goods_img:res.data.files[0],
      }
      
      this.goods_list.push(goos_count);
    },
    //logo 上传成功后得图片地址
    handleLogoSuccess(res, file){
      console.log(res);
      this.didialogImageUrl=res.data.files[0];
    },
    //轮播图  图片成功回调
    handlelunSuccess(res, file){
      console.log('888888888============',this.Lunboimage)
      console.log(res, file);
      this.dialogImageUrl=file.response.data.files[0];
      console.log(this.dialogImageUrl)
      this.Lunboimage.push(this.dialogImageUrl);
      this.contractlist.push({name:file.uid,url:pub._url+this.dialogImageUrl})
    },
    onlunch(file,filelist){
      console.log(this.Lunboimage)
      this.hideUpload = this.Lunboimage.length >= this.limitCount;
    },
 
    //移除轮播图的图片
    handleRemove(file, fileList) {
      console.log(fileList)
      this.hideUpload = fileList.length >= this.limitCount;
      this.Lunboimage=[];
      this.contractlist=[];
      if(fileList.length!=0){
        for(let i=0; i<fileList.length;i++){
          var iu=fileList[i].url;
          this.Lunboimage.push(iu);
          this.contractlist.push({name:fileList[i].uid,url:iu})
        }
      }else{
        for(let i=0; i<fileList.length;i++){
          var iu=fileList[i].response.data.files[0];
          this.Lunboimage.push(iu);
          this.contractlist.push({name:fileList[i].uid,url:fileList[i].url})
        }
      }
    },
    //删除内容配置
    deel(ind){
      this.goods_list.splice(ind,1);
    },

    savelength(obl){
      var imglength;
      obl? imglength=this.Lunboimage : imglength=this.goods_list;
      
      if(imglength.length<3){
        this.editor(0);
        this.$message.error('轮播图图片少于三张，请再次上传');
        return;
      }

      this.save();
    },
    //保存宝贝内容配置
    save(){
      if(this.inex==0){
        this.inex=1;
      }

      if(this.template_id==''){
        this.$message.error('保存失败，未选择店铺模板，请选择！');
      }

      if(this.value_shang==false){
        this.value_shang=0;
      }else{
        this.value_shang=1
      }
      
      //汇总
      this.experiment_module_data={
        'goods_list':this.goods_list,
        'Logo':{
          'step_name':this.input_cou,
          'dialogImage':this.didialogImageUrl
        },
        'Navigation':{
          'value_shang':this.value_shang,
        },//导航
        'Lunboimage':this.Lunboimage,//轮播图
        'Contractlist':this.contractlist,//轮播图回显
        'color':this.inex,//选择颜色
        'template_id':this.template_id
      }

      this.allsave();
    },
    // 全部保存
    allsave(){
      
      var _this=this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.saveShop,
        data:{
          'student_id':_this.studentid,
          'dept_id':_this.lasna,
          'experiment_module_data':_this.experiment_module_data,
          'template_id':_this.template_id
        },
        cbk:function cbk(res){
          if(res.stateCode=="200"){
            _this.editor(0);
            _this.$message({
              message: '配置保存成功',
              type: 'success'
            });
          }
        }
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG/JPEG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 3MB!');
      }
      return isJPG && isLt2M;
    },
   
  },
})