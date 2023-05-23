const element = document.getElementById('btn')

element.addEventListener('click', displayDate)

function displayDate() {
  document.getElementById('btn').innerHTML = Date()
}
