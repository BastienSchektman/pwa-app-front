import {
  CircularProgress, Stack, TextField, Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useContextUser } from 'contexts/UserProvider';
import { io, Socket } from 'socket.io-client';
import { BASE_URL_CHAT } from 'api/initializers/axios';
import { UserResponse } from 'api/user';
import { useTranslation } from 'react-i18next';
import Message from './Message';

type Props = {
  commuId: string;
  isChatModalOpen: boolean;
};

function Chat({ commuId, isChatModalOpen }: Props) {
  const { t } = useTranslation(['common']);
  const { user } = useContextUser();
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<{
    _id: string;
    message: string;
    user: UserResponse;
    date: Date;
  }[]>([]);

  const socket = useMemo<Socket | null>(() => {
    if (!user?.id || !commuId) return null;

    const s = io(`${BASE_URL_CHAT}/api/chat`, {
      query: {
        userId: user.id,
        locationId: commuId,
      },
      transports: ['websocket'],
    });

    s.on('connect', () => {
      console.log('✅ Socket connecté ! ID:', s.id);
    });

    s.on('connect_error', (err) => {
      console.error('❌ Erreur de connexion Socket.IO:', err.message);
    });

    return s;
  }, [user?.id, commuId]);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message: {
      _id: string;
      message: string;
      user: UserResponse;
    }) => {
      setMessages((m) => [...m, { ...message, date: new Date() }]);
    };

    socket.on('message', handleMessage);
    return () => {
      socket.off('message', handleMessage);
    };
  }, [socket]);

  const handleSend = () => {
    if (!socket || !value.trim()) return;
    socket.emit('message', value.trim());
    setValue('');
  };

  if (!user) return <Stack sx={{ flex: 1 }}><CircularProgress /></Stack>;

  return (
    <Stack sx={(theme) => ({
      backgroundColor: theme.palette.grey[300],
      height: '100%',
      margin: '16px',
      borderRadius: '12px',
      padding: '8px 16px',
      position: 'relative',
      overflow: 'hidden',
      ...(isChatModalOpen && { marginTop: 0 }),
    })}
    >
      <Typography variant="h6">Chat</Typography>

      <Stack sx={{
        overflowY: 'scroll',
        flexDirection: 'column-reverse',
        overscrollBehavior: 'contain',
        marginBottom: '8px',
      }}
      >
        <Stack>
          {messages.map((el) => (
            <Message
              key={el.date.getTime()}
              date={el.date}
              pseudo={el.user.username}
              isFromCurrentUser={user.id === el.user.id}
              message={el.message}
            />
          ))}
        </Stack>
      </Stack>

      <Stack sx={{ marginTop: 'auto' }} direction="row" alignItems="center" spacing={1}>
        <TextField
          multiline
          maxRows={3}
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-input': {
              overscrollBehavior: 'contain',
            },
          }}
          InputProps={{
            style: { paddingBottom: 8, paddingTop: 8 },
          }}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          placeholder={t('writeMessage')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend();
              e.preventDefault();
            }
          }}
        />
        <SendOutlinedIcon
          sx={{ cursor: 'pointer', display: value ? 'flex' : 'none' }}
          fontSize="small"
          onClick={handleSend}
        />
      </Stack>
    </Stack>
  );
}

export default Chat;
