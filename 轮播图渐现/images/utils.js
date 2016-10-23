var utils={
    listToArray:function(likeArray){//������ת��Ϊ����
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
    getRandom:function(n,m){//��ȡn-m֮����������
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
    hasPubProperty:function(obj,prop){//�Ƿ��ǹ�������
        return prop in obj && !(obj.hasOwnProperty(prop));
    },
    prev:function(ele){//��ȡ��һ��Ԫ�ظ��ڵ�
        var pre=ele.previousSibling;
        while(pre&&pre.nodeType !=1){
            pre=pre.previousSibling;
        }
        return pre;
    },
    offset:function(ele){//��ȡһ��Ԫ�ؾ���body�� ��ƫ���� �� ��ƫ����
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
    win:function(attr,val){////�������val�����������������Ŀ��Ǵ��ڵ�attr���� ���û�д�ֵ��ô���ǻ�ȡattr���Ե�ֵ
        if(typeof val!='undefined'){
            document.documentElement[attr]=val;
            document.body[attr]=val;
        }
        return document.documentElement[attr]||document.body[attr]
    },
    getCss:function(ele,attr){//ele�����ȡ˭����ʽ attr�Ǹ���ʽ
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
    setCss:function(ele,attr,val){//��Ԫ��������ʽ
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

