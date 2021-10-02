const date = new Date();

const entryList = document.getElementById("entry-list");
const btnEntryAdd = document.getElementById("entry-add");
const btnEntryDelete = document.getElementById("entry-delete");
const btnEntrySend = document.getElementById("entry-send");

const formBooking = document.getElementById("booking-form");
const formBookingTitle = document.getElementById("booking-title");
const formBookingId = document.getElementById("booking-id");
const formBookingNumber = document.getElementById("booking-number");
const formBookingOrganizer = document.getElementById("booking-organizer");
const formBookingProtocol = document.getElementById("booking-protocol");
const formBookingTimeDuration = document.getElementById(
  "booking-time-duration"
);
const formBookingTimeBuffer = document.getElementById("booking-time-buffer");
const formBookingTimeStart = document.getElementById("booking-time-start");
const formBookingDateStart = document.getElementById("booking-date-start");

let selectedBooking;
let bookingList = [];

class Booking {
  constructor(
    title,
    id,
    number,
    organizer,
    protocol,
    timeDuration,
    timeBuffer,
    timeStart,
    dateStart
  ) {
    this.title = title;
    this.id = id;
    this.number = number;
    this.organizer = organizer;
    this.protocol = protocol;
    this.timeDuration = timeDuration;
    this.timeBuffer = timeBuffer;
    this.timeStart = timeStart;
    this.dateStart = dateStart;
  }
}

class UI {
  addBooking(bookingId) {
    const row = document.createElement("button");
    row.id = `booking-${bookingId}`;
    row.classList.add("booking-btn", "twelve", "columns");
    row.innerText = `${bookingId}`;

    entryList.appendChild(row);
  }

  deleteBooking(bookingId) {
    const allEntries = entryList.querySelectorAll(".booking-btn");
    allEntries[bookingId - 1].remove();
  }

  selectBooking(target) {
    const allEntries = entryList.querySelectorAll(".booking-btn");
    allEntries.forEach((element) => {
      element.classList.remove("entry-selected");
    });
    target.classList.add("entry-selected");
  }

  formVisibility(show) {
    console.log(show);
    show
      ? (formBooking.style.display = "block")
      : (formBooking.style.display = "none");
  }

  formDefaults(bookingId) {
    const now = new Date();

    formBookingTitle.value = "Test Booking";
    formBookingId.value = bookingId;
    formBookingNumber.value = "number@example.com";
    formBookingOrganizer.value = "Test User";
    formBookingProtocol.value = "SIP";
    formBookingTimeDuration.value = "30";
    formBookingTimeBuffer.value = "20";
    formBookingTimeStart.value = timeLocalString(now);
    formBookingDateStart.value = dateLocalString(now);
  }

  formClear() {
    formBookingTitle.value = "";
    formBookingId.value = "";
    formBookingNumber.value = "";
    formBookingOrganizer.value = "";
    formBookingProtocol.value = "";
    formBookingTimeDuration.value = "";
    formBookingTimeBuffer.value = "";
    formBookingTimeStart.value = "";
    formBookingDateStart.value = "";
  }
}

function dateLocalString(date) {
  let yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  return `${yyyy}-${mm}-${dd}`;
}

function timeLocalString(date) {
  let hh = date.getHours();
  let mm = date.getMinutes();

  if (hh < 10) {
    hh = "0" + hh;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  return `${hh}:${mm}`;
}

entryList.addEventListener("click", (e) => {
  const ui = new UI();
  if (e.target.className.includes("booking-btn")) {
    // select booking
    ui.selectBooking(e.target);

    selectedBooking = e.target.id.slice(8);
    console.log(selectedBooking);
  }
});

btnEntryAdd.addEventListener("click", () => {
  const ui = new UI();

  const bookingNum = document
    .getElementById("entry-list")
    .querySelectorAll(".booking-btn").length;

  ui.addBooking(bookingNum + 1);
  bookingList.push(new Booking("", bookingNum + 1, "", "", "", "", "", "", ""));
  console.log(bookingList);
});

btnEntryDelete.addEventListener("click", () => {
  const ui = new UI();

  const bookingNum = document
    .getElementById("entry-list")
    .querySelectorAll(".booking-btn").length;

  if (bookingNum) {
    ui.deleteBooking(bookingNum);
  }
});

btnEntrySend.addEventListener("click", () => {
  const ui = new UI();
  ui.formDefaults(2);
});

formBooking.querySelectorAll("input").forEach((element) => {
  element.addEventListener("change", (e) => {
    uiToBookingData(selectedBooking - 1);
  });
});

function uiToBookingData(target) {
  // set details for selected entry
  console.log(target);

  if (target) {
    bookingList[target].title = formBookingTitle.value;
    bookingList[target].id = formBookingId.value;
    bookingList[target].number = formBookingNumber.value;
    bookingList[target].organizer = formBookingOrganizer.value;
    bookingList[target].protocol = formBookingProtocol.value;
    bookingList[target].timeDuration = formBookingTimeDuration.value;
    bookingList[target].timeBuffer = formBookingTimeBuffer.value;
    bookingList[target].timeStart = formBookingTimeStart.value;
    bookingList[target].dateStart = formBookingDateStart.value;

    console.log(bookingList[target]);
  }
}

// Title = "Test Booking";
// Id = 1;
// Number = "number@example.com";
// Organizer = "John Doe";
// Protocol = "SIP";
// TimeDuration = 30;
// TimeBuffer = 20;
// TimeStart = `${date.getHours()}:${date.getMinutes()}}`;
// DateStart = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
