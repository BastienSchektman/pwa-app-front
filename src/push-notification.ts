import { BASE_URL } from 'api/initializers/axios';

const isPushNotificationSupported = () => 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;

const askUserPermission = async () => Notification?.requestPermission();

const registerServiceWorker = () => navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/service-worker.js`);

const getPublicKey = async () => {
  const { publicKey } = await fetch(`${BASE_URL}/webpush`, {
    headers: {
      Accept: 'aplication/json',
    },
  }).then((r) => r.json());

  return publicKey;
};

const createNotificationSubscription = async (): Promise<PushSubscription> => {
  const serviceWorker = await navigator.serviceWorker.ready;
  return serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: await getPublicKey(),
  });
};

/**
 * returns the subscription if present or nothing
 */
const getUserSubscription = (): Promise<PushSubscription | null> => navigator.serviceWorker.ready
  .then((serviceWorker) => serviceWorker.pushManager.getSubscription())
  .then((pushSubscription) => pushSubscription);

export {
  isPushNotificationSupported,
  askUserPermission,
  registerServiceWorker,
  createNotificationSubscription,
  getUserSubscription,
};
