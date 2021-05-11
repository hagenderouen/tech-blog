const $formLogin = $("#form-login");
const $inputEmail = $("#inputEmail");
const $inputUsername = $("#inputUsername");
const $inputPassword = $("#inputPassword");
const $msg = $("#msg-response");

$formLogin.submit(function(e) {
    e.preventDefault();
    const formData = {
        email: $inputEmail.val(),
        username: $inputUsername.val(),
        password: $inputPassword.val()
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
                $msg.text(data.error);
            });
        } else {
            window.location.replace('/');
        }
    })
    .catch((error) => {
        $msg.text((error));
    });

});