class Booking {
  title;
  id;
  number;
  organizer;
  protocol;
  timeDuration;
  timeBuffer;
  timeStart;
  dateStart;

  constructor(id) {
    this.id = id;
  }

  setDefaults() {
    const now = new Date();

    this.title = "Test Booking";
    // id set in constructor
    this.number = "number@example.com";
    this.organizer = "Test User";
    this.protocol = "SIP";
    this.timeDuration = "30";
    this.timeBuffer = "20";
    this.timeStart = timeLocalString(now);
    this.dateStart = dateLocalString(now);
  }
}
