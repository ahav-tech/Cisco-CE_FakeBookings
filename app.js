const url = "ws://172.22.20.13/ws";
const username = "admin";
const password = "";

let date = new Date();
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
        StartTime: `${dateYear}-${dateMonth}-${dateDay}T${timeHour}:${timeMinute + 6}:00.000000000Z`,
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
    StartTime: `${dateYear}-${dateMonth}-${dateDay}T${timeHour + 2}:${timeMinute + 1}:00.000000000Z`,
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
    StartTime: `${dateYear}-${dateMonth}-${dateDay}T${timeHour + 4}:${timeMinute + 1}:00.000000000Z`,
  },
  Title: "Booking Title 3",
},
  ],
});

function getAuth() {
  return `${username}:${password}`;
}

function b64EncodeUnicode(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode("0x" + p1);
    })
  );
}

// Start websocket
var ws = new WebSocket(url, "auth-" + b64EncodeUnicode(getAuth()));

// Websocket connected
ws.onopen = () => {
  console.log("Connected!");

  ws.send(
    JSON.stringify({
      jsonrpc: "2.0",
      id: 101,
      method: "xCommand/Bookings/Put",
      params: {
        body: bookings,
      },
    })
  );

  ws.send(
    JSON.stringify({
      jsonrpc: "2.0",
      id: 102,
      method: "xCommand/Bookings/List",
    })
  );

  ws.send(
    JSON.stringify({
      jsonrpc: "2.0",
      id: 113,
      method: "xFeedback/Subscribe",
      params: {
        // Query: ["Status", "Standby", "State"],
        Query: ["Status", "Bookings"],
        NotifyCurrentValue: true,
      },
    })
  );

  ws.send(
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
};

// Websocket response
ws.onmessage = (message) => {
  const data = JSON.parse(message.data);
  console.log(data);
};

// Websocket error
ws.onerror = (error) => {
  // error doesn't seem to return anything useful
  console.log(`Error occured!`);
};

// Websocket disconnected
ws.onclose = () => {
  console.log("Disconnected!");
};
