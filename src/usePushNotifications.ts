import { BASE_URL } from 'api/initializers/axios';
import axios from 'axios';
import {
  askUserPermission,
  createNotificationSubscription,
  getUserSubscription,
  isPushNotificationSupported,
  registerServiceWorker,
} from 'push-notification';
import { useEffect, useState } from 'react';

const pushNotificationSupported = isPushNotificationSupported();

const usePushNotifications = () => {
  const [userConsent, setSuserConsent] = useState(Notification?.permission);
  const [userSubscription, setUserSubscription] = useState<PushSubscription>();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pushNotificationSupported) {
      setLoading(true);
      setError(false);
      registerServiceWorker().then(() => {
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const getExixtingSubscription = async () => {
      const existingSubscription = await getUserSubscription();
      if (existingSubscription) {
        setUserSubscription(existingSubscription);
        setLoading(false);
      }
    };
    getExixtingSubscription();
  }, []);

  const onClickAskUserPermissionAndSubscribe = async () => {
    setLoading(true);
    setError(false);
    await askUserPermission().then((consent) => {
      setSuserConsent(consent);
      if (consent !== 'granted') {
        setError({
          name: 'Consent denied',
          message: 'You denied the consent to receive notifications',
          code: 0,
        });
      }
    });
    return createNotificationSubscription()
      .then((subscrition) => {
        setUserSubscription(subscrition);
        setLoading(false);
        return subscrition;
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error("Couldn't create the notification subscription", err, 'name:', err.name, 'message:', err.message, 'code:', err.code);
        setError(err);
        setLoading(false);
      });
  };

  const onClickSendSubscriptionToPushServer = async (
    locations: string[],
    sub?: PushSubscription,
  ) => {
    setLoading(true);
    setError(false);

    await axios.patch(`${BASE_URL}/users`, {
      locations,
      webpush: {
        endpoint: userSubscription?.endpoint ? userSubscription?.endpoint : sub?.endpoint,
        token: userSubscription?.toJSON().keys?.p256dh ? userSubscription?.toJSON().keys?.p256dh
          : sub?.toJSON().keys?.p256dh,
        auth: userSubscription?.toJSON().keys?.auth ? userSubscription?.toJSON().keys?.auth
          : sub?.toJSON().keys?.auth,
      },
    }, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    }).then(() => {
      setLoading(false);
    }).catch((err) => {
      setLoading(false);
      setError(err);
    });
  };

  return {
    onClickAskUserPermissionAndSubscribe,
    onClickSendSubscriptionToPushServer,
    userConsent,
    error,
    loading,
  };
};

export default usePushNotifications;
