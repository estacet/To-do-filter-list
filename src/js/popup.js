document.getElementById('js-open-popup').addEventListener('click', e => {
    e.preventDefault();

    document.getElementById('js-popup').style.display = 'block';
    document.getElementById('js-popup-form').style.display = 'block';
    document.getElementById('newTaskTitle').setAttribute('autofocus', 'autofocus');
});

document.getElementById('js-popup').addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('js-popup').style.display = 'none';
    document.getElementById('js-popup-form').style.display = 'none';
});

document.getElementById('newTaskCancel').addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('js-popup').style.display = 'none';
    document.getElementById('js-popup-form').style.display = 'none';
});
