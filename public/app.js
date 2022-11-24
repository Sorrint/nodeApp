document.addEventListener('click', (event) => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id;
        removeNote(id).then(() => {
            event.target.closest('li').remove();
        });
    }
    if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id;
        let span = event.target.closest('li').firstElementChild;
        const textInit = span.textContent;
        const editText = prompt('Введите новое название', textInit);

        if (editText && editText.trim() !== '') {
            editNote(id, editText.trim()).then(() => {
                span.textContent = editText.trim();
            });
        }
    }
});

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
