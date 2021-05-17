const $logoutBtn = $("#logout");
const $postForm = $("#post-form");
const $inputTitle = $("#inputTitle");
const $inputContent = $("#inputContent");

$logoutBtn.on('click', () => {
    fetch('/api/users/logout', {
        method: 'POST',
    }).then(() => {
        window.location.replace('/');
    });
});

$postForm.on('submit', (e) => {
    console.log('Post submitted!');
    e.preventDefault();
    const postFormData = {
        title: $inputTitle.val(),
        content: $inputContent.val()
    }
    
    fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postFormData)
    }).then((res) => {
        if (!res.ok) {
            console.log(res);
        }
        window.location.reload();
    }).catch(err => {
        console.log(err);
    })
})