import { useQueryCommus } from 'api/commus';
import CommuCard from 'components/CommuCard';
import Header from 'components/Header';
import React, { useState } from 'react';
import Search from './Search';

function CommuSearch() {
  const { data: commus } = useQueryCommus({
    placeholderData: [],
  });
  const [searchValue, setSearchValue] = useState('');

  const searchCaseDiatricsInsensitive = (search: string, text: string) => text?.toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .includes(
      search
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, ''),
    );

  return (
    <>
      <Header name="commus">
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      </Header>
      {commus?.filter((el) => searchCaseDiatricsInsensitive(searchValue, el.location)).map((el) => (
        <CommuCard
          key={el.id}
          commuId={el.id}
          commuName={el.location}
        />
      ))}
    </>
  );
}

export default CommuSearch;
