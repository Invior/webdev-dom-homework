import { getCommentsList, postComment, token } from './api.js';
import { initLikeButtons } from './likes.js';
import { format } from "date-fns";


export const commentList = document.getElementById('comments');
const preloader = document.getElementById('preloader');
export let userComments = [];


export const setValue = (newValue) => {
  const nameUser = document.getElementById('form-name');
  nameUser.value = newValue;
}

export const getComments = () => {
  getCommentsList()
    .then((response) => {
      return response.json()
    })
    .then((responseText) => {
      const textData = responseText.comments.map((comment) => {
        return {
          id: comment.id,
          name: comment.author.name,
          date: format(new Date(comment.date), "yyyy-MM-dd HH:mm:ss"),
          text: comment.text,
          likes: comment.likes,
          isLiked: false
        };
      });
      if (token === undefined) {
        preloader.classList.add("hide");
        userComments = textData;
        renderComments({ userComments });
      } else {
        preloader.classList.add("hide");
        userComments = textData;
        renderCommentsWithAuth({ userComments });
      }

    })
    .catch((error) => {
      alert('Что-то пошло не так. Попробуйте позже');
      console.log(error);
    })
}

export const initAnswerComment = () => {
  const answerComment = document.querySelectorAll(".comment");
  const textComment = document.getElementById('form-text');
  answerComment.forEach((comment) => {
    comment.addEventListener('click', (event) => {
      const userName = event.currentTarget.querySelector('.comment-name').textContent;
      const text = event.currentTarget.querySelector('.comment-text').textContent.trim();
      textComment.value = `-${text} \n - ${userName} \n`;
      renderCommentsWithAuth({ userComments });
    });
  });
};

export const renderComments = ({ userComments }) => {
  const commentsHtml = userComments.map((userComment, index) => {
    return `<li class="comment" data-id="${userComment.id} data-index="${index}">
        <div class="comment-header">
          <div data-name="${name}" class="comment-name">${userComment.name}</div>
          <div>${userComment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${userComment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${userComment.likes}</span>
            <button data-index="${index}" class="like-button ${userComment.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
          </div>
        </div>
      </li>`;
  }).join('');
  commentList.innerHTML = commentsHtml;
};

export const renderCommentsWithAuth = ({ userComments }) => {
  const commentsHtml = userComments.map((userComment, index) => {
    return `<li class="comment" data-id="${userComment.id} data-index="${index}">
        <div class="comment-header">
          <div data-name="${name}" class="comment-name">${userComment.name}</div>
          <div>${userComment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${userComment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${userComment.likes}</span>
            <button data-index="${index}" class="like-button ${userComment.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
          </div>
        </div>
      </li>`;
  }).join('');
  commentList.innerHTML = commentsHtml;
  initAnswerComment();
  initLikeButtons();
};

export function postComments() {
  const textComment = document.getElementById('form-text');
  const nameUser = document.getElementById('form-name');
  const addButton = document.getElementById('add-form-button');
  const oldList = commentList.innerHTML;
  textComment.classList.remove("error");
  if (nameUser.value.trim() === "") {
    nameUser.classList.add("error");
    return;
  } else if (textComment.value.trim() === "") {
    textComment.classList.add("error");
  } else {
    addButton.disabled = true;
    addButton.textContent = "Комментарий добавляется";
    postComment(textComment, nameUser)
      .then((response) => {
        if (response.status === 500) {
          throw new Error('Сервер сломался');
        } else if (response.status === 400) {
          throw new Error('Плохой запрос');
        } else {
          return response.json()
        }
      })
      .then((responseText) => {
        userComments = responseText.comments;
        return getComments({ userComments });
      })
      .then((data) => {
        addButton.disabled = false;
        addButton.textContent = "Написать";
        textComment.value = '';
      })
      .catch((error) => {
        if (error.message === 'Плохой запрос') {
          addButton.disabled = false;
          addButton.textContent = "Написать";
          alert('Имя и текст должны содержать не менее 3 символов');
        } else if (error.message === 'Сервер сломался') {
          addButton.disabled = false;
          addButton.textContent = "Написать";
          alert('Возникли неполадки. Попробуйте позже');
        } else {
          addButton.disabled = false;
          addButton.textContent = "Написать";
          alert('Что-то пошло не так. Попробуйте позже');
          console.log(error);
        }
      })
  }
}

export const renderCommentsForm = () => {
  const commentsForm = `<input type="text" class="add-form-name" id="form-name" readonly="readonly"/>
  <textarea type="textarea" class="add-form-text" id="form-text" placeholder="Введите ваш коментарий"
    rows="4"></textarea>
  <div class="add-form-row">
    <button class="add-form-button" id="add-form-button">Написать</button>
  </div>`;
  const addForm = document.getElementById('add-form');
  const formLogin = document.getElementById('add-login');
  addForm.innerHTML = commentsForm;
  addForm.classList.add('add-form');
  commentList.classList.remove('hide');
  formLogin.classList.add('hide');
  clickAddButton();
  initAnswerComment();
  initLikeButtons();
};

export const clickAddButton = () => {
  const addButton = document.getElementById('add-form-button');
  addButton.addEventListener("click", () => {
    postComments(addButton, userComments);
  });
}