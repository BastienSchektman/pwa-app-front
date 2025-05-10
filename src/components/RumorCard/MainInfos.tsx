import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { RumorResponse } from 'api/rumors';
import MainHeader from './MainHeader';

type Props = {
  commuName: string;
  username: string;
} & Pick<RumorResponse, 'date' | 'content'>;

function MainInfos({
  commuName,
  username,
  date,
  content,
}: Props) {
  return (
    <Stack sx={{ maxWidth: 'calc(100% - 62px)', height: '100%' }}>
      <MainHeader username={username} commuName={commuName} date={date} />
      <Typography mt="8px" mb="16px" sx={{ overflowWrap: 'break-word' }}>
        Askip,
        {' '}
        {content}
      </Typography>
    </Stack>
  );
}

export default MainInfos;
