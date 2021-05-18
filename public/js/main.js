const $formLogin = $("#form-login");
const $loginInputEmail = $("#loginInputEmail");
const $loginInputPassword = $("#loginInputPassword");
const $logoutBtn = $("#logout");
const $loginMsg = $("#login-msg");
const $formRegister = $("#form-register");
const $regInputEmail = $("#registerInputEmail");
const $regInputUsername = $("#registerInputUsername");
const $regInputPassword = $("#registerInputPassword");
const $regMsg = $("#register-msg");
const $post = $(".post");

$formLogin.submit(function(e) {
    e.preventDefault();
    const formData = {
        email: $loginInputEmail.val(),
        password: $loginInputPassword.val()
    };
    
    fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
    })
    .then((response) => {
        if (!response.ok) {
            response.json().then((data) => {
                $loginMsg.text(data.error);
            });
        } else {
            window.location.replace('/');
        }
    })
    .catch((error) => {
        $loginMsg.text((error));
    });

});

$logoutBtn.on('click', () => {
    fetch('/api/users/logout', {
        method: 'POST',
    }).then(() => {
        window.location.replace('/');
    });
});

$formRegister.submit(function(e) {
    e.preventDefault();
    const formData = {
        email: $regInputEmail.val(),
        username: $regInputUsername.val(),
        password: $regInputPassword.val()
    };
    
    fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
    })
    .then((response) => {
        if (!response.ok) {
            response.json().then((data) => {
                $regMsg.text(data.error);
            });
        } else {
            window.location.replace('/');
        }
    })
    .catch((error) => {
        $regMsg.text((error));
    });

});

$post.on('click', (e) => {
    const postId = e.currentTarget.dataset.id;
    window.location.replace(`/post/${postId}`);
});