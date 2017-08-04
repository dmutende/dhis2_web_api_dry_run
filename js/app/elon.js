//Created by elon @Jul 28, 2017 : 1935Hrs

/* -----------------------------  Request HEADERS  ----------------------------- */
// Provides Authorization Header Content
function setAuth(authType, accessToken){
    if(authType===AUTHORIZATION_BASIC){
        return AUTHORIZATION_BASIC+WHITE_SPACE+Base64.encode(accessToken)
    }else if(authType===AUTHORIZATION_BEARER){
        return AUTHORIZATION_BEARER+WHITE_SPACE+accessToken
    }else{return accessToken}
}
/* ----------------------------- End Of  Request HEADERS  ----------------------------- */

/* -----------------------------  Storage  ----------------------------- */
// Storage Access Object
var Storage = {
    write:function(k,v) {
        store.setItem(k,v);
    },
    read:function(k,ajaxConfig,callback){
        store.getItem(k, function(error, value){
            callback(value, ajaxConfig);
        });
    },
    delete:function(k){
        store.removeItem(k);
        console.log("Key: "+k+" deleted successfully");
    },
    clear:function(){
        store.clear();
    }
};
/* -----------------------------  End Of Storage  ----------------------------- */

/* -----------------------------  Resizable Loader  ----------------------------- */
// Returns HTML for loader
function getLoader(size)
{return "" +
    "<svg class='spinner' width='"+size+"' height='"+size+"' viewBox='0 0 66 66' xmlns='http://www.w3.org/2000/svg'>" +
    "   <circle class='path' fill='none' stroke-width='6' stroke-linecap='round' cx='33' cy='33' r='30'></circle>" +
    "</svg>"
}
/* ----------------------------- End Of  Resizable Loader  ----------------------------- */

/* -----------------------------  API Post  ----------------------------- */
// Returns Makes AJAX Request and Executes Callback
function dhis2ApiPost(ajaxConfig){
    $('#'+ajaxConfig.loaderId).html(getLoader(ajaxConfig.loaderSize));
    $.ajax({
        async: ajaxConfig.async,
        url: ajaxConfig.url,
        type: ajaxConfig.method,
        dataType: ajaxConfig.dataType,
        data: ajaxConfig.data,
        contentType: ajaxConfig.contentType,
        headers: ajaxConfig.headers,
        success:function (response) {
            console.log("dhis2ApiPost successful");
            ajaxConfig.callback(response, ajaxConfig);
        },
        error:function (xhr, errMsg, err) {
            console.log("Error XHR @ dhis2ApiPost: "+xhr.status + ": " + xhr.responseText);
            console.log("Error (error) @ dhis2ApiPost: "+errMsg + ": " + err);
        }
    });
}

// Base64 Object
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
/* ----------------------------- End Of  BASE64  ----------------------------- */

/* ----------------------------- End Of  API Post  ----------------------------- */