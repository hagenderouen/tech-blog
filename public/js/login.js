const $formLogin = $("#form-login");
const $inputEmail = $("#inputEmail");
const $inputPassword = $("#inputPassword");
const $msg = $("#msg-response");

$formLogin.submit(function(e) {
    e.preventDefault();
    const formData = {
        email: $inputEmail.val(),
        password: $inputPassword.val()
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