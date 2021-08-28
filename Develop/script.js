let timeBlock = $(".time-block");
//use moment.js to render current time.
function displayTime() {
  let timeDisplayEl = $("#currentDay");
  let now = moment().format("MMM DD, YYYY [at] hh:mm A");
  timeDisplayEl.text(now);
}
//use setInterval to increment the minutes and display time without refreshing page.
setInterval(displayTime, 1000);

//save the scheduled event and corresponding hour to local storage.
$(".saveBtn").on("click", function () {
  let schedule = $(this).siblings(".description").val();
  let hour = $(this).parent().attr("id");
  console.log(schedule, hour);
  localStorage.setItem(hour, schedule);
});

//Retrieve the scheduled event and display it.
function renderSchedule() {
  for (let i = 0; i < timeBlock.length; i++) {
    hourId = timeBlock[i].id;
    let textArea = timeBlock[i].children[1];

    $(textArea).val(localStorage.getItem(hourId));
  }
}
//track the current hour and color code the time blocks relative to the current hour.
let trackHour = function () {
  $(timeBlock).each(function () {
    let currentHour = moment().hour();
    let block = $(this).attr("id");
    if (block > currentHour) {
      $(this).addClass("future");
      $(this).removeClass("past");
      $(this).removeClass("present");
    } else if (block < currentHour) {
      $(this).addClass("past");
      $(this).removeClass("present");
      $(this).removeClass("future");
    } else {
      $(this).addClass("present");
      $(this).removeClass("past");
      $(this).removeClass("future");
    }
  });
};
trackHour();
renderSchedule();
