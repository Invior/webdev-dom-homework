export let token;

export const setToken = (newToken) => {
  token = newToken;
}



export function getCommentsList () {
  return fetch("https://wedev-api.sky.pro/api/v2/andrey-solyar/comments", {
  method: "GET"
})
}

export function postComment (text, user) {
  return fetch("https://wedev-api.sky.pro/api/v2/andrey-solyar/comments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: text.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
        name: user.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;")
      }),
    })
}

export function appLogin (login, password) {
  return fetch("https://wedev-api.sky.pro/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        login: login.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
        password: password.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;")
      }),
    })
}

export function appRegLogin (login, name, password) {
  return fetch("https://wedev-api.sky.pro/api/user", {
      method: "POST",
      body: JSON.stringify({
        login: login.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
        name: name.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
        password: password.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;")
      }),
    })
}