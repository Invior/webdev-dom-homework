import { getCommentsList, postComment } from './api.js';
import { initLikeButtons } from './likes.js';

const commentList = document.getElementById('comments');
const nameUser = document.getElementById('form-name');
const textComment = document.getElementById('form-text');
const preloader = document.getElementById('preloader');

export const getComments = ({ userComments }) => {
    getCommentsList()
        .then((response) => {
            return response.json()
        })
        .then((responseText) => {
            const textData = responseText.comments.map((comment) => {
                return {
                    id: comment.id,
                    name: comment.author.name,
                    date: new Date(comment.date),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false
                };
            });
            preloader.classList.add("hide");
            userComments = textData;
            renderComments({ userComments });
        })
        .catch((error) => {
            alert('Что-то пошло не так. Попробуйте позже');
            console.log(error);
        })
}

export const initAnswerComment = () => {
    const answerComment = document.querySelectorAll(".comment");
    answerComment.forEach((comment) => {
        comment.addEventListener('click', (event) => {
            const userName = event.currentTarget.querySelector('.comment-name').textContent;
            const text = event.currentTarget.querySelector('.comment-text').textContent.trim();
            textComment.value = `-${text} \n - ${userName} \n`;
            renderComments({ userComments });
        });
    });
};

export const renderComments = ({ userComments }) => {
    const commentsHtml = userComments.map((userComment, index) => {
        return `<li class="comment" data-id="${userComment.id} data-index="${index}">
        <div class="comment-header">
          <div data-name="${name}" class="comment-name">${userComment.name}</div>
          <div>${userComment.date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</div>
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
    initLikeButtons({ userComments });
    initAnswerComment();
};

export function postComments ({addButton, userComments}) {
    const oldList = commentList.innerHTML;
  nameUser.classList.remove("error");
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
        nameUser.value = '';
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