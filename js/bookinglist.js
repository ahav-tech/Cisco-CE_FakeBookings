//
// Classes
//
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

  static updateBooking(bookingNum, newBooking) {
    const bookings = BookingList.getBookings();
    bookings[bookingNum] = newBooking;
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }

  static removeLastBooking() {
    const bookings = BookingList.getBookings();
    bookings.pop();
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }

  static getNumBookings() {
    const bookings = BookingList.getBookings();
    return bookings.length;
  }

  static getBookingListString() {
    const bookings = JSON.stringify({
      Bookings: BookingList.getBookings(),
    });
    const commandString = JSON.stringify({
      jsonrpc: "2.0",
      id: Math.ceil(Math.random() * 100),
      method: "xCommand/Bookings/Put",
      params: {
        body: bookings,
      },
    });

    return commandString;
  }
}

//
// Definitions
//
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
  if(endpoint) {
    endpoint.send(BookingList.getBookingListString());
  }
});

// Change booking details
formBooking.querySelectorAll("input").forEach((element) => {
  element.addEventListener("change", (e) => {
    formToBookingData(selectedBooking);
  });
});

//
// Functions
//

// Make local data compatible with form value
function dateToLocalString(date) {
  const tempDate = new Date(date);

  let yyyy = tempDate.getFullYear();
  let mm = tempDate.getMonth() + 1;
  let dd = tempDate.getDate();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  return `${yyyy}-${mm}-${dd}`;
}

function dateTimeFromLocalString(dateString, timeString) {
  const tempDate = new Date();

  tempDate.setFullYear(dateString.substr(0, 4));
  tempDate.setMonth(dateString.substr(5, 2) - 1);
  tempDate.setDate(dateString.substr(8, 2));

  tempDate.setHours(timeString.substr(0, 2));
  tempDate.setMinutes(timeString.substr(3, 2));

  return tempDate;
}

// Make local time compatible with form value
function timeToLocalString(date) {
  const tempDate = new Date(date);

  let hh = tempDate.getHours();
  let mm = tempDate.getMinutes();

  if (hh < 10) {
    hh = "0" + hh;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  return `${hh}:${mm}`;
}

// Send form entries to booking in array
function formToBookingData(bookingId) {
  // set details for selected entry
  if (bookingId) {
    const booking = new Booking(bookingId - 1);

    booking.Title = formBookingTitle.value;
    booking.Id = String(formBookingId.value);
    booking.Number = formBookingNumber.value;
    booking.Organizer.Name = formBookingOrganizer.value;
    booking.Protocol = formBookingProtocol.value;
    booking.Time.Duration = Number(formBookingTimeDuration.value);
    booking.Time.EndTimeBuffer = Number(formBookingTimeBuffer.value);
    booking.Time.StartTime = dateTimeFromLocalString(
      formBookingDateStart.value,
      formBookingTimeStart.value
    );

    BookingList.updateBooking(bookingId - 1, booking);
  }
}
