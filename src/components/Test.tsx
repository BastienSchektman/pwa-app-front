import { Typography } from '@mui/material';
import React from 'react';

function Test({ waitingWorker }: { waitingWorker: ServiceWorker | null }) {
  return (
    <Typography>
      Une nouvelle version du site est disponible.
      {' '}
      <Typography
        component="span"
        sx={(theme) => ({
          color: theme.palette.primary.main,
          textDecoration: 'underline',
          cursor: 'pointer',
        })}
        onClick={() => {
          waitingWorker?.postMessage({
            type: 'SKIP_WAITING',
          });
          window.location.reload();
        }}
      >
        Cliquez-ici
      </Typography>
      {' '}
      pour mettre à jour le site.
    </Typography>
  );
}

export default Test;
