// Promise 方式的AJAX

function ajax (url) {
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest()
        xhr.open('GET',url)
        xhr.responseType= 'json'
        xhr.onload = function(){
            if(this.status === 200){
                resolve(this.response)
            }else {
                reject(new Error(this.statusText))
            }
        }
        xhr.send()
    })
}

var promise = ajax('/api/users.json')

var promise2 = promise.then(
    function onFulfilled(val){
        console.log(val);
    },
    function onRejected(val){
        console.log(val);
    },
)