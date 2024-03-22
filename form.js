import { appLogin, token, setToken, appRegLogin, } from './api.js';
import { renderCommentsForm, setValue, commentList } from './comments.js';

export const clickEnterButton = () => {
    const enterButton = document.getElementById('add-enter-button');
    const login = document.getElementById('form-login-name');
    const password = document.getElementById('form-password');
    commentList.classList.add('hide');
    enterButton.addEventListener('click', () => {
        appLogin(login, password)
            .then((response) => {
                if (response.status === 400) {
                    throw new Error('Логин или пароль неверны');
                } else {
                    return response.json();
                }
            })
            .then((responseData) => {
                renderCommentsForm();
                setValue(responseData.user.name);
                setToken(responseData.user.token);
                console.log(token);
            })
            .catch((error) => {
                alert(error.message);
                console.log(error.message);
            })
    });
};

export const clickRegFormButton = () => {
    const regFormButton = document.getElementById('add-regform-button');
    const login = document.getElementById('form-login-name');
    const userName = document.getElementById('form-username');
    const password = document.getElementById('form-password');
    regFormButton.addEventListener('click', () => {
        appRegLogin(login, userName, password)
            .then((response) => {
                if (response.status === 400) {
                    throw new Error('Пользователь с таким логином уже существует');
                } else {
                    return response.json();
                }
            })
            .then((responseData) => {
                renderCommentsForm();
                setValue(responseData.user.name);
                setToken(responseData.user.token);
                console.log(token);
            })
            .catch((error) => {
                alert(error.message);
            })
    });
};


export const clickRegButton = () => {
    const regButton = document.getElementById('add-reg-button');
    const regFormButton = document.getElementById('add-regform-button');
    const login = document.getElementById('form-login-name');
    const userName = document.getElementById('form-username');
    const password = document.getElementById('form-password');
    const enterButton = document.getElementById('add-enter-button');
    regButton.addEventListener('click', () => {
        if (regButton.textContent === 'Регистрация') {
            userName.classList.remove('hide');
            login.placeholder = "Придумайте логин";
            password.placeholder = "Придумайте пароль";
            enterButton.classList.add('hide');
            regFormButton.classList.remove('hide');
            regButton.textContent = 'Вход';
        } else {
            userName.classList.add('hide');
            login.placeholder = "Введите ваш логин";
            password.placeholder = "Введите ваш пароль";
            enterButton.classList.remove('hide');
            regFormButton.classList.add('hide');
            regButton.textContent = 'Регистрация';
        }
    });
};

export const renderRegForm = () => {
    const regForm = document.getElementById('add-login');
    const regFormNew = `
    <input type="text" class="add-login-name hide" id="form-username" placeholder="Введите ваше имя" />
        <input type="text" class="add-login-name" id="form-login-name" placeholder="Введите ваш логин" />
        <input type="password" class="add-login-name" id="form-password" placeholder="Введите ваш пароль" />
        <label><input type="checkbox" id="password-checkbox"> Показать пароль</label>
        <button class="add-login-button" id="add-enter-button">Войти</button>
        <button class="add-login-button hide" id="add-regform-button">Зарегистрироваться</button>
        <button class="add-reg-button" id="add-reg-button">Регистрация</button>
    `;
    regForm.innerHTML = regFormNew;
    seePassword();
    clickRegButton();
    clickRegFormButton();
    clickEnterButton();
}

export const seePassword = () => {
    const checkbox = document.getElementById('password-checkbox');
    const password = document.getElementById('form-password');
    checkbox.addEventListener('click', () => {
        if (password.getAttribute('type') == 'password') {
            password.removeAttribute('type');
            password.setAttribute('type', 'text');
        } else {
            password.removeAttribute('type');
            password.setAttribute('type', 'password');
        }
    });
};