
const Utils = {
    getResponseFromApi(url, method, beforeStartCallback, progressCallback, endedCallback, dataCallBack) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.onprogress = (e) => progressCallback(e); 
        
        xhr.onloadstart = (e) => beforeStartCallback(e);
        
        xhr.onloadend = (e) => endedCallback(e);

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