function platform() {
        var userAgentInfo = navigator.userAgent;
		var _platform = "";
        var Agents = ["Android", "iPhone",
                    "SymbianOS", "Windows Phone",
                    "iPad", "iPod"];
        var pcFlag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                pcFlag = false;
                break;
            }
        }
        
		if(pcFlag)
			_platform = "pc";
		if (userAgentInfo.indexOf('Android') > -1 || userAgentInfo.indexOf('Linux') > -1) {
			_platform = "android";
		} else if (userAgentInfo.indexOf('iPhone') > -1) {
			_platform = "ios";
		} else if (userAgentInfo.indexOf('Windows Phone') > -1) {
			_platform = "winphone";
		}
		
		return _platform;
    }
	
function isWeiXin(){ 
    var ua = navigator.userAgent.toLowerCase(); 
    if(ua.indexOf('micromessenger') != -1) { 
        return true; 
    } else { 
        return false; 
    } 
}