
const Utils = {
    getResponseFromApi(url, method, beforeStartCallback, dataCallBack) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.onloadstart = (e) => beforeStartCallback(e);
        
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4 && xhr.status === 200) {
                const data = xhr.responseText ;
                dataCallBack(JSON.parse(data));                
            }
        }
        xhr.send();
    }
};


export default Utils;