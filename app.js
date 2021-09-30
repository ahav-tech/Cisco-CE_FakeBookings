const date = new Date();

let endpoint = null;

// Details
const url = "";
const username = "";
const password = "";

class Booking {
  Title = "Test Booking";
  Id = 1;
  Number = "number@example.com";
  Organizer = "John Doe";
  Protocol = "SIP";
  TimeDuration = 30;
  TimeBuffer = 20;
  TimeStart = `${date.getHours()}:${date.getMinutes()}}`;
  DateStart = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

const bookingList = [];

bookingList.push(new Booking());

// Controls
formEndpointAddress = document.getElementById("endpoint-address");
formEndpointUser = document.getElementById("endpoint-user");
formEndpointPassword = document.getElementById("endpoint-password");
btnEndpointConnect = document.getElementById("endpoint-connect");

btnEntryAdd = document.getElementById("entry-add");
btnEntrySend = document.getElementById("entry-send");

formBooking = document.getElementById("booking-form");
formBookingTitle = document.getElementById("booking-title");
formBookingId = document.getElementById("booking-id");
formBookingNumber = document.getElementById("booking-number");
formBookingOrganizer = document.getElementById("booking-organizer");
formBookingProtocol = document.getElementById("booking-protocol");
formBookingTimeDuration = document.getElementById("booking-time-duration");
formBookingTimeBuffer = document.getElementById("booking-time-buffer");
formBookingTimeStart = document.getElementById("booking-time-start");
formBookingDateStart = document.getElementById("booking-date-start");

// Events
btnEndpointConnect.addEventListener("click", (e) => {
  e.preventDefault();
  endpointConnect();
});

formBooking.querySelectorAll("input").forEach((element) => {
  element.addEventListener("change", (e) => {
    checkBookingData(e.target);
  });
});

// Functions
function getAuth() {
  return `${formEndpointUser.value}:${formEndpointPassword.value}`;
}

function b64EncodeUnicode(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode("0x" + p1);
    })
  );
}

function endpointConnect() {
  if (endpoint === null) {
    // Start websocket
    console.log("Endpoint connecting...");
    btnEndpointConnect.innerText = "Connecting...";
    endpoint = new WebSocket(`ws://${formEndpointAddress.value}/ws`, "auth-" + b64EncodeUnicode(getAuth()));

    // Add listeners
    endpoint.addEventListener("open", (e) => {
      endpointEventOpen(e);
    });

    endpoint.addEventListener("error", (e) => {
      endpointEventError(e);
    });

    endpoint.addEventListener("message", (e) => {
      endpointEventMessage(e);
    });

    endpoint.addEventListener("close", (e) => {
      endpointEventClose(e);
    });
  } else {
    console.log("Endpoint disconnecting...");
    btnEndpointConnect.innerText = "Disconnecting...";
    endpoint.close();
  }
}

function endpointEventOpen(e) {
  console.log("Endpoint connected");
  btnEndpointConnect.innerText = "Disconnect";
  // Old hardcoded test stuff
  console.log(JSON.stringify({
    jsonrpc: "2.0",
    id: 101,
    method: "xCommand/Bookings/Put",
    params: {
      body: bookings,
    },
  }));
  endpoint.send(
    JSON.stringify({
      jsonrpc: "2.0",
      id: 101,
      method: "xCommand/Bookings/Put",
      params: {
        body: bookings,
      },
    })
  );

  endpoint.send(
    JSON.stringify({
      jsonrpc: "2.0",
      id: 102,
      method: "xCommand/Bookings/List",
    })
  );

  // endpoint.send(
  //   JSON.stringify({
  //     jsonrpc: "2.0",
  //     id: 113,
  //     method: "xFeedback/Subscribe",
  //     params: {
  //       // Query: ["Status", "Standby", "State"],
  //       Query: ["Status", "Bookings"],
  //       NotifyCurrentValue: true,
  //     },
  //   })
  // );

  endpoint.send(
    JSON.stringify({
      jsonrpc: "2.0",
      id: 123,
      method: "xFeedback/Subscribe",
      params: {
        Query: ["Status", "Standby", "State"],
        NotifyCurrentValue: true,
      },
    })
  );
}

function endpointEventError(e) {
  console.log("Endpoint error: ");
  console.log(e);
}

function endpointEventMessage(e) {
  console.log("Endpoint message: ");
  console.log(JSON.parse(e.data));
}

function endpointEventClose(e) {
  console.log("Endpoint disconnected");
  btnEndpointConnect.innerText = "Connect";

  endpoint = null;
}

function checkBookingData(target) {
  // set details for selected entry
  console.log(target);

  bookingList[0].Title = formBookingTitle.value;
  bookingList[0].Id = formBookingId.value;
  bookingList[0].Number = formBookingNumber.value;
  bookingList[0].Organizer = formBookingOrganizer.value;
  bookingList[0].Protocol = formBookingProtocol.value;
  bookingList[0].TimeDuration = formBookingTimeDuration.value;
  bookingList[0].TimeBuffer = formBookingTimeBuffer.value;
  bookingList[0].TimeStart = formBookingTimeStart.value;
  bookingList[0].DateStart = formBookingDateStart.value;

  console.log(bookingList[0]);
}

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
