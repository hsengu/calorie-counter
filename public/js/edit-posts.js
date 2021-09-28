async function delBtnHandler(event) {
    event.preventDefault();

    const id = event.target.value;
    const form = $('#update-form')[0];
    const formData = new FormData(form);

    await fetch(`/api/post/${id}`, {
        method: 'DELETE',
        body: formData
    }).then(response => {
        if(response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    });
};

async function updateBtnHandler(event) {
    event.preventDefault();
    const id = event.target.value;

    console.log(id);

    await fetch(`/api/post/${id}`, {
        method: 'GET'
    }).then(response => {
        if(response.ok){
            return response.json();
        }
        else
            console.log(response.statusText);
    }).then(data => {
        $('#update-food')[0].value = data.foods;
        $('#update-calories')[0].value = data.calories;
        $('#update-post-btn')[0].value = id;
        $('#delete-post-btn')[0].value = id
    });
};

async function updatePostHandler(event) {
    event.preventDefault();
    const id = $('#update-post-btn')[0].value;
    const form = $('#update-form')[0];

    const formData = new FormData(form);

    await fetch(`/api/post/${id}`, {
        method: 'PUT',
        body: formData
    }).then(response => {
        if(response.ok)
            document.location.replace('/tracking');
        else
            console.log(response.statusText);
    });
};

document.querySelector('.btn-delete').addEventListener('click', delBtnHandler);
document.querySelector('.posts').addEventListener('click', updateBtnHandler);
document.querySelector('#update-post-btn').addEventListener('click', updatePostHandler);