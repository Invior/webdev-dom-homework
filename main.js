"use strict";
import { getComments } from './comments.js';
import { renderRegForm } from './form.js';

const authButton = document.getElementById('authButton');
const formLogin = document.getElementById('add-login');
const auth = document.getElementById('auth');

getComments();

authButton.addEventListener('click', () => {
  formLogin.classList.remove('hide');
  auth.classList.add('hide');
  renderRegForm();
});