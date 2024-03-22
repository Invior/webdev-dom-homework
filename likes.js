import { renderCommentsWithAuth, userComments } from './comments.js';

export const initLikeButtons = () => {
    const likeButtonElements = document.querySelectorAll('.like-button');
    for (const likeButtonElement of likeButtonElements) {
      likeButtonElement.addEventListener("click", (event) => {
        event.stopPropagation();
        const index = likeButtonElement.dataset.index;
        if (userComments[index].isLiked === false) {
          userComments[index].isLiked = true;
          userComments[index].likes += 1;
        } else {
          userComments[index].isLiked = false;
          userComments[index].likes -= 1;
        }
        renderCommentsWithAuth({userComments});
      });
    }
  };