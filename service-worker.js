self.addEventListener("install", (event) => {
  console.log("Service worker installed");
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activated");
});

self.addEventListener("sync", (event) => {
  console.log("sync added with tag: ", event.tag);
  if (event.tag === "send-request") {
    console.log("Entered: ", event.tag);
    return event.waitUntil(sendStoredRequest());
  }
});

async function sendStoredRequest() {
  console.log("called request");
}
