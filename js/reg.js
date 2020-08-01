var reg=new Vue({
  el:"#reg",
  data:{
    reg:{
      grade:'',//班级名称
      grade_id:'',//班级编号
      phone:'',//手机号
      password:'',//密码
      school:'',//学校属性
      student_id:'',//学号
      student_name:''//学生姓名
    },
    againpass:'',//登陆密码
    options: [],
    value: '',
    value1:'',
    againpass:'',
    studentlist:[
      {
        value: '0',
        label: '非本校'
      }, {
        value: '1',
        label: '本校'
      }
    ],
    classname:'',//班级id
    stulist:'',//学生属性
    cnum:''//校验手机号
  },
  created(){
    this.getinit();
  },
  methods:{
    animate(obj){
      //输入的两次密码
      // console.log(this.againpass,this.reg.password);
    },
    //实时校验手机号码
    regphone(obj){
      var re=/^1\d{10}$/;
      let str = this.reg.phone;
      let os = obj;
      if(re.test(str) || re.test(os)){
        return true;
      }else{
        return false;
      }
    },
    raeg(){
      var _this=this;
      //提交时校验
      //  || !_this.regphone(_this.reg.phone)
      if(_this.reg.phone==''){
        _this.$message.error('请输入正确的手机号');
      }else if(_this.reg.student_name==''){
        _this.$message.error('请输入您的名字');
      }else if(_this.reg.school==''){
        _this.$message.error('请选择您的学生属性');
      }else if(_this.reg.grade==''){
        _this.$message.error('请选择所在班级');
      }else if(_this.reg.student_id==''){
        _this.$message.error('请输入您的学号');
      }else if(_this.againpass==''){
        _this.$message.error('请设置登录密码');
      }else if(_this.reg.password==''){
        _this.$message.error('请确认登录密码');
      }else if(_this.againpass !== _this.reg.password){
        _this.$message.error('密码不一致，请重新输入');
      }else{
        pub._InitAxios({
          _url:pub._url,
          ur:pub._DetailApi.studentReg,
          data:{"grade":_this.reg.grade, 
          "grade_id":_this.reg.grade_id,
           "phone":_this.reg.phone,
            "password":_this.reg.password,
            "school":_this.reg.school,
            "student_id":_this.reg.student_id,
            "student_name":_this.reg.student_name},
          cbk: function cbk(res){
            console.log(res);
            if(res.stateCode == 'user_exist' && res.stateMsg == '用户已存在'){
              _this.$message.error('用户已存在，请重新注册');
            }else if(res.stateCode == '200' && res.stateMsg=='success'){
               _this.open();
            }else{
              console.log('注册失败')
            }
           }
          })
      }
    },
    open() {
      var _this=this;
      this.$confirm('注册成功，是否跳转到登录页面?', '跳转', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        _this.$message({
          type: 'success',
          message: '跳转登录页面!'
        });
        _this.clearCookie();
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '取消跳转登录页面!'
        });
      });
    },
      //清除cookie
      clearCookie() {
        clearAllCookie();
        window.location.href="../html/login.html"   //跳转登录页面 
    },
    //获取班级名称和id编号
    getinit(){
      var that=this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.studentList,
        data:{"dictionary_type_id":"class"},
        cbk: function cbk(res){
          that.options=res.data;
         }
        })
    },
    chang(val){
      // 班级编号
      // console.log(val,val.label,val.value)
      this.reg.grade=val.label;//班级名称
      this.reg.grade_id=val.value;//班级编号
      // console.log('班级名称'+this.reg.grade,'班级编号'+this.reg.grade_id)
    },
    changlist(val){
      this.reg.school=val;//学生属性
    }
  }
})