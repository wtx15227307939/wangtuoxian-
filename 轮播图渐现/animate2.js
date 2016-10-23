function animate(ele,targrt,durtion,callback){
    var linear=function(t,b,c,d){
        return b+t/d*c;
    }
    var time=0;
    var begin={};
    var change={};
    for(var key in targrt){
        begin[key]=utils.css(ele,key);
        change[key]=targrt[key]-begin[key]
    }
    var i=10;
    ele.timer&&window.clearInterval(ele.timer);
    ele.timer=window.setInterval(function(){
        time+=i;
        if(time>=durtion){
            window.clearInterval(ele.timer);
            utils.css(ele,targrt);
            if(typeof callback=='function'){
                callback.call(ele);
            }
            return
        }
        for(var key in change){
            if(change[key]){
                var val=linear(time,begin[key],change[key],durtion);
                utils.css(ele,key,val);
            }
        }
    },i)
}