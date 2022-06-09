

const nameValidation = (event) => {
    const nameValidIcon = event.target.parentElement.children[0].children[0];

    if (event.target.value === '') {
        nameValidIcon.classList.remove('text-danger');
        nameValidIcon.classList.remove('text-success');
    }

    else if (/.{4,}/.test(event.target.value)) {

        nameValidIcon.classList.remove('text-danger');
        nameValidIcon.classList.add('text-success');


    } else {
        nameValidIcon.classList.remove('text-success');
        nameValidIcon.classList.add('text-danger');

    }
}

const phoneValidation = (event) => {
    const phoneValidIcon = event.target.parentElement.children[0].children[0];
    if (event.target.value === '') {
        phoneValidIcon.classList.remove('text-danger');
        phoneValidIcon.classList.remove('text-success');

    } else if (/.{4,}/.test(event.target.value)) {

        phoneValidIcon.classList.remove('text-danger');
        phoneValidIcon.classList.add('text-success');

    } else {
        phoneValidIcon.classList.remove('text-success');
        phoneValidIcon.classList.add('text-danger');
    }
}

const emailValidation = (event) => {
    const emailValidIcon = event.target.parentElement.children[0].children[0];
    if (event.target.value === '') {
        emailValidIcon.classList.remove('text-success');
        emailValidIcon.classList.remove('text-danger');
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {

        emailValidIcon.classList.remove('text-danger');
        emailValidIcon.classList.add('text-success');
    } else {
        emailValidIcon.classList.remove('text-success');
        emailValidIcon.classList.add('text-danger');
    }
}

const passwordValidation = (event) => {
    const passwordValidIcon = event.target.parentElement.children[0].children[0];
    if (event.target.value === '') {
        passwordValidIcon.classList.remove('text-danger');
        passwordValidIcon.classList.remove('text-success');
    } else if (/.{8,}/.test(event.target.value)) {
        passwordValidIcon.classList.remove('text-danger');
        passwordValidIcon.classList.add('text-success');
    } else {
        passwordValidIcon.classList.remove('text-success');
        passwordValidIcon.classList.add('text-danger');
    }
}

export { nameValidation, phoneValidation, emailValidation, passwordValidation };
