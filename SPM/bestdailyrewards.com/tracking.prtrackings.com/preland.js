var d = document.getElementsByTagName('a'), i = d.length;
var to = getParameterByName('to');

if(to !== "") {
    afurl = base64_decode(to);
}else{
    if(getParameterByName('afclick')){
        afurl = afurl + '?afclick=' + getParameterByName('afclick');
    }
}

while(i--){
    d[i].setAttribute('href', afurl);
    d[i].setAttribute('target','_blank');
}

function base64_decode( data ) {

    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='';

    do {
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));

        bits = h1<<18 | h2<<12 | h3<<6 | h4;

        o1 = bits>>16 & 0xff;
        o2 = bits>>8 & 0xff;
        o3 = bits & 0xff;

        if (h3 == 64)	  enc += String.fromCharCode(o1);
        else if (h4 == 64) enc += String.fromCharCode(o1, o2);
        else			   enc += String.fromCharCode(o1, o2, o3);
    } while (i < data.length);

    return enc;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);

    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
