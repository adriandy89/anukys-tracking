/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Paper, BottomNavigation, BottomNavigationAction, Menu, MenuItem, Typography, Badge, useTheme,
} from '@mui/material';

import DescriptionIcon from '@mui/icons-material/Description';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import MapIcon from '@mui/icons-material/Map';
import MapTwoToneIcon from '@mui/icons-material/MapTwoTone';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';

import { sessionActions } from '../../store';
import { useTranslation } from './LocalizationProvider';
import { useRestriction } from '../util/permissions';
import { nativePostMessage } from './NativeInterface';

const BottomMenu = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // const t = useTranslation();

  // const readonly = useRestriction('readonly');
  const disableReports = useRestriction('disableReports');
  const user = useSelector((state) => state.session.user);
  const socket = useSelector((state) => state.session.socket);

  // const [anchorEl, setAnchorEl] = useState(null);

  const currentSelection = () => {
    if (location.pathname === `/settings/user/${user.id}`) {
      return 'account';
    } if (location.pathname.startsWith('/settings')) {
      return 'settings';
    } if (location.pathname.startsWith('/reports')) {
      return 'reports';
    } if (location.pathname === '/') {
      return 'map';
    }
    return null;
  };

  // const handleAccount = () => {
  //   setAnchorEl(null);
  //   navigate(`/settings/user/${user.id}`);
  // };

  const handleLogout = async () => {
    // setAnchorEl(null);

    const notificationToken = window.localStorage.getItem('notificationToken');
    if (notificationToken && !user.readonly) {
      window.localStorage.removeItem('notificationToken');
      const tokens = user.attributes.notificationTokens?.split(',') || [];
      if (tokens.includes(notificationToken)) {
        const updatedUser = {
          ...user,
          attributes: {
            ...user.attributes,
            notificationTokens: tokens.length > 1 ? tokens.filter((it) => it !== notificationToken).join(',') : undefined,
          },
        };
        await fetch(`/api/users/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser),
        });
      }
    }

    await fetch('/api/session', { method: 'DELETE' });
    nativePostMessage('logout');
    navigate('/login');
    dispatch(sessionActions.updateUser(null));
  };

  const handleSelection = (event, value) => {
    switch (value) {
      case 'map':
        navigate('/');
        break;
      case 'reports':
        navigate('/reports/combined');
        break;
      case 'settings':
        navigate('/settings/preferences');
        break;
      case 'account':
        // setAnchorEl(event.currentTarget);
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  return (
    <Paper square elevation={3}>
      <BottomNavigation value={currentSelection()} onChange={handleSelection} showLabels style={{ backgroundColor: theme.palette.primary.main }}>
        <BottomNavigationAction
          // label={t('mapTitle')}
          style={{ color: theme.palette.primary.contrastText }}
          icon={(
            <Badge color="error" variant="dot" overlap="circular" invisible={socket !== false}>
              <MapTwoToneIcon fontSize="large" />
            </Badge>
          )}
          value="map"
        />
        {!disableReports && (
          <BottomNavigationAction
            // label={t('reportTitle')}
            icon={<DescriptionTwoToneIcon fontSize="large" />}
            value="reports"
            style={{ color: theme.palette.primary.contrastText }}
          />
        )}
        <BottomNavigationAction
          // label={t('settingsTitle')}
          icon={<SettingsTwoToneIcon fontSize="large" />}
          value="settings"
          style={{ color: theme.palette.primary.contrastText }}
        />
        {/* {readonly ? ( */}
        <BottomNavigationAction
            // label={t('loginLogout')}
          icon={<LogoutTwoToneIcon fontSize="large" />}
          value="logout"
          style={{ color: theme.palette.primary.contrastText }}
        />
        {/* ) : ( */}
        {/* <BottomNavigationAction
            // label={t('settingsUser')}
          icon={<PersonIcon fontSize="large" />}
          value="account"
          style={{ color: theme.palette.primary.contrastText }}
        /> */}
        {/* )} */}
      </BottomNavigation>
      {/* <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={handleAccount}>
          <Typography color="textPrimary">{t('settingsUser')}</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography color="error">{t('loginLogout')}</Typography>
        </MenuItem>
      </Menu> */}
    </Paper>
  );
};

export default BottomMenu;
