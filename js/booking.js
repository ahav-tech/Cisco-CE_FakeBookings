//
// Classes
//
class Organizer {
  Name;
}

class Time {
  Duration;
  EndTimeBuffer;
  StartTime;
}

class Booking {
  Id;
  Number;
  Organizer;
  Protocol;
  Time;
  Title;

  constructor(id) {
    this.Id = String(id);
    this.Organizer = new Organizer();
    this.Time = new Time();
  }

  setDefaults() {
    // Id set in constructor
    this.Number = "number@example.com";
    this.Organizer.Name = "Test User";
    this.Protocol = "SIP";
    this.Time.Duration = 30;
    this.Time.EndTimeBuffer = 20;
    this.Time.StartTime = new Date();
    this.Title = "Test Booking";
  }
}
