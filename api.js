export function getCommentsList () {
  return fetch("https://wedev-api.sky.pro/api/v1/andrey-solyar/comments", {
  method: "GET"
})
}

export function postComment (text, user) {
  return fetch("https://wedev-api.sky.pro/api/v1/andrey-solyar/comments", {
      method: "POST",
      body: JSON.stringify({
        text: text.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
        name: user.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;")
      }),
    })
}