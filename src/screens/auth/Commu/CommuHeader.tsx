import Header from 'components/Header';
import ProfilePicture from 'components/ProfilePicture';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useContextCommu } from 'contexts/CommuProvider';

type Props = {
  commuName?: string;
};

function CommuHeader({ commuName }: Props) {
  const navigate = useNavigate();
  const { commuId, setCommuId } = useContextCommu();

  return (
    <Header
      name={commuName || 'commus'}
      isCustomName={!!commuName}
      commuId={commuId}
      headerChildren={(
        <>
          <ArrowBackIcon fontSize="large" sx={{ cursor: 'pointer' }} onClick={() => { setCommuId(undefined); navigate('/commus'); }} />
          {commuName ? <ProfilePicture /> : null}
        </>
      )}
    />
  );
}

export default CommuHeader;
