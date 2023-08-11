import React, { useEffect, useState } from 'react';
import {
  Paper, useTheme,
} from '@mui/material';
import TaxiAlertIcon from '@mui/icons-material/TaxiAlert';
import {
  blueGrey, green, red,
} from '@mui/material/colors';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const InfoBottom = () => {
  const theme = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const devices = useSelector((state) => state.devices.items);
  const deviceStatusCount = (status) => Object.values(devices).filter((d) => d.status === status).length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute (60000 milliseconds)

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formattedDate = currentDate.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  return (
    <Paper square elevation={3}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          width: '100%',
          alignItems: 'center',
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.primary.main,
          fontWeight: 'bold',
          color: theme.palette.primary.contrastText,
          padding: '5px 0',
          '& svg': {
            m: 1.5,
          },
          '& hr': {
            mx: 0.5,
          },
        }}
      >
        <div style={{ paddingRight: '0 6px' }}>
          {formattedDate}
        </div>
        <Divider orientation="vertical" flexItem style={{ backgroundColor: theme.palette.primary.contrastText }} />
        <TaxiAlertIcon fontSize="medium" style={{ margin: 0 }} />
        <div style={{ padding: '5px', color: green[200] }}>
          {`${deviceStatusCount('online')}`}
        </div>
        {' '}
        |
        <div style={{ padding: '0 5px', color: red[200] }}>{`${deviceStatusCount('offline')}`}</div>
        {' '}
        |
        <div style={{ paddingLeft: '5px', color: blueGrey[200] }}>{`${deviceStatusCount('unknown')}`}</div>
      </Box>
    </Paper>
  );
};

export default InfoBottom;
