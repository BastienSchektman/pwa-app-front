import React from 'react';
import Stack from '@mui/material/Stack';
import { lighten } from '@mui/material/styles';
import ProfilePicture from 'components/ProfilePicture';
import { Typography } from '@mui/material';
import DateInfo from 'components/DateInfo';
import { useNavigate } from 'react-router-dom';
import { useContextCommu } from 'contexts/CommuProvider';

type Props = {
  commuName: string,
  date?: string,
  nbRumors?: number,
  commuId: string,
};

function CommuCard({
  commuName, date, nbRumors, commuId,
}: Props) {
  const navigate = useNavigate();
  const { setCommuId } = useContextCommu();

  return (
    <Stack
      sx={(theme) => ({
        minHeight: '100px',
        flexShrink: 0,
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        width: '100%',
        padding: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        '&:hover': { backgroundColor: lighten(theme.palette.background.default, 0.02) },
      })}
      spacing={2}
      onClick={() => {
        setCommuId(commuId);
        navigate(`${commuId}`);
      }}
    >

      <Stack sx={{ alignItems: 'center', flexDirection: 'row' }}>
        <Stack>
          <ProfilePicture />
        </Stack>
        <Typography
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontWeight: '700',
            fontSize: '1.2rem',
            paddingLeft: '16px',
          }}
        >
          {commuName}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        flexWrap="wrap"
        sx={{
          fontSize: '0.8rem',
          '& .MuiTypography-root': {
            fontSize: '0.8rem',
          },
        }}
      >
        <Stack
          spacing={1}
          pr={1}
          direction="row"
          color={(theme) => theme.palette.grey[200]}
          sx={{ maxWidth: '100%' }}
        >
          <Typography sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          >
            {nbRumors}
            {nbRumors !== undefined
              && ' rumeurs'}
          </Typography>
          {nbRumors !== undefined && <span>&middot;</span>}
        </Stack>
        {date && <DateInfo date={date} />}
      </Stack>
    </Stack>
  );
}

export default CommuCard;
