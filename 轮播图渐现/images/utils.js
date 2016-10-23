var utils={
    listToArray:function(likeArray){//类数组转化为数组
        try{return Array.prototype.slice.call(likeArray,0);
        }catch(e){
            var ary=[];
            for(var i=0;i<likeArray.length;i++){
                ary[ary.length]=likeArray[i];
            }
            return ary;
        }
    },
    jsonParse:function(n){
        return 'JSON'in window?JSON.parse(n):eval("("+n+")");
    },
    getRandom:function(n,m){//获取n-m之间的随机整数
        n=Number(n);
        m=Number(m);
        if(isNaN(n)||isNaN(m)){
            return Math.getRandom();
        }
        if(n>m){
            var temp=m;
            m=n;
            n=temp;
        }
        return Math.round(Math.random()*(m-n)+n);
    },
    hasPubProperty:function(obj,prop){//是否是公有属性
        return prop in obj && !(obj.hasOwnProperty(prop));
    },
    prev:function(ele){//获取上一个元素哥哥节点
        var pre=ele.previousSibling;
        while(pre&&pre.nodeType !=1){
            pre=pre.previousSibling;
        }
        return pre;
    },
    offset:function(ele){//获取一个元素距离body的 左偏移量 和 上偏移量
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
        return {left:l,top:t};
    },
    win:function(attr,val){////如果传了val擦书就是设置浏览器的可是窗口的attr属性 如果没有传值那么就是获取attr属性的值
        if(typeof val!='undefined'){
            document.documentElement[attr]=val;
            document.body[attr]=val;
        }
        return document.documentElement[attr]||document.body[attr]
    },
    getCss:function(ele,attr){//ele代表获取谁的样式 attr那个样式
        var val=null;
        if(window.getComputedStyle){
            val=window.getComputedStyle(ele,null)[attr];
        }else{
            if(attr='opacity'){
                val=ele.currentStyle['filter'];
                var reg=/^alpha\(opacity=(\d+(\.\d+)?)\)$/;
                val=reg.test(val)?reg.exec(val)[1]/100:1;
            }else{
                val=ele.currentStyle[attr]
            }
        }
        var reg=/^-?\d+(\.\d+)?(px|pt|em|rem|deg)?$/;
        if(reg.test(val)){
            val=parseFloat(val);
        }
        return val;
    },
    setCss:function(ele,attr,val){//给元素设置样式
        if(attr=='opacity'){
            ele.style.opacity=val;
            ele.style.filter='alpha(opacity='+val*100+')';
            return;
        }
        if(attr=='float'){
            ele.style.cssFloat=val;
            ele.style.styleFloat=val;
            return;
        }
        var reg=/^(width|height|left|right|bottom|(margin|padding)(Left|Top|Right|Bottom)?)$/;
        if(reg.test(attr)){
            if(!isNaN(val)){
                val+='px';
            }
        }
        ele.style[attr]=val;
    }
};

