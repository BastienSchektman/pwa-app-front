import { Typography } from '@mui/material';
import i18n from 'i18n';
import React from 'react';

type Props = {
  date: Date,
  pseudo: string,
  isFromCurrentUser: boolean,
  message: string
};

const fontSize = '0.93em';

function Message({
  date, pseudo, isFromCurrentUser, message,
}: Props) {
  const time = date.toLocaleTimeString(
    i18n.language,
    {
      hour: '2-digit',
      minute: '2-digit',
    },
  );
  return (
    <Typography mb="2px">
      <Typography fontSize={fontSize} component="span" color={(theme) => theme.palette.grey[200]} mr="3px">
        {time}
      </Typography>
      <Typography
        fontSize={fontSize}
        component="span"
        sx={(theme) => ({
          color: isFromCurrentUser ? theme.palette.secondary.main : theme.palette.primary.main,
          fontWeight: 700,
          fontFamily: 'Open Sans',
        })}
      >
        {pseudo}
      </Typography>
      <Typography fontSize={fontSize} component="span">
        :
        {' '}
        {message}
      </Typography>
    </Typography>
  );
}

export default Message;
