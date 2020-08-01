function search_query(){
    const search = window.document.getElementsByClassName('search_input')[0];
    const search_ipt = search.getElementsByTagName('input')[0];
    const search_btn =search.getElementsByTagName('a')[0];
    search_btn.onclick = function(){
        const search_query = search_ipt.value.trim();
        // if(search_query){
            window.sessionStorage.setItem('search',search_query);
            window.location.href="../html/search.html"
        // }else{
        //     console.log('没有输入搜索的内容')
        // }
    }
    // 登录后显示用户名
    const usechange = document.getElementsByClassName('usechange')[0]
    const useId = window.localStorage.getItem('buyer_id');
    console.log(useId)
    if (useId) {
        console.log('用户登录')
        axios.post(good_baseURL + 'api/findCustomer', {
            'customer_id': useId
        }).then(res => {
            let usedate = res.data.data;
            if (usedate[0].CustomerInfo == 0) {
                window.location.href = "../html/login.html?back=" + window.location.href;
            } else {
                let useStr = `<a href="javascript:;">
                <div>${usedate[0].CustomerInfo.customer_nickname}</div>
                <div class="logout" style="display:none">退出登录</div>
                </a>`;
                usechange.innerHTML = useStr;
                sessionStorage.setItem('uname',usedate[0].CustomerInfo.customer_nickname)
                const exit_log = usechange.getElementsByTagName('a')[0];
                const logout = exit_log.getElementsByClassName('logout')[0];
                var showtag = false
                exit_log.onclick = function () {
                    showtag = !showtag;
                    if (showtag) {
                        logout.style.display = 'block'
                    } else {
                        logout.style.display = 'none'
                    }

                }
                logout.onclick = function () {
                    localStorage.clear();
                    window.history.go(0)
                }

            }
        })
    }
}
search_query()