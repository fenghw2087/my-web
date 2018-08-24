export const objToBase64 =( obj )=> {
    try{
        return window.btoa(encodeURIComponent(JSON.stringify(obj)))
    }catch (e) {
        return '{}'
    }
};

export const base64ToObj =( str )=>{
    try{
        return JSON.parse(decodeURIComponent(window.atob(str)))
    }catch (e) {
        return {}
    }
};