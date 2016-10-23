function animate(ele,target,durtion,callback){
    var linear=function(t,b,c,d){
        return b+t/d*c;
    };
    var time=0;
    var begin={};
    var change={};
for(var key in target){
    begin[key]=utils.css(ele,key);
    change[key]=target[key]-begin[key]
}
    var i=10;
    ele.timer&&window.clearInterval(ele.timer);
    ele.timer=window.setInterval(function(){
        time+=i;
        if(time>=durtion){
            window.clearInterval(ele.timer);
            utils.css(ele,target);
            if(typeof callback=='function'){
                callback.call(ele);
            }
        }
        for(var key in change){
            if(change[key]){
                var val=linear(time,begin[key],change[key],durtion);
                utils.css(ele,key,val);
            }
        }
    },i);
}