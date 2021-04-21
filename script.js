var container = document.querySelector('.container');
var plannerArr = localStorage.getItem('scheduler') || {};

var currentTime = 9;
for (var i = 0; i < 8; i++) {
  var hourRow = `<div class="row time-block">
    <p class="col-1 hour"></p>
    <textarea id='${currentTime}' class="col-10 description"></textarea>
    <button class="col-1 saveBtn"><i class="fas fa-save"></i></button>
  </div>`;

  container.innerHTML += hourRow;

  currentTime++;
}

for (var i = 0; i < 8; i++) {
  var currentRow = document.getElementsByClassName('saveBtn')[i];
  currentRow.previousElementSibling.classList.add('past');
  currentRow.addEventListener('click', function () {
    console.log(this.previousElementSibling.id);
    plannerArr[
      this.previousElementSibling.id
    ] = this.previousElementSibling.innerText;
    console.log(this.siblings);
  });
}
