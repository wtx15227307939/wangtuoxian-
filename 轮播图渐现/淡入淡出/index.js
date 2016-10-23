var banner=document.getElementById('banner');
var bannerInner=utils.getElesByClass('bannerInner',banner)[0];
var imgs=bannerInner.getElementsByTagName('img');
var focusList=utils.getElesByClass('focusList',banner)[0];
var lis=focusList.getElementsByTagName('li');
var leftBtn=utils.getElesByClass('left',banner)[0];
var rightBtn=utils.getElesByClass('right',banner)[0];
(function getData(){
    var xhr=new XMLHttpRequest();
    xhr.open('get','data.txt?_='+Math.random(),false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
            window.data=utils.jsonParse(xhr.responseText);
        }
    };
    xhr.send(null);
})();
console.log(data);
//
(function (){
    if(window.data){
        var str="";
        var strLi="";
        for(var i=0;i<data.length;i++){
            var curDate=data[i];
            str+='<div><img src="" trueSrc="'+curDate.src+'"/></div>';
            strLi+=i==0?'<li class="selected"></li>':'<li></li>';
        }
        bannerInner.innerHTML=str;
        focusList.innerHTML=strLi;
    }
})();
window.setTimeout(img,300);
function img(){
    for(var i=0;i<imgs.length;i++){
        if(i==0){
            utils.css(imgs[i].parentNode,'zIndex',1);
            animate(imgs[i].parentNode,{opacity:1},300)
        }
        (function(i){
            var curImg=imgs[i];
            var oImg=new Image();
            oImg.src=curImg.getAttribute('trueSrc');
            oImg.onload=function(){
                curImg.src=this.src;
                utils.css(curImg,'display','block')
            }
        })(i)
    }
}
var step=0;
var timer=window.setInterval(autoM,2000);
function autoM(){
    if(step==data.length-1){
        step=-1;
    }
    step++;
    a();
};
function a(){
    for(var i=0;i<imgs.length;i++){
        if(step==i){
            utils.css(imgs[i].parentNode,'zIndex',1);
            animate(imgs[i].parentNode,{opacity:1},300,function(){
                var siblings=utils.siblings(this);
                for(var i=0;i<siblings.length;i++){
                    utils.css(siblings[i],'opacity',0);
                }
            })
        }else{
            utils.css(imgs[i].parentNode,'zIndex',0);
        }
    }
    for(var i=0;i<lis.length;i++){
        lis[i].className=step==i?'selected':'';
    }
};
banner.onmouseover=function(){
    window.clearInterval(timer);

}