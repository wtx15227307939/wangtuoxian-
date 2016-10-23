var utils={
    jsonParse:function(n){
        return "JSON"in window?JSON.parse(n):eval("("+n+")");
    },
    win:function(a,b){
        if(typeof b!='undefined'){
            document.documentElement[a]=b;
            document.body[a]=b;
        }
       return document.documentElement[a]|document.body[a];
    },
    offset:function(ele){
        var l=null;
        var t=null;
        l+=ele.offsetLeft;
        t+=ele.offsetTop;
        var par=ele.offsetParent;
        while(par){
            if(window.navigator.userAgent.indexOf('MSIE 8')==-1){
                l+=par.clientLeft;
                t+=par.clientTop;
            }
            l+=par.offsetLeft;
            t+=par.offsetTop;
            par=par.offsetParent;
        }
       return{left:l,top:t}
    },
    getElesClass:function(strClass,context){
        context=context|document;
        var strClassAry=strClass.replace(/(^ +| +$)/g,"").split(/ +/);
        var tags=context.getElementsByTagName('*');
        var ary=[];
        for(var i=0;i<tags.length;i++){
            var curTag=tags[i];
            var flag=true;
            for(var j=0;j<strClassAry.length;j++){
                var curClass=strClassAry[i];
                var reg=new RegExp("(^| +)"+curClass+"( +|$)");
                if(!reg.test(curTag.className)){
                    flag=false;
                    break;
                }
            }
            ary.push(curTag);
        }
        return ary;
    }
};
