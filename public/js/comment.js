const $commentForm = $("#comment-form");
const $commentInput = $("#commentInput");
const $postId = $(".post").data("id");

$commentForm.on('submit', (e) => {
    e.preventDefault();
    const commentFormData = {
        content: $commentInput.val(),
    }

    fetch(`/api/comments?postId=${$postId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentFormData)
    }).then((res) => {
        if (!res.ok) console.log(res);
        else window.location.reload();
    }).catch(err => {
        console.log(err);
    });
});