var app = new Vue({
    el: "#message",
    data: {
        show1: false,
        currentPage3: 1,
        tabledata: [],
        title: '',
        count: '',
        pageSize: 5,
        currPage: 1,
        totalPage: 0,
        totalCount: 0,
        message_id: 10,
        user_id: "",
        head_portrait:"",
        student_name:"",
        onLogin:false,
        downLogin:true,
        imul:''
    },
    created() {
         var stname=JSON.parse(localStorage.getItem("msg"));
		 if(stname!=null){
            this.magName=stname.student_id;
            this.user_id=stname.student_id;
            this.getinit(); 
		 }else{
			 window.location.href="../html/login.html";
		 }
         imul:''
         this.imul=pub._url;
        
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
        // 查询学生信息
        judgeLog(){
            var _this = this;
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.studentInfo,//查询学生信息接口
                    data: {"user_id":_this.user_id },
                    cbk: function cbk(res) {
                        console.log(res);
                        if (res.code == 200 && res.msg == "success") {
                            _this.head_portrait=baseL + res.data.head_portrait;
                            _this.student_name=res.data.student_name;
                            console.log(_this.head_portrait);
                        }
                    }
            });
        },

        //点击跳转个人中心页面
        handleCommand(command) {
            console.log(2222222)
            if(command=='a'){
                console.log(this.user_id)
                window.location.href = '../html/usecenter.html';
            }else{
                this.user_id="";
                sessionStorage.clear();
                window.location.href = '../index.html';
            }
          },

        // 点击跳转登录注册页面
        lo(){
            window.location.href = '../html/log.html';
        },
        re(){
            window.location.href = '../html/reg.html';
        },

        handleSizeChange(val) {
            
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currPage = val;
            this.getinit();
        },
        view(){
            console.log(111)
        $(".main_src").each(function() {
            
            //获取内容
            console.log(123)
            var str = $(this).html();
            //截取内容5个字符
            // console.log(str);
            var subStr = str.substring(7, 100);
            console.log(subStr);
            //如果长度大于140就添加省略号否则就添加空
            var data = subStr + (str.length > 140 ? '...' : '');
            $(this).html(data);
        });
        $(".main_ris").each(function() {
            //获取内容
            var mstr = $(this).html();
            //截取内容5个字符
            var msubStr = mstr.substring(0, 55);
            console.log(msubStr);
            //如果长度大于140就添加省略号否则就添加空
            var data = msubStr + (mstr.length > 55 ? '...' : '');
            $(this).html(data);
        });
    },
        //留言列表
        getinit() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.listNewMessagePage,
                data: { "pageSize": _this.pageSize, "pageNum": _this.currPage, "user_id": _this.user_id },
                cbk: function cbk(res) {
                    console.log(res);
                    if (res.code == 0 && res.msg == "success") {
                        // 分页
                        _this.totalCount = res.data.totalCount;
                        _this.totalPage = res.data.totalPage;

                        var list = res.data.list;
                      
                        for (var i = 0; i < list.length; i++) {
                            var item = list[i];
                            item.head_portrait = baseURL + item.head_portrait;
                            //新消息提醒
                            if (item.new_message_status == 'Y') {
                                item.new_message_status = true;
                            } else {
                                item.new_message_status = false;
                            }
                        }
                        
                        _this.tabledata = list;
                        console.log(list)
                        // _this.view();

                    }
                }
            });
        },
        // 解除留言提醒
        remove(message_id) {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.removeNewMessage,
                data: { "message_id": message_id ,"user_id":_this.user_id},
                cbk: function cbk(res) {
                    console.log(res);
                    if (res.code == 200) {
                        window.location.href = '../html/read.html?message_id=' + message_id;
                    }
                }
            });
        },
        addup(index, likenum) {
            var addup = Number(this.tabledata[index].likenum);
            this.$set(this.tabledata[index], 'likenum', addup + 1);
            console.log(this.tabledata)
            var addown = Number(this.tabledata[index].likenum)
        },
        update() {
            console.log(this.title, this.count)
            var _this = this;
            if (_this.title == '') {
                this.$message.error('未提交留言标题');
            } else if (_this.count == '') {
                this.$message.error('未提交留言内容');
            } else {
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.departmentList,
                    data: { "title": this.title, "content": this.count, "user_id": _this.user_id },
                    cbk: function cbk(res) {
                        // console.log(res);
                        if (res.code == "200" && res.msg == "success") {
                            _this.title == '';
                            _this.count == '';
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