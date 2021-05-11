const $logout = $("#logout");

$logout.on('click', () => {
    fetch('/api/users/logout', {
        method: 'POST',
    }).then(() => {
        window.location.replace('/');
    });
});