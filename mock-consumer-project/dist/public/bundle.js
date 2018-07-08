
function sayHello (selector) {
  var el = document.querySelector(selector)
  el.innerHTML = '<p>Hello!</p>'
}

document.addEventListener('DOMContentLoaded', function (event) {
  sayHello('#root')
})
