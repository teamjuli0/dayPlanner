var container = document.querySelector('.container')
var plannerArr = localStorage.getItem('plannerArr') || '{}'
var dt = luxon.DateTime
var now = dt.now()

document.getElementById('currentDay').innerText = now.toLocaleString(
  dt.DATETIME_MED
)

var currentTime = 9
for (var i = 0; i < 8; i++) {
  var pTime =
    currentTime === 12
      ? currentTime + 'PM'
      : currentTime >= 13
      ? currentTime - 12 + 'PM'
      : currentTime + 'AM'

  var hourRow = `<div class="row time-block">
    <p class="col-1 hour">${pTime}</p>
    <textarea id='${currentTime}' class="col-10 description"></textarea>
    <button class="col-1 saveBtn"><i class="fas fa-save"></i></button>
  </div>`

  container.innerHTML += hourRow

  currentTime++
}

for (var i = 0; i < 8; i++) {
  var currentRow = document.getElementsByClassName('saveBtn')[i]
  var previousEl = currentRow.previousElementSibling
  var parsedPlanner = JSON.parse(plannerArr)

  switch (true) {
    case now.hour > JSON.parse(previousEl.id):
      previousEl.classList.add('past')
      break
    case now.hour === JSON.parse(previousEl.id):
      previousEl.classList.add('present')
      break
    default:
      previousEl.classList.add('future')
      break
  }

  if (parsedPlanner[previousEl.id] !== undefined) {
    previousEl.value = parsedPlanner[previousEl.id]
  }

  currentRow.addEventListener('click', function () {
    parsedPlanner[
      this.previousElementSibling.id
    ] = this.previousElementSibling.value

    localStorage.setItem('plannerArr', JSON.stringify(parsedPlanner))
  })
}
