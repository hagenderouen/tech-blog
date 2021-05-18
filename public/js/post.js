const $postForm = $("#post-form");
const $inputTitle = $("#inputTitle");
const $inputContent = $("#inputContent");

$postForm.on('submit', (e) => {
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
        if (!res.ok) console.log(res);
        else window.location.reload();
    }).catch(err => {
        console.log(err);
    });
});