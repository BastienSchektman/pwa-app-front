import { Stack, Typography } from '@mui/material';
import LogoText from 'components/LogoText';
import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PeopleIcon from '@mui/icons-material/People';
import { useContextCommu } from 'contexts/CommuProvider';

const createNavLink = (
  name: string,
  to: string,
  iconFilled: React.ReactNode,
  iconOutlined: React.ReactNode,
  handleNavChange: () => void,
) => (
  <Stack>
    <NavLink
      onClick={handleNavChange}
      to={to}
      style={{ textDecoration: 'none' }}
    >
      {({ isActive }) => (
        <Stack
          direction="row"
          sx={(theme) => ({
            fontSize: '28px',
            alignItems: 'center',
            color: isActive ? theme.palette.common.white : theme.palette.grey[100],
            '&:hover': {
              [`#${name}`]:
              { backgroundColor: theme.palette.grey[300] },
            },
          })}

        >
          <Stack
            direction="row"
            sx={{
              width: 'fit-content',
              alignItems: 'center',
              justifyContent: 'start',
              padding: '12px',
              borderRadius: '200px',
              transition: 'background-color 0.2s linear',
            }}
            id={name}
            spacing={1}
          >
            {isActive ? iconFilled : iconOutlined}
            <Typography variant={isActive ? 'h5' : 'h6'} sx={{ display: { xs: 'none', sm: 'block' } }}>
              {name}
            </Typography>
          </Stack>

        </Stack>
      )}
    </NavLink>
  </Stack>
);

function Navbar() {
  const { setCommuId } = useContextCommu();
  const handleNavChange = () => { setCommuId(undefined); };
  return (
    <Stack justifyContent={{ xs: 'space-around', sm: 'start' }} sx={{ width: { xs: '100%', sm: '200px' } }} direction={{ xs: 'row', sm: 'column' }}>
      <LogoText link onClick={handleNavChange} />
      {createNavLink('Accueil', '/home', <HomeIcon fontSize="inherit" />, <HomeOutlinedIcon fontSize="inherit" />, handleNavChange)}
      {createNavLink('Commus', '/commus', <PeopleIcon fontSize="inherit" />, <PeopleOutlinedIcon fontSize="inherit" />, handleNavChange)}
      {createNavLink('Profil', '/profil', <AccountCircleIcon fontSize="inherit" />, <AccountCircleOutlinedIcon fontSize="inherit" />, handleNavChange)}
    </Stack>
  );
}

export default Navbar;
