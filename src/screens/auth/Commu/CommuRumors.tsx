import { Stack } from '@mui/material';
import { useQueryCommuRumors } from 'api/rumors';
import RumorCard from 'components/RumorCard';
import React from 'react';

function CommuRumors({ commuId }: { commuId: string }) {
  const { data } = useQueryCommuRumors(commuId);

  return (
    <Stack flexDirection="column-reverse">
      {data && data?.map((el) => (
        <RumorCard
          key={el.id}
          commuName={el.location.location}
          username={el.user.username}
          date={el.date}
          content={el.content}
        />
      ))}
      {!data && null}
    </Stack>
  );
}

export default CommuRumors;
