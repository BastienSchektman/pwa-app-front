import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { RumorResponse } from 'api/rumors';
import DateInfo from '../DateInfo';

type Props = {
  commuName: string;
  username: string;

} & Pick<RumorResponse, 'date'>;

function MainHeader({ username, commuName, date }: Props) {
  return (
    <Stack direction="row" flexWrap="wrap">
      <Stack
        spacing={1}
        pr={1}
        direction="row"
        sx={(theme) => ({
          maxWidth: '100%',
          '& span': {
            color: theme.palette.grey[200],
          },
        })}
      >
        <Typography
          fontWeight="bold"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {commuName}

        </Typography>
        <span>&middot;</span>
      </Stack>
      <Stack spacing={1} pr={1} direction="row" color={(theme) => theme.palette.grey[200]} sx={{ maxWidth: '100%' }}>
        <Typography sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        >
          {username}

        </Typography>
        <span>&middot;</span>
      </Stack>
      <DateInfo date={date} />
    </Stack>
  );
}

export default MainHeader;
