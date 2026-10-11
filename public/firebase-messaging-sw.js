/* Firebase Cloud Messaging service worker.
 * Runs in the background so push messages can be shown even when no
 * Gym Ontime tab is open. The public Firebase config arrives as query
 * parameters on the registration URL (a service worker cannot read
 * process.env). None of these values are secret. */

// Registered BEFORE the Firebase scripts so it runs first and replaces the
// SDK's default click handling.
self.addEventListener("notificationclick", (event) => {
  event.stopImmediatePropagation();
  event.notification.close();

  const fcm = (event.notification.data && event.notification.data.FCM_MSG) || {};
  const type = fcm.data && fcm.data.type;
  const target =
    type === "payment_confirmed" || type === "payment_needs_review"
      ? "/payments"
      : "/dashboard";

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if ("focus" in client) {
            client.focus();
            if ("navigate" in client) return client.navigate(target);
            return undefined;
          }
        }
        return self.clients.openWindow(target);
      }),
  );
});

importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js");

const params = new URL(self.location.href).searchParams;

firebase.initializeApp({
  apiKey: params.get("apiKey"),
  projectId: params.get("projectId"),
  messagingSenderId: params.get("messagingSenderId"),
  appId: params.get("appId"),
});

// Our backend sends a `notification` payload (title + body), so the SDK
// displays it automatically in the background. No onBackgroundMessage
// handler is needed (adding one would show every message twice).
firebase.messaging();
