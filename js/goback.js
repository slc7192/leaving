var time=20;
console.log(55);
(function() {
	var arr = window.location.search;
	let goback=setInterval(function(){
    time--;
    console.log(566)
		if(time<=0){
      clearInterval(goback);
      console.log(45444);
		   window.location.href = '../html/usecenter.html' + arr
		}

	},1000)
	
})()
   