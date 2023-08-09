/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Paper,
} from '@mui/material';
import TaxiAlertIcon from '@mui/icons-material/TaxiAlert';
import { blueGrey, green, grey, indigo, red } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const InfoBottom = () => {
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
          border: (theme) => `1px solid ${theme.palette.divider}`,
          bgcolor: indigo[500],
          fontWeight: 'bold',
          color: '#f2f2f2',
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
        <Divider orientation="vertical" flexItem style={{ backgroundColor: '#f2f2f2' }} />
        <TaxiAlertIcon fontSize="medium" style={{ margin: 0 }} />
        <div style={{ padding: '5px', color: green[300] }}>
          {`${deviceStatusCount('online')}`}
        </div>
        {' '}
        |
        <div style={{ padding: '0 5px', color: red[300] }}>{`${deviceStatusCount('offline')}`}</div>
        {' '}
        |
        <div style={{ paddingLeft: '5px', color: blueGrey[200] }}>{`${deviceStatusCount('unknown')}`}</div>
      </Box>
    </Paper>
  );
};

export default InfoBottom;
