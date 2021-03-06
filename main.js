var endpoint = "https://jsonbox.io/box_ccb774670a8882eb3725";

function geturl(){
    var url = document.getElementById("urlinput").value;
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    if(!protocol_ok){
        newurl = "http://"+url;
        return newurl;
        }
    else{
            return url;
        }
}

function getrandom() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function genhash(){
    if (window.location.hash == ""){
        window.location.hash = getrandom();
    }
}

function send_request(url) {
    this.url = url;
        $.ajax({
        'url': endpoint + "/" + window.location.hash.substr(1),
        'type': 'POST',
        'data': JSON.stringify({url: this.url }),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
})
}



function shorturl(){
    var longurl = geturl();
    genhash();
    send_request(longurl);
}

var hashh = window.location.hash.substr(1)

if (window.location.hash !== "") {
    $.getJSON(endpoint + "/" + hashh, function (data) {
        var obj = data.find(o => o._collection === window.location.hash)
        var shorturl = obj.url;
        console.log(obj)
        console.log(shorturl)
        if (obj !== null) {
            window.location.href = shorturl;
        }
    });
}
