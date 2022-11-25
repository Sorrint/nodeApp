let text;
document.addEventListener('click', (event) => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id;
        removeNote(id).then(() => {
            event.target.closest('li').remove();
        });
    }
    if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id;
        const element = event.target.closest('li');
        text = element.firstElementChild.textContent;
        renderEditForm(element, text, id);
    }

    if (event.target.dataset.type === 'confirm') {
        const id = event.target.dataset.id;
        const element = event.target.closest('li');
        const editText = element.querySelector('.form-control').value;
        if (editText.trim() !== '') {
            text = editText.trim();
            editNote(id, text).then(() => {
                renderStaticForm(element, text, id);
            });
        } else {
            const isErrorMessage = element.querySelector('.error-message-block');
            if (!isErrorMessage) {
                const errorMessageSpan = document.createElement('span');
                errorMessageSpan.className = 'error-message-block alert alert-danger m-0 py-0';
                errorMessageSpan.textContent = 'Поле не может быть пустым!';
                element.firstElementChild.append(errorMessageSpan);
            }
        }
    }

    if (event.target.dataset.type === 'cancel') {
        const id = event.target.dataset.id;
        const element = event.target.closest('li');
        renderStaticForm(element, text, id);
    }
});

function renderEditForm(element, text, id) {
    element.innerHTML = `
    <div class="edit-title-form d-flex flex-column flex-md-fill me-5">
        <input class="form-control" name="title" value="${text}">
    </div>
    <div class="actions">
        <button class="btn btn-success confirm-button" data-type="confirm" data-id="${id}">Сохранить</button>
        <button class="btn btn-danger delete-button" data-type="cancel" data-id="${id}">Отменить</button>
    </div>`;
}

function renderStaticForm(element, text, id) {
    element.innerHTML = ` 
        <span class="title">${text}</span>
        <div class="actions">
            <button class="btn btn-primary" data-type="edit" data-id="${id}">Обновить</button>
            <button class="btn btn-danger" data-type="remove" data-id="${id}">&times;</button>
        </div>`;
}

async function removeNote(id) {
    return await fetch(`/${id}`, { method: 'DELETE' });
}

async function editNote(id, title) {
    return await fetch(`/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, title: title })
    });
}
