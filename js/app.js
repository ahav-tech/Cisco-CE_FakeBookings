// Old hardcoded test stuff
const dateYear = date.getUTCFullYear();
const dateMonth = date.getUTCMonth() + 1;
const dateDay = date.getUTCDate();
const timeHour = date.getUTCHours();
const timeMinute = date.getUTCMinutes();
const bookings = JSON.stringify({
  Bookings: [
    {
      Id: "18",
      Number: "number@example.com",
      Organizer: {
        Name: "John Doe",
      },
      Protocol: "SIP",
      Time: {
        Duration: 60,
        EndTimeBuffer: 50,
        StartTime: `${dateYear}-${dateMonth}-${dateDay}T${timeHour}:${
          timeMinute + 6
        }:00.000000000Z`,
      },
      Title: "Booking Title 1",
    },
    {
      Id: "2",
      Number: "number@example.com",
      Organizer: {
        Name: "Boof Doe",
      },
      Protocol: "SIP",
      Time: {
        Duration: 60,
        EndTimeBuffer: 50,
        StartTime: `${dateYear}-${dateMonth}-${dateDay}T${timeHour + 2}:${
          timeMinute + 1
        }:00.000000000Z`,
      },
      Title: "Booking Title 2",
    },
    {
      Id: "3",
      Number: "number@example.com",
      Organizer: {
        Name: "Stuff Doe",
      },
      Protocol: "SIP",
      Time: {
        Duration: 60,
        EndTimeBuffer: 50,
        StartTime: `${dateYear}-${dateMonth}-${dateDay}T${timeHour + 4}:${
          timeMinute + 1
        }:00.000000000Z`,
      },
      Title: "Booking Title 3",
    },
  ],
});
