var _at = {}; 

_at.domain = "//" + window.location.hostname; 

_at.manifest = "//" + window.location.hostname + "/_common/js/service-workers/neptuneads/manifest.json";
_at.worker = "//" + window.location.hostname + "/_common/js/service-workers/neptuneads/service-worker.js";
_at.owner = "222"; 
_at.idSite = "rvsh";
_at.attributes = {
    'url' : window.location.href,
    'ts' : (new Date()).getTime()
}; 
_at.attributes.aff_id = "1163";
_at.attributes.aff_s2 = "f52cbe34-f3d7-11eb-8e34-47db99131c6c";
_at.webpushid = ""; 

try {
	_at.attributes.userAgent = '';
	if (typeof navigator != 'undefined' && navigator.userAgent) {
		_at.attributes.userAgent = navigator.userAgent;
	}
} catch (e) {}

try {	
    _at.attributes.url = window.location.href;
	
		(function() { var u='//pushrev.neptuneadspush.com';var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'/javascripts/trackpush-v2-vapid.js?v=1&custom=true'; s.parentNode.insertBefore(g,s); })();
	} catch (e) {
	console.log(e);
} 