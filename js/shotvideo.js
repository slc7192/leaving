var shotvideo = new Vue({
  el:"#shotvideo",
  data:{
    videoList:[],
    pageSize:11,
    pageNum:1,
    currentPage4: 1,
    isshow:false,
    dialogImageUrl: '',
    dialogVisible: false,
    disabled: false,
    videoFlag: false,
    //是否显示进度条
    videoUploadPercent: "",
    //进度条的进度，
    isShowUploadVideo: false,
    //显示上传按钮
    videoForm: {
        showVideoPath: ''
    },
    sa:false,
    lastname:'',
    video_url:'',
    video_name:'',
    studentid:'',
    she:[],
    shifow:true,
    vidurl:'',
    imgurl:'',
    towtal:0,
    testReport_sign:'',
    hideUpload: false,
    
  },
  created(){
      this.lastname = localStorage.getItem("msg");
      this.lasna = localStorage.getItem("dept_id");
     
      this.testReport_sign=JSON.parse(this.lastname).testReport_sign;
      
      this.studentid=pub._LinkParm('student_id');//学生学号
      this.imgurl=pub._url+'api/fileUp';
      if(this.lastname){
        this.getinit();
      }else{
        window.location.href="../html/login.html"
      }
    
  },
  methods:{
    getinit(){
      this.vidurl=pub._url;
      
      var _this=this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.videoList,
        data:{
           "pageSize":_this.pageSize,
            "pageNum":_this.pageNum,
            "student_id":_this.studentid
        },
        cbk:function cbk(res){
          if(res.stateCode=="200"){
            console.log(res);
            _this.videoList=res.data.list;
            _this.towtal=res.data.totalCount
          }
        }
      })
    },
    add(){
      this.isshow=true;
    },
    //上传前回调
    beforeUploadVideo(file) {
      var fileSize = file.size / 1024 / 1024 < 50;
      if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) == -1) {
          layer.msg("请上传正确的视频格式");
          return false;
      }
      if (!fileSize) {
          layer.msg("视频大小不能超过50MB");
          return false;
      }
      this.isShowUploadVideo = false;
  },
  //进度条
  uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
  },
  onlunch(file,filelist){
    this.hideUpload = this.videoUploadPercent.length >= 1;
  },
  //上传成功回调
  handleVideoSuccess(res, file) {
    console.log(pub._url)
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      //后台上传地址
      if (res.stateCode=="200") {
        console.log( res.data.files[0]);
        this.video_url=res.data.files[0];
          this.videoForm.showVideoPath =pub._url+ res.data.files[0]; 
          this.sa=true;
        
      } else {
          // layer.msg(res.Message);
          console.log('出错了')
      }
  },
  //删除视频
    dele(str){
      var _this=this;
      pub._InitAxios({
        _url:pub._url,
        ur:pub._DetailApi.deleteVideo,
        data:
         {'id':str}
        ,
        cbk:function cbk(res){
          if(res.stateCode=="200"){
            _this.$message({
              message: '删除成功',
              type: 'success'
            });
            _this.getinit();
          }
        }
      })
    },
   //确定上传视频
    shue(bol){
      var timestamp = (new Date()).getTime()/1000;
      console.log(timestamp)
      if(bol){
         if(this.video_name==''){
          // console.log(455)
          this.$message.error('请填写视频名称');
        }else if(this.video_url==''){
          // console.log(4755)
          this.$message.error('请上传视频');
        }else{
          var _this=this;
          var experiment={
            "video_name":_this.video_name,
            "video_url":_this.video_url
          }
          pub._InitAxios({
            _url:pub._url,
            ur:pub._DetailApi.studentVideo,
            data:{
               "student_id":_this.studentid,
                "testReport_sign":timestamp,
                "dept_id" :_this.lasna,
                "experiment_module_data":experiment
            },
            cbk:function cbk(res){
              if(res.stateCode=="200"){
                _this.$message({
                  message: '视频上传成功',
                  type: 'success'
                });
                
                _this.isshow=false;
                _this.getinit()
              }
            }
          })
        }
      }else{
        this.isshow=false;
        // console.log(123);
      }
      this.sa=false;
      this.video_name='';
      this.videoForm.showVideoPath='';
    },
    //每页多少条
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    //当前处于那一页上
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNum=val;
      this.getinit();
    }
  },
})