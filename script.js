var container = document.querySelector('.container')
var plannerArr = localStorage.getItem('plannerArr') || '{}'
var dt = luxon.DateTime
var now = dt.now()

// set date and time in jumbotron
document.getElementById('currentDay').innerText = now.toLocaleString(
  dt.DATETIME_MED
)

// created and appended all rows dynamically
var currentTime = 9
for (var i = 0; i < 8; i++) {
  // set pTime to correct string depending on the current time row
  var pTime =
    currentTime === 12
      ? currentTime + 'PM'
      : currentTime >= 13
      ? currentTime - 12 + 'PM'
      : currentTime + 'AM'

  // here we created a string with the "row" div which contains our time, textarea with an id which matches the current time, and save button
  var hourRow = `<div class="row time-block">
    <p class="col-1 hour">${pTime}</p>
    <textarea id='${currentTime}' class="col-10 description"></textarea>
    <button class="col-1 saveBtn"><i class="fas fa-save"></i></button>
  </div>`

  // after creating the string, we're adding it to our container as html
  container.innerHTML += hourRow

  // add one to the currentTime in order to update the current row we're working on
  currentTime++
}

// here we manipulate our created rows individually
for (var i = 0; i < 8; i++) {
  // select each row by its save button
  var currentRow = document.getElementsByClassName('saveBtn')[i]
  var previousEl = currentRow.previousElementSibling
  // parse our local storage so we can manipulate it as an object
  var parsedPlanner = JSON.parse(plannerArr)

  // added the correct class according to whether the row's time is in the past, present or future
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

  // if a value for a specific time is found, display it to the site on load
  if (parsedPlanner[previousEl.id] !== undefined) {
    previousEl.value = parsedPlanner[previousEl.id]
  }

  // add click event listener to every save button
  currentRow.addEventListener('click', function () {
    // update our parsedPlanner object
    parsedPlanner[
      this.previousElementSibling.id
    ] = this.previousElementSibling.value

    // set our plannerArr to the local storage
    localStorage.setItem('plannerArr', JSON.stringify(parsedPlanner))
  })
}
