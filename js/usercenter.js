var app =new Vue({
  el:'#usercenter',
  data:{
    tableData: [],
    input:'',
    tabe:[],
    textcount:[],
    show:0,
    times:[],
    options: [],
    value: '',
    value1: '',
    optio: [],
    value2: [],
    mylabel:'',
    shopitem:[],
    experiment:[],//选择的实验
    team_id:'',//小组id
    team_name:'',//小组名字
    dept_name:'',//默认店铺名称==小组名字
    dept_type_id:'',//店铺编号
    dept_type_name:'',//店铺名称
    openurl:'',
    newphone:'',//新手机号
    newpass:'',//新密码
    newagainpass:'',//重复密码
    againc:false,
    sav1:true,
    pagesize:2,//一页几个
    pagenum:1,//第几页
    total:0,//总页数
    search_name:'',
    visible: false,
    PageSize:9,//一页10个
    Pagenum:1,
    alunt:0,//总页数
    navlist:[],
    PAgesize:5,
    PAgenum:1,
    taol:0,
    input_dian:'',//电商搜索
    tables:[
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }
    ]
  },
  created(){
    this.getinit();
    this.getcount();
    this.getnovcount();
  },
  methods:{
    getinit(){
      var studentid=pub._LinkParm('student_id');
      var _this=this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.studentInfo,
        data:{
          student_id : studentid
          },
        cbk: function cbk(res){
          console.log(res);
          _this.tabe= res.data;
          console.log(_this.tabe);
          _this.textcount=res.data.experiment;
          _this.search_name=res.data.student_name;
          localStorage.setItem("dept_id",res.data.dept_id)
         }
        })
    },
    getcount(){
      var _this=this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.listShop,
        data:{
          "pageSize":_this.PageSize,
          "pageNum":_this.Pagenum,
          "param_remarks":_this.input_dian,
          },
        cbk: function cbk(res){
          _this.alunt=res.data.totalCount;
          _this.navlist=res.data.list;
         }
        })
    },

    getnovcount(){
      var _this=this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.listShop,
        data:{
          "pageSize":_this.PAgesize,
          "pageNum":_this.PAgenum,
          },
        cbk: function cbk(res){
          
         }
      })
    },
    // 电商平台搜索
    // seca(){
    //   this.getcount();
    // },
    //学生成绩分页
    handleCurrentChange(val){
      console.log(val);
      this.pagenum=val;
      this.listest();
    },
   
    //学生店铺分页  换页
    handleCurrent(val){
      console.log(val);
      this.Pagenum=val;
      this.getcount();
    },
    Times(val){
      this.team_id=val.value;//小组id
      this.team_name=val.label;//小组名字
      this.dept_name=val.label;
      // console.log('id'+this.team_id, 'name'+this.team_name,this.dept_name)//id  name
    },
    shop(val){
      this.dept_type_id=val.value;//小组id
      this.dept_type_name=val.label;//小组名字
      // console.log('店铺id'+this.dept_type_id, '店铺name'+this.dept_type_name)//id  name
    },
    nphone(obj){
      var re=/^1\d{10}$/;
      let str = this.nphone;
      let st= obj;
      if(re.test(str) || re.test(st)){
        // console.log('正确的手机号')
        return true;
      }else{
        // console.log('手机号码不正确，请重新输入')
        return false;
      }
    },
    makesure(){
      var studentid=pub._LinkParm('student_id');//学生学号
      var _this=this;
      // console.log(_this.newphone)
      if(_this.newagainpass!==_this.newpass){
        _this.$message.error('两次密码不一致，请重新输入')
      }else{
        pub._InitAxios({
          _url:pub._url,
          ur:pub._DetailApi.studentEdit,
          data:{
          "student_id":studentid,
          "phone":_this.nphone,
          "files":"no",
          "password":_this.newagainpass,
          "phone":_this.newphone      
          },
          cbk:function cbk(res){
            console.log(res);
            if(res.stateCode=="200" && res.stateMsg == "success"){
              // console.log(res);
              _this.againc=true;
              window.location.href="../html/login.html"
              localStorage.clear();
              _this.clearCookie();
             
            }
          }
        })
      }
      
    },
    delet(){
      this.newagainpass='';
      this.newpass='';
      this.newphone=''
    },
    clearCookie() {
      this.setCookie("", "", 0); //账号密码置空，天数置0
    },
    //保存
    getdata(){
      //选择实验的结果
      console.log(this.optio);
      console.log(this.value2);
      var keys=[];
      for(let i = 0;i<this.optio.length;i++){
        for(var key of this.value2){
          if(key==this.optio[i].dictionary_id){
            let param={
              experiment_module_id:this.optio[i].dictionary_id,
              experiment_module_name:this.optio[i].dictionary_name
            }
            keys.push(param);
          }
        }
      }
      this.experiment=keys;
      console.log(this.experiment)
      this.save();
    },
    save(){
      var studentid=pub._LinkParm('student_id');//学生学号
      let _this=this;
      if(_this.team_id==''){
        this.$message.error("小组不能为空");
        return;
      }if(_this.dept_type_name==''){
        this.$message.error("请选择店铺类别");
        return;
      }if(_this.experiment==''){
        this.$message.error("请选择实验，可多选");
        return;
      }else{
        pub._InitAxios({
          _url:pub._url,
          ur:pub._DetailApi.studentJoin,
          data:{"dept_name":_this.dept_name,
          "dept_type_id":_this.dept_type_id,
          "dept_type_name":_this.dept_type_name,
          "student_id":studentid,
          "team_id":_this.team_id,
          "experiment":_this.experiment,
          "team_name":_this.team_name
          },
          cbk:function cbk(res){
            console.log(res);
            if(res.stateCode=="200" && res.stateMsg == "success"){
              _this.textunt();
            }else{
              _this.$message.error(res.stateMsg);
            }
          }
        })     
      }
    },
    opentext(){
      if(this.tabe.team_id == null || this.tabe.team_id==''){
        console.log(555)
        // 选择小组
        var _this=this;
        pub._InitAxios({
          _url:pub._url,
          ur:pub._DetailApi.studentList,
          data:{"dictionary_type_id":"team"},
          cbk:function cbk(res){
            // console.log(res);
            _this.times=res.data;
            // console.log(_this.times)
            // 选择店铺类别
            pub._InitAxios({
              _url:pub._url,
              ur:pub._DetailApi.studentList,
              data:{"dictionary_type_id":"shop_category"},
              cbk:function cbk(res){
                // console.log(res);
                _this.options=res.data;
                // 选择实验
                pub._InitAxios({
                  _url:pub._url,
                  ur:pub._DetailApi.studentList,
                  data:{"dictionary_type_id":"test"},
                  cbk:function cbk(res){
                    // console.log(res);
                    _this.optio=res.data;
                    // console.log(_this.optio);
                  }
                })
              }
            })
          }
        })
      }else{
        this.textunt();
      }
    },
    textunt(){
      this.show=1;
      this.sav1=false;
      this.getinit();
    },
    pusha(index,obj){
      // console.log(index,obj);
      var studentid=pub._LinkParm('student_id');//学生学号
      switch(obj){
        case 'shop':url='../html/storeopt.html';
        break;
        case 'goods':url='../html/commdetails.html';
        break;
        case 'soft':url='../html/editor_list.html';
        break;
        case 'short_video':url='../html/shotvideo.html';
        break;
        case 'live':url='#';
        break;
        case 'logistic':url='../html/wuliu.html';
        // href="#p7"
        break;
      }
      this.openurl=url+'?student_id=' + studentid;
      console.log(this.openurl);
      // location.reload();
      window.location.href=this.openurl
    },
    listest(){
      var that=this;
      var studentid=pub._LinkParm('student_id');//学生学号
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.studentListTest,
        data:{
          "pageSize":this.pagesize,
        "pageNum":this.pagenum,
        "student_id":studentid
        },
        cbk:function cbk(res){
          if(res.stateCode=="200"){
            console.log(res,res.data.totalCount)
            that.tableData=res.data.list;
            // that.total=res.data.totalCount;
            console.log(that.total)
          }
        }
      })
    },
    contList(t,s){
      window.location.href='../index/index.html?id='+t +'&'+'student_id='+s+'&'+'dw='+1;
    },
    tableRowClassName({row, rowIndex}) {
      
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    handleChange(val){
      this.PAgenum=val;
      this.getnovcount();
    },
  }
})