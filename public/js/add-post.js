function addBtnHandler(event) {
    event.preventDefault();
    $('#add-post-modal').on('shown.bs.modal', function () {
        $('#post-title').trigger('focus')
    });
};

async function newFormHandler(event) {
    event.preventDefault();

    const form = $('#post-form')[0];
    const formData = new FormData(form);

    await fetch('/api/post', {
        method: 'POST',
        body: formData
    }).then(response => {
        console.log(response);
        if (response.ok) {
            document.location.replace('/tracking');
        } else {
            alert(response.statusText);
        }
    });
};

document.querySelector('#publish-btn').addEventListener('click', newFormHandler);
document.querySelector('.add-post-btn-form').addEventListener('click', addBtnHandler);