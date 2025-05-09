import React from 'react';
import TextFieldIcon from 'components/TextFieldIcon';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';

type Props = { searchValue: string; setSearchValue: (text: string) => void };

function Search({ searchValue, setSearchValue }: Props) {
  const { t } = useTranslation(['commus']);

  return (
    <TextFieldIcon
      icon={<SearchIcon />}
      value={searchValue}
      onChange={(e) => setSearchValue(e.currentTarget.value)}
      placeholder={t('commuSearch')}
      sx={(theme) => ({
        background: `${theme.palette.grey[300]}`,
        marginTop: '16px',
        marginLeft: '16px',
        marginRight: '16px',
        borderRadius: '38px',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'transparent',
          borderRadius: '38px',
        },
      })}
    />
  );
}

export default Search;
