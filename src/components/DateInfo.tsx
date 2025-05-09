import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import i18n from 'i18n';
import moment from 'moment';

type Props = { date: string };

function DateInfo({ date }: Props) {
  const todayDate = new Date().toLocaleDateString(i18n.language, {
    month: 'short',
    day: 'numeric',
  });
  const formattedDate = new Date(date).toLocaleDateString(
    i18n.language,
    {
      month: 'short',
      day: 'numeric',
    },
  );

  return (
    <Stack
      direction="row"
      sx={{
        maxWidth: '100%',
        '&:hover': {
          textDecoration: 'underline',
        },
      }}
      color={(theme) => theme.palette.grey[200]}
    >
      <Typography
        color={(theme) => theme.palette.grey[200]}
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {todayDate !== formattedDate ? formattedDate : moment(date).fromNow(true)}
      </Typography>
    </Stack>
  );
}

export default DateInfo;
