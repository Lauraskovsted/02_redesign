//global variables
var monthEl = $(".c-main");
var dataCel = $(".c-cal__cel");
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1;
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var monthText = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var indexMonth = month;
var addBtn = $(".js-event__add");
var saveBtn = $(".js-event__save");
var closeBtn = $(".js-event__close");
var winCreator = $(".js-event__creator");
var inputDate = $(this).data();
today = year + "-" + month + "-" + day;


//set default events
function defaultEvents(dataDay,dataName,dataNotes,classTag){
  var date = $('*[data-day='+dataDay+']');
  date.attr("data-name", dataName);
  date.attr("data-notes", dataNotes);
  date.addClass("event");
  date.addClass("event--" + classTag);
}

//window event creator
addBtn.on("click", function() {
  winCreator.addClass("isVisible");
  $("body").addClass("overlay");
  dataCel.each(function() {
    if ($(this).hasClass("isSelected")) {
      today = $(this).data("day");
      document.querySelector('input[type="date"]').value = today;
    } else {
      document.querySelector('input[type="date"]').value = today;
    }
  });
});
closeBtn.on("click", function() {
  winCreator.removeClass("isVisible");
  $("body").removeClass("overlay");
});
saveBtn.on("click", function() {
  var inputName = $("input[name=name]").val();
  var inputDate = $("input[name=date]").val();
  var inputNotes = $("textarea[name=notes]").val();
  var inputTag = $("select[name=tags]")
    .find(":selected")
    .text();

  dataCel.each(function() {
    if ($(this).data("day") === inputDate) {
      if (inputName != null) {
        $(this).attr("data-name", inputName);
      }
      if (inputNotes != null) {
        $(this).attr("data-notes", inputNotes);
      }
      $(this).addClass("event");
      if (inputTag != null) {
        $(this).addClass("event--" + inputTag);
      }
      fillEventSidebar($(this));
    }
  });

  winCreator.removeClass("isVisible");
  $("body").removeClass("overlay");
  $("#addEvent")[0].reset();
});

//fill sidebar event info
function fillEventSidebar(self) {
  $(".c-aside__event").remove();
  var thisName = self.attr("data-name");
  var thisNotes = self.attr("data-notes");
  var thisImportant = self.hasClass("event--important");
  var thisEvent = self.hasClass("event");
  
  switch (true) {
    case thisEvent:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event'>" +
        thisName +
        " <span> ᐅ " +
        thisNotes +
        "</span></p>"
      );
      break;
   }
};
dataCel.on("click", function() {
  var thisEl = $(this);
  var thisDay = $(this)
  .attr("data-day")
  .slice(8);
  var thisMonth = $(this)
  .attr("data-day")
  .slice(5, 7);

  fillEventSidebar($(this));

  $(".c-aside__num").text(thisDay);
  $(".c-aside__month").text(monthText[thisMonth - 1]);

  dataCel.removeClass("isSelected");
  thisEl.addClass("isSelected");

});

//function to move the months
function moveNext(fakeClick, indexNext) {
  for (var i = 0; i < fakeClick; i++) {
    $(".c-main").css({
      left: "-=100%"
    });
    $(".c-paginator__month").css({
      left: "-=100%"
    });
    switch (true) {
      case indexNext:
        indexMonth += 1;
        break;
    }
  }
}
function movePrev(fakeClick, indexPrev) {
  for (var i = 0; i < fakeClick; i++) {
    $(".c-main").css({
      left: "+=100%"
    });
    $(".c-paginator__month").css({
      left: "+=100%"
    });
    switch (true) {
      case indexPrev:
        indexMonth -= 1;
        break;
    }
  }
}

//months paginator
function buttonsPaginator(buttonId, mainClass, monthClass, next, prev) {
  switch (true) {
    case next:
      $(buttonId).on("click", function() {
        if (indexMonth >= 2) {
          $(mainClass).css({
            left: "+=100%"
          });
          $(monthClass).css({
            left: "+=100%"
          });
          indexMonth -= 1;
        }
        return indexMonth;
      });
      break;
    case prev:
      $(buttonId).on("click", function() {
        if (indexMonth <= 11) {
          $(mainClass).css({
            left: "-=100%"
          });
          $(monthClass).css({
            left: "-=100%"
          });
          indexMonth += 1;
        }
        return indexMonth;
      });
      break;
  }
}

buttonsPaginator("#next", monthEl, ".c-paginator__month", false, true);
buttonsPaginator("#prev", monthEl, ".c-paginator__month", true, false);

//launch function to set the current month
moveNext(indexMonth - 1, false);

//fill the sidebar with current day
if (day<10){
  $(".c-aside__num").text("0"+day);
} else {
  $(".c-aside__num").text(day);
}

$(".c-aside__month").text(monthText[month - 1]);

// fill the month table with column headings
function day_title(day_name) {
  document.write("<div class='c-cal__col'>" + day_name + "</div>");
}
// fills the month table with numbers
function fill_table(month, month_length, indexMonth) {
  day = 1;
  // begin the new month table
  document.write("<div class='c-main c-main-" + indexMonth + "'>");
  //document.write("<b>"+month+" "+year+"</b>")

  // column headings
  document.write("<div class='c-cal__row'>");
  day_title("Sun");
  day_title("Mon");
  day_title("Tue");
  day_title("Wed");
  day_title("Thu");
  day_title("Fri");
  day_title("Sat");
  document.write("</div>");

  // pad cells before first day of month
  document.write("<div class='c-cal__row'>");
  for (var i = 1; i < start_day; i++) {
    if (start_day > 7) {
    } else {
      document.write("<div class='c-cal__cel'></div>");
    }
  }

  // fill the first week of days
  for (var i = start_day; i < 8; i++) {
    document.write("<div data-day='2022-" + indexMonth + "-0" + day + "'class='c-cal__cel'><p>" + day + "</p></div>");
    day++;
  }
  document.write("</div>");

  // fill the remaining weeks
  while (day <= month_length) {
    document.write("<div class='c-cal__row'>");
    for (var i = 1; i <= 7 && day <= month_length; i++) {
      if (day >= 1 && day <= 9) {
        document.write("<div data-day='2022-" + indexMonth + "-0" + day + "'class='c-cal__cel'><p>" + day + "</p></div>");
        day++;
      } else {
        document.write("<div data-day='2017-" + indexMonth + "-" + day + "' class='c-cal__cel'><p>" + day + "</p></div>");
        day++;
      }
    }
    document.write("</div>");
    // the first day of the next month
    start_day = i;
  }

  document.write("</div>");
}