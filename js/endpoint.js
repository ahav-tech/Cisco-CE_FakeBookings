//
// Definitions
//
let endpoint = null;
let endpointConnected = false;

const url = "";
const username = "";
const password = "";

const formEndpointAddress = document.getElementById("endpoint-address");
const formEndpointUser = document.getElementById("endpoint-user");
const formEndpointPassword = document.getElementById("endpoint-password");
const btnEndpointConnect = document.getElementById("endpoint-connect");

//
// Events
//
btnEndpointConnect.addEventListener("click", (e) => {
  e.preventDefault();
  // TODO: add input validation
  endpointConnect();
});

window.addEventListener("beforeunload", (e) => {
  if (endpoint !== null) {
    endpoint.close();
  }
});

//
// Functions
//
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
    endpoint = new WebSocket(
      `ws://${formEndpointAddress.value}/ws`,
      "auth-" +
        b64EncodeUnicode(
          `${formEndpointUser.value}:${formEndpointPassword.value}`
        )
    );

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
  endpointConnected = true;
  UI.sendBtnVisibility(true);
  btnEndpointConnect.innerText = "Disconnect";

  // Leaving this hardcoded subscription in as it gives a command example and also debugging of comms
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
  endpointConnected = false;
  UI.sendBtnVisibility(false);
  btnEndpointConnect.innerText = "Connect";

  endpoint = null;
}
