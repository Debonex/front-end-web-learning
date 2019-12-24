var saved;
if (typeof window.onload == 'function') {
    saved = window.onload;
}

window.onload = function() {
    if (saved)
        saved();
    document.getElementById('button-register').onclick = function() {
        window.location.href = '/register';
    }

    var inputUsername = document.getElementById('input-username');
    var inputPassword = document.getElementById('input-password');
    var noteUsername = document.getElementById('note-username');
    var notePassword = document.getElementById('note-password');

    var checkform = function() {
        removeClass(inputUsername, 'input-fault');
        removeClass(inputPassword, 'input-fault');
        addClass(noteUsername, 'hidden');
        addClass(notePassword, 'hidden');
        var flag = true;
        var username = inputUsername.value;
        var password = inputPassword.value;
        if (username == '') {
            flag = false;
            addClass(inputUsername, 'input-fault');
            removeClass(noteUsername, 'hidden');
            noteUsername.innerHTML = '用户名不能为空';
        }
        if (password == '') {
            flag = false;
            addClass(inputPassword, 'input-fault');
            removeClass(notePassword, 'hidden');
            notePassword.innerHTML = '密码不能为空';
        }
        return flag;
    }

    var postform = function() {
        var username = inputUsername.value;
        var password = inputPassword.value;
        var user = {
            username: username,
            password: password
        }
        var request = new XMLHttpRequest();
        request.open('POST', '/users/login', true);
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(user));

        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) { //验证请求是否发送成功
                var res = request.responseText; //获取到服务端返回的数据
                res = JSON.parse(res);
                if (res.state == 0) {
                    removeClass(document.getElementsByClassName('success-container')[0], 'hidden');
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 800);
                } else if (res.state == 1) {
                    addClass(inputUsername, 'input-fault');
                    addClass(inputPassword, 'input-fault');
                    removeClass(notePassword, 'hidden');
                    notePassword.innerHTML = '用户名或密码错误';
                }
            }
        }
    }

    document.getElementById('button-submit').onclick = function() {
        if (checkform())
            postform();
    }
}