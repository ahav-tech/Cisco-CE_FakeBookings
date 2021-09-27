# Cisco-CE_FakeBookings
Create fake calendar bookings for testing Cisco Telepresence endpoints

## Details
Uses websocket connection to Cisco Telepresence endpoints running Collaboration Endpoint (CE) software to push a set of fake calendar bookings. Minimum version is __CE9.13__.

Bypasses the need to connect to TMS/VCS/Webex/etc.

## Test environment
- Device: Cisco TelePresence SX10
- Software: CE9.14.7
- Config:
  - NetworkServices/Websocket: FollowHTTPService
  - NetworkServices/HTTP/Mode: HTTP+HTTPS
