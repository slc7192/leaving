var app = new Vue({
    el: "#app",
    data: {
        show1: false,
        currentPage3: 1,
        tabledata: [],
        title: '',
        content: '',
        count: '',
        pageSize: 5,
        currPage: 1,
        user_id:"",
        head_portrait:"",
        student_name:"",
         magName:'',
        onLogin:false,
        downLogin:true
    },
    created() {
 
         var stname=JSON.parse(localStorage.getItem("msg"));
		 if(stname!=null){
            this.magName=stname.student_id;
              this.getinit();
		 }else{
			 window.location.href="../html/login.html";
		 }
       
    },
    
    methods: {
        
		use(obj){
          if(obj){
            window.location.href="../html/usecenter.html?student_id="+this.magName
          }else{
            localStorage.clear();
			 window.location.href="../index.html"
          }
        },

        // 阅读全文跳转详情页面
        go_read(message_id){
            console.log(1111,message_id)
            window.location.href = '../html/read.html?message_id=' + message_id+"&aim=le";
        },

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currPage = val;
            this.getinit();
        },

        getinit() {
            var _this = this;
          
			
			pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.getList,//留言分页列表
                data: { "pageSize": _this.pageSize, "pageNum": _this.currPage },
                cbk: function cbk(res) {
                    
                    _this.total = res.data.totalPage;
                    if (res.code == 0 && res.msg == "success") {
                        var list = res.data.list;
                        for (var i = 0; i < list.length; i++) {
                            var item = list[i];
                            item.head_portrait = baseURL + item.head_portrait;
                            console.log(item.title);
                           
                        }
                         list[0].title;
                         list[0].content;
                        _this.tabledata = list;
                        console.log(list)
                        
                    }
                }
            });
            
			
			// var query={
            //   _url:pub._ur,
            //   ur:'',
            //   data:{},
            //   cbk:function(res){
            //     console.log(res);
            //   }
            // }
            // pub._InitAxios(query);
        },
        addup(index, likenum) {
            var addup = Number(this.tabledata[index].likenum);
            this.$set(this.tabledata[index], 'likenum', addup + 1);
            console.log(this.tabledata)
            var addown = Number(this.tabledata[index].likenum)
        },
       
	   update() {
		   
		  var  user = JSON.parse(window.localStorage.getItem('msg'));
		
            console.log("czy:"+user.student_id)
            var _this = this;
			  _this.user_id = user.student_id;
            if(null==_this.user_id || _this.user_id==""){
                this.$confirm('请先登录, 是否继续?', '提示', {
                    confirmButtonText: '去登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    window.location.href = '../html/log.html';
                }).catch(() => {
                        
                });
            }else if(_this.title == '') {
                this.$message.error('未提交留言标题');
            } else if (_this.content == '') {
                this.$message.error('未提交留言内容');
            } else {
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.departmentList,//创建留言
                    data: { "title": this.title, "content": this.content, "user_id": this.user_id },
                    cbk: function cbk(res) {
                        // console.log(res);
                        if (res.code == "200" && res.msg == "success") {
                            _this.title = '';
                            _this.content = '';
                            _this.getinit();
                            _this.$message({
                                message: '留言提交成功',
                                type: 'success'
                            });
                            return;
                        }
                        return this.$message.error('留言提交失败，请检查网络设置');
                    }
                });
            }

        },
    },
})