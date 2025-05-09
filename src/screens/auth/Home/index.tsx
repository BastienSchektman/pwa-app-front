import React from 'react';
import RumorCard from 'components/RumorCard';
import Header from 'components/Header';
import RumorCreator from 'components/RumorCreator';
import { useQueryRumors } from 'api/rumors';
import { Stack } from '@mui/material';

function Home() {
  const { data } = useQueryRumors();
  return (
    <>
      <Header name="home" />
      <RumorCreator />
      <Stack flexDirection="column-reverse">
        {data?.map((el) => (
          <RumorCard
            key={el.id}
            commuName={el.location.location}
            username={el.user.username}
            date={el.date}
            content={el.content}
          />
        ))}
      </Stack>
    </>
  );
}

export default Home;
