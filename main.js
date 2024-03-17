"use strict";
import { getComments, postComments } from './comments.js';

const addButton = document.getElementById('add-form-button');
let userComments = [];

getComments({ userComments });

addButton.addEventListener("click", () => {
  postComments({addButton, userComments});
});
