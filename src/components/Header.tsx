import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import usePushNotifications from 'usePushNotifications';
import {
  LocationType,
  useContextUser,
} from 'contexts/UserProvider';
import { isPushNotificationSupported } from 'push-notification';

type Props =
  {
    isCustomName?: boolean,
    name: string,
    commuId?: string,
    children?: React.ReactNode,
    headerChildren?: React.ReactNode
  };

function Header({
  name, isCustomName = false, commuId, children, headerChildren,
}: Props) {
  const { t } = useTranslation(['navigation']);
  const { user } = useContextUser();
  const [locations, setLocations] = useState(user?.locations.map(
    (el: LocationType) => el.id,
  ) as unknown as string[]);
  const [isFollowing, setIsFollowing] = useState(locations.includes(commuId as string));

  const {
    userConsent,
    onClickAskUserPermissionAndSubscribe,
    onClickSendSubscriptionToPushServer,
  } = usePushNotifications();

  return (
    <Stack sx={{
      position: 'sticky',
      flex: 1,
      top: 0,
      backgroundColor: 'rgba(31, 32, 40, 0.65)',
      backdropFilter: 'blur(12px)',
      zIndex: 2,
      paddingLeft: '16px',
      paddingTop: '8px',
      paddingBottom: '8px',
    }}
    >
      <Stack alignItems="center" direction="row" spacing={2}>
        {headerChildren}
        <Typography
          variant="h6"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            flex: 1,
          }}
        >
          {isCustomName ? name : t(name)}
        </Typography>
        {isCustomName && isPushNotificationSupported() && (
          <Stack pr="20px">
            <Button
              variant="contained"
              onClick={async () => {
                if (!userConsent.includes('granted')) {
                  const sub = await onClickAskUserPermissionAndSubscribe();
                  await onClickSendSubscriptionToPushServer(locations.filter(
                    (el: string) => ![commuId as string].includes(el),
                  ), sub as PushSubscription);
                  setLocations(locations.filter(
                    (el: string) => ![commuId as string].includes(el),
                  ));
                  window.location.reload();
                } else {
                  if (!locations.includes(commuId as string)) {
                    await onClickSendSubscriptionToPushServer([...locations, commuId as string]);
                    setLocations([...locations, commuId as string]);
                    setIsFollowing(true);
                    return;
                  }
                  await onClickSendSubscriptionToPushServer(locations.filter(
                    (el: string) => ![commuId as string].includes(el),
                  ));
                  setLocations(locations.filter(
                    (el: string) => ![commuId as string].includes(el),
                  ));
                  setIsFollowing(false);
                }
              }}
            >
              {!userConsent.includes('granted') ? (
                <Typography fontSize="15px" fontWeight="bold" color={(theme) => theme.palette.common.white}>
                  Accepter les notificatons
                </Typography>
              ) : (
                <Typography fontSize="15px" fontWeight="bold" color={(theme) => theme.palette.common.white}>
                  {!isFollowing ? 'Suivre' : 'Se désabonner'}
                </Typography>
              )}
            </Button>
          </Stack>
        )}
      </Stack>
      {children}
    </Stack>
  );
}

export default Header;
