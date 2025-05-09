import { LoadingButton } from '@mui/lab';
import {
  TextField, Stack, Autocomplete, InputAdornment, CircularProgress,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { CommuResponse, useQueryCommus } from 'api/commus';
import { rumorsKey, useMutationRumor } from 'api/rumors';
import ProfilePicture from 'components/ProfilePicture';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  defaultCommuId?: string;
};

function RumorCreator({ defaultCommuId }: Props) {
  const { t } = useTranslation(['common']);
  const [rumorText, setRumorText] = useState('');
  const [rumorCommu, setRumorCommu] = useState<CommuResponse | undefined>();
  const [isFocused, setIsFocused] = useState(false);
  const queryClient = useQueryClient();
  const { data: commus } = useQueryCommus({
    placeholderData: [],
  });

  const { mutate, isLoading } = useMutationRumor({
    onSuccess: () => queryClient.invalidateQueries([rumorsKey]),
  });

  useEffect(() => {
    if (commus) {
      const defaultCommu = defaultCommuId ? commus.find((el) => el.id === defaultCommuId)
        : undefined;
      setRumorCommu(defaultCommu || commus[0]);
    }
  }, [commus, defaultCommuId]);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setRumorText(e.currentTarget.value);
  };

  if (!commus || !rumorCommu) return <Stack sx={{ flex: 1 }}><CircularProgress /></Stack>;

  const handleOnClick = () => {
    mutate({
      locationId: rumorCommu.id,
      content: rumorText,
    });
    setRumorText('');
  };

  return (
    <Stack
      direction="row"
      sx={(theme) => ({
        flexShrink: 0, borderBottom: `1px solid ${theme.palette.grey[300]}`, width: '100%',
      })}
    >
      <Stack
        sx={() => ({
          width: '100%',
          padding: '16px',
          transition: 'background-color 0.2s ease',
        })}
        spacing={2}
        direction="row"
        alignItems="flex-start"
      >
        <Stack>
          <ProfilePicture />
        </Stack>
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Autocomplete
            disabled={!!defaultCommuId}
            sx={{ minWidth: '130px', maxWidth: '320px' }}
            disableClearable
            getOptionLabel={(option) => option?.location || ''}
            options={commus}
            value={rumorCommu}
            onChange={(_, commu) => setRumorCommu(commu)}
            autoHighlight
            renderInput={(params) => (
              <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '200px',
                    fontSize: '14px',
                    padding: '4px',
                  },
                }}
              />
            )}
          />
          <TextField
            fullWidth
            placeholder={!isFocused ? 'Askip, t’as une rumeur à partager ?' : undefined}
            sx={{ '& fieldset': { border: 'none' } }}
            value={rumorText}
            onChange={handleOnChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            multiline
            InputProps={{
              ...((isFocused || rumorText) && {
                startAdornment:
  <InputAdornment
    position="start"
    sx={{
      fontSize: '20px',
      fontWeight: 'bold',
      alignSelf: 'start',
      height: 'auto',
    }}
  >
    Askip,
    {' '}

  </InputAdornment>,
              }),
              style: { fontSize: '20px', fontWeight: 'bold', padding: '0' },
            }}
          />
          <Stack direction="row" justifyContent="end">
            <LoadingButton
              type="submit"
              color="secondary"
              variant="contained"
              size="large"
              disabled={!rumorText || !rumorText.trim().length}
              onClick={handleOnClick}
              loading={isLoading}
            >
              {t('share')}
            </LoadingButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default RumorCreator;
