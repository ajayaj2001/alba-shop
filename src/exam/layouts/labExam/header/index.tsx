import { Button, Hidden, Popover, IconButton, Slide, Fade } from '@material-ui/core';
import React from 'react';
import { BsList } from 'react-icons/bs';
import Link from 'next/link';
import { BiCoffeeTogo } from 'react-icons/bi';
export const LabExamHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div className="header">
      <div className="header_container">
        <a href="#" className="header_banner">
          <div className="header_banner-logo">PSNA</div>
          <h4 className="header_banner-name">Vanakam Da Mapla</h4>
        </a>
        <Hidden smDown>
          <div className="header_tabs ">
            <a href="#CNS LAB" className="header_mv-link header_tab" onClick={handleClose}>
              CNS
            </a>
            <a href="#CC LAB" className="header_mv-link header_tab" onClick={handleClose}>
              CC
            </a>
          </div>

          <Link href="/" passHref>
            <Button
              variant="contained"
              color="primary"
              className="header_button"
              // target="_blank"
              // href="https://www.buymeacoffee.com/ajayaj"
              startIcon={<BiCoffeeTogo />}
            >
              Home
            </Button>
          </Link>
        </Hidden>
        <Hidden mdUp>
          <IconButton onClick={handleClick} aria-describedby={id}>
            <BsList color="white" fontSize="25px" />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            disableEnforceFocus
            onClose={handleClose}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            transformOrigin={{ horizontal: 'center', vertical: 'top' }}
          >
            <Slide in={open} timeout={300}>
              <div className="header_mv">
                <a href="#CNS LAB" className="header_mv-link header_tab" onClick={handleClose}>
                  CNS
                </a>
                <a href="#CC LAB" className="header_mv-link header_tab" onClick={handleClose}>
                  CC
                </a>
                <Link href="/" passHref>
                  <Button
                    variant="contained"
                    color="primary"
                    className="header_mv-button"
                    onClick={handleClose}
                    // target="_blank"
                    // href="https://www.buymeacoffee.com/ajayaj"
                    startIcon={<BiCoffeeTogo />}
                  >
                    Home
                  </Button>
                </Link>
              </div>
            </Slide>
          </Popover>
        </Hidden>
      </div>
    </div>
  );
};
