function hasClass(elements, cName) {
    return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)")); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
};

function addClass(elements, cName) {
    if (!hasClass(elements, cName)) {
        elements.className += " " + cName;
    };
};

function removeClass(elements, cName) {
    if (hasClass(elements, cName)) {
        elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " "); // replace方法是替换
    };
};

function checkLogin() {
    var request = new XMLHttpRequest();
    request.open('GET', '/users/checklogin', true);
    request.setRequestHeader("Content-type", "application/json");
    request.send();

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) { //验证请求是否发送成功
            var res = request.responseText; //获取到服务端返回的数据
            res = JSON.parse(res);
            if (res.state == 0) {
                document.getElementById('navigator-item-right1').innerHTML = '<a href="#">' + res.username + '</a>';
                document.getElementById('navigator-item-right2').innerHTML = '<a href="/users/logout">登出</a>';
            } else {
                document.getElementById('navigator-item-right1').innerHTML = '<a href="/login">登陆</a>';
                document.getElementById('navigator-item-right2').innerHTML = '<a href="/register">注册</a>';
            }
        }
    }
}

window.onload = function() {
    checkLogin();
}