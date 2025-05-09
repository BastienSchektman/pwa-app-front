// import RumorCard from 'components/RumorCard';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RumorCreator from 'components/RumorCreator';
import { useContextCommu } from 'contexts/CommuProvider';
import { useQueryCommus } from 'api/commus';
import { useTranslation } from 'react-i18next';
import { CircularProgress, Stack } from '@mui/material';
import CommuHeader from './CommuHeader';
import CommuRumors from './CommuRumors';

function Commu() {
  const { data: commus, isLoading } = useQueryCommus();
  const { t } = useTranslation(['common']);

  const { commuId } = useParams();
  const navigate = useNavigate();
  const { setCommuId } = useContextCommu();

  useEffect(() => {
    if (!commuId) {
      navigate('/home');
    } else {
      setCommuId(commuId);
    }
  }, [commuId, navigate, setCommuId]);

  if (!commuId || !commus) {
    return <Stack sx={{ flex: 1 }}><CircularProgress /></Stack>;
  }

  const commu = commus.find((el) => el.id === commuId);

  return (
    <>
      <CommuHeader commuName={commu?.location} />
      {isLoading && t('loading')}
      {!commu && !isLoading && t('commuNo')}
      {commu && (
      <RumorCreator defaultCommuId={commuId} />
      )}
      <CommuRumors commuId={commuId} />
    </>
  );
}

export default Commu;
