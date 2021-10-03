//
// Classes
//
class UI {
  static updateBookingBtns() {
    entryList.innerHTML = "";

    const bookings = BookingList.getBookings();
    if (bookings.length > 0) {
      UI.sendBtnVisibility(true);
      bookings.forEach((booking) => {
        UI.addBookingBtn(booking);
      });
    } else {
      UI.sendBtnVisibility(false);
    }

    if (selectedBooking) {
      UI.formVisibility(true);
      UI.selectBookingBtn(
        document.getElementById(`booking-${selectedBooking}`)
      );
    } else {
      UI.formVisibility(false);
      UI.formClear();
    }
  }

  static addBookingBtn(booking) {
    const row = document.createElement("button");
    row.id = `booking-${booking.Id}`;
    row.classList.add("booking-btn", "twelve", "columns");
    row.innerText = `${booking.Id}`;

    entryList.appendChild(row);
  }

  static selectBookingBtn(target) {
    const allEntries = entryList.querySelectorAll(".booking-btn");
    allEntries.forEach((element) => {
      element.classList.remove("entry-selected");
    });
    target.classList.add("entry-selected");
  }

  static displayBookingDetails(booking) {
    formBookingTitle.value = booking.Title;
    formBookingId.value = booking.Id;
    formBookingNumber.value = booking.Number;
    formBookingOrganizer.value = booking.Organizer.Name;
    formBookingProtocol.value = booking.Protocol;
    formBookingTimeDuration.value = booking.Time.Duration;
    formBookingTimeBuffer.value = booking.Time.EndTimeBuffer;
    formBookingTimeStart.value = timeToLocalString(booking.Time.StartTime);
    formBookingDateStart.value = dateToLocalString(booking.Time.StartTime);
  }

  static formClear() {
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

  static formVisibility(show) {
    show
      ? (formBooking.style.display = "block")
      : (formBooking.style.display = "none");
  }

  static sendBtnVisibility(show) {
    if (show && endpointConnected) {
      btnEntrySend.style.display = "block";
    } else {
      btnEntrySend.style.display = "none";
    }
  }
}
