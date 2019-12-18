window.onload = function() {

    var inputUsername = document.getElementById('input-username');
    var inputPassword = document.getElementById('input-password');
    var inputPassword2 = document.getElementById('input-password2')
    var noteUsername = document.getElementById('note-username');
    var notePassword = document.getElementById('note-password');
    var notePassword2 = document.getElementById('note-password2');

    var checkform = function() {
        var flag = true;
        var username = inputUsername.value;
        var password = inputPassword.value;
        var password2 = inputPassword2.value;
        removeClass(inputUsername, 'input-fault');
        removeClass(inputPassword, 'input-fault');
        removeClass(inputPassword2, 'input-fault');
        addClass(noteUsername, 'hidden');
        addClass(notePassword, 'hidden');
        addClass(notePassword2, 'hidden');
        if (username === '') {
            flag = false;
            addClass(inputUsername, 'input-fault');
            noteUsername.innerHTML = "用户名不能为空！";
            removeClass(noteUsername, 'hidden');
        }
        if (password === '') {
            flag = false;
            addClass(inputPassword, 'input-fault');
            notePassword.innerHTML = "密码不能为空！";
            removeClass(notePassword, 'hidden');
        }
        if (password2 === '') {
            flag = false;
            addClass(inputPassword2, 'input-fault');
            notePassword2.innerHTML = "确认密码不能为空！";
            removeClass(notePassword2, 'hidden');
        }
        if (password !== '' && password2 !== '' && password !== password2) {
            flag = false;
            addClass(inputPassword2, 'input-fault');
            notePassword2.innerHTML = "两次密码输入不一致！";
            removeClass(notePassword2, 'hidden');
        }
        console.log(username);
        return flag;
    };

    var postFrom = function() {
        var username = document.getElementById('input-username').value;
        var password = document.getElementById('input-password').value;
        var user = {
            username: username,
            password: password
        }
        var httpRequest = new XMLHttpRequest();
        httpRequest.open('POST', '/users/register', true);
        httpRequest.setRequestHeader("Content-type", "application/json");
        httpRequest.send(JSON.stringify(user));

        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) { //验证请求是否发送成功
                var res = httpRequest.responseText; //获取到服务端返回的数据
                res = JSON.parse(res);
                if (res.state == 0) {
                    var containerSucc = document.getElementsByClassName('success-container')[0];
                    console.log(containerSucc);
                    removeClass(containerSucc, 'hidden');
                    var time = 5;
                    setInterval(() => {
                        containerSucc.innerHTML = '注册成功！' + time + '秒后跳转到登录页面！';
                        time--;
                    }, 1000);
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 5000);
                } else if (res.state == 1 || res.state == 2) {
                    addClass(inputUsername, 'input-fault');
                    removeClass(noteUsername, 'hidden');
                    noteUsername.innerHTML = res.message;
                } else if (res.state == 3) {
                    addClass(inputPassword, 'input-fault');
                    removeClass(notePassword, 'hidden');
                    notePassword.innerHTML = res.message;
                }
            }
        };
    }

    document.getElementById('button-submit').onclick = function() {
        if (checkform())
            postFrom();
    }
}