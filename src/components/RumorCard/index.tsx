import React from 'react';
import Stack from '@mui/material/Stack';
import ProfilePicture from 'components/ProfilePicture';
import { lighten } from '@mui/material/styles';
import { RumorResponse } from 'api/rumors';
import MainInfos from './MainInfos';

type Props = {
  commuName: string;
  username: string;
} & Omit<RumorResponse, 'location' | 'user' | 'id'>;

function RumorCard({
  commuName,
  username,
  date,
  content,
}: Props) {
  return (
    <Stack
      direction="row"
      sx={(theme) => ({
        minHeight: '150px', flexShrink: 0, borderBottom: `1px solid ${theme.palette.grey[300]}`, width: '100%',
      })}
    >
      <Stack
        sx={(theme) => ({
          width: 'calc(100%)',
          padding: '16px',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
          '&:hover': { backgroundColor: lighten(theme.palette.background.default, 0.02) },
        })}
        spacing={2}
        direction="row"
        alignItems="flex-start"
      >
        <Stack>
          <ProfilePicture />
        </Stack>
        <MainInfos
          commuName={commuName}
          username={username}
          date={date}
          content={content}
        />
      </Stack>
    </Stack>
  );
}

export default RumorCard;
