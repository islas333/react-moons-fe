import React from 'react';
import { Typography } from '@mui/material';

const Header = () => {
  return (
    <Typography>
      <img className='mt-2 mb-5 flex flex-auto' src="https://cdn.prod.website-files.com/65a94e476271b401013cfefc/65aeac138e81eef7f9877af5_logomoons.svg" alt="Logo empresa" style={{ maxWidth: '100%', height: 'auto' }} />
    </Typography>
  );
}

export default Header;