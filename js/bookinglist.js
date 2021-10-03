class BookingList {
  static getBookings() {
    let bookings;
    if (localStorage.getItem("bookings") === null) {
      bookings = [];
    } else {
      bookings = JSON.parse(localStorage.getItem("bookings"));
    }
    return bookings;
  }

  static addBooking(booking) {
    const bookings = BookingList.getBookings();
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }

  static updateBooking(bookingNum, booking) {
    const bookings = BookingList.getBookings();
    bookings[bookingNum] = booking;
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }

  static removeLastBooking() {
    const bookings = BookingList.getBookings();
    bookings.pop();
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }

  static getNumBookings() {
    const bookings = BookingList.getBookings();
    console.log(bookings.length);
    return bookings.length;
  }
}

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

//
//Events
//

// Init
document.addEventListener("DOMContentLoaded", () => {
  selectedBooking = null;
  UI.updateBookingBtns();
});

// Booking select
entryList.addEventListener("click", (e) => {
  if (e.target.className.includes("booking-btn")) {
    // select booking
    selectedBooking = e.target.id.slice(8);
    UI.displayBookingDetails(BookingList.getBookings()[selectedBooking - 1]);
    UI.selectBookingBtn(e.target);
    UI.formVisibility(true);
  }
});

// Booking add
btnEntryAdd.addEventListener("click", () => {
  const bookingNum = document
    .getElementById("entry-list")
    .querySelectorAll(".booking-btn").length;
  const booking = new Booking(bookingNum + 1);

  booking.setDefaults();
  BookingList.addBooking(booking);

  UI.updateBookingBtns();
});

// Booking delete
btnEntryDelete.addEventListener("click", () => {
  const numBookings = document
    .getElementById("entry-list")
    .querySelectorAll(".booking-btn").length;

  if (numBookings) {
    BookingList.removeLastBooking();

    if (selectedBooking == numBookings) {
      selectedBooking = null;
    }

    UI.updateBookingBtns();
  }
});

// Send bookings
btnEntrySend.addEventListener("click", () => {
  // TODO
  console.log("send");
});

formBooking.querySelectorAll("input").forEach((element) => {
  element.addEventListener("change", (e) => {
    formToBookingData(selectedBooking - 1);
  });
});

//
// Functions
//

// Make local data compatible with form value
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

// Make local time compatible with form value
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

// Send form entries to targetting booking in array
function formToBookingData(target) {
  // set details for selected entry
  if (target) {
    const booking = new Booking(target);

    booking.title = formBookingTitle.value;
    booking.id = formBookingId.value;
    booking.number = formBookingNumber.value;
    booking.organizer = formBookingOrganizer.value;
    booking.protocol = formBookingProtocol.value;
    booking.timeDuration = formBookingTimeDuration.value;
    booking.timeBuffer = formBookingTimeBuffer.value;
    booking.timeStart = formBookingTimeStart.value;
    booking.dateStart = formBookingDateStart.value;

    BookingList.updateBooking(target, booking);
  }
}
