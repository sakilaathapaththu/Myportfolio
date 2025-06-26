// import { useAuth } from "../../utils/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   if (!user) {
//     navigate("/login"); // Redirect to login if not authenticated
//     return null;
//   }

//   return (
//     <div className="container mt-5">
//       <h2>Welcome,hello {user.email} 🎉</h2>
//       <p>This is your protected dashboard.</p>

//       <button className="btn btn-danger mt-3" onClick={logout}>Logout</button>
//     </div>
//   );
// };


import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddIcon from '@mui/icons-material/Add';
import LaptopIcon from '@mui/icons-material/Laptop';
import ListIcon from '@mui/icons-material/List';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import {
  Account,
  AccountPreview,
  AccountPopoverFooter,
  SignOutButton,
} from '@toolpad/core/Account';

import { useAuth } from "../../utils/AuthContext"; // Import your authentication context
import { useNavigate } from "react-router-dom"; // Import the navigate hook from react-router

import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import AddSkills from './Addskills'; // Import the AddSkills component
import Addproject from './Addproject';
import Viewskills from './Viewskills';
import AddQualification from './Addqualification';
import ViewQualifications from './Viewqualification';
import ViewProjects from './Viewproject';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'AddDetails',
    title: 'Add Details',
    icon: <FolderIcon />,
    children: [
      {
        segment: 'addbio',
        title: 'Bio',
        icon: <AddIcon />,
      },
      {
        segment: 'projects',
        title: 'Projects',
        icon: <LaptopIcon />,
      },
      {
        segment: 'skills',
        title: 'Skills',
        icon: <ListIcon />,
      },
      {
        segment: 'qualification',
        title: 'Qualifications',
        icon: <PlaylistAddIcon />,
      },
    ],
  },
  {
    segment: 'ViewDetails',
    title: 'View Details',
    icon: <FolderIcon />,
    children: [
      {
        segment: 'addbio',
        title: 'Bio',
        icon: <AddIcon />,
      },
      {
        segment: 'projects',
        title: 'Projects',
        icon: <LaptopIcon />,
      },
      {
        segment: 'skills',
        title: 'Skills',
        icon: <ListIcon />,
      },
      {
        segment: 'qualification',
        title: 'Qualifications',
        icon: <PlaylistAddIcon />,
      },
    ],
  },
  
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  if (pathname === '/AddDetails/skills') {
    return <AddSkills />; // Render AddSkills component when route is /skills
  }
  if (pathname === '/AddDetails/projects') {
    return <Addproject />;
  }
  if (pathname === '/AddDetails/qualification') {
    return <AddQualification />;
  }
  if (pathname === '/ViewDetails/skills') {
    return <Viewskills />;
  } if (pathname === '/ViewDetails/qualification') {
    return <ViewQualifications />;
  } if (pathname === '/ViewDetails/projects') {
    return <ViewProjects />;
  }
  
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function AccountSidebarPreview(props) {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0}>
      <Divider />
      <AccountPreview
        variant={mini ? 'condensed' : 'expanded'}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
}

AccountSidebarPreview.propTypes = {
  handleClick: PropTypes.func,
  mini: PropTypes.bool.isRequired,
  open: PropTypes.bool,
};
  

function SidebarFooterAccountPopover() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login"); // Redirect to login if not authenticated
    return null;
  }
  return (
    <Stack direction="column">
      <Typography variant="body2" mx={2} mt={1}>
        Account
      </Typography>
      <MenuList>
        {/* Assuming user is an object and not an array */}
        <MenuItem
          key={user.email}
          component="button"
          sx={{
            justifyContent: 'flex-start',
            width: '100%',
            columnGap: 2,
          }}
        >
          <ListItemIcon>
            {/* <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: '0.95rem',
                bgcolor: user.color || '#8B4513', // Default to brown color if no color is provided
              }}
              src={user.image ?? ''}
              alt={user.name ?? ''}
            >
              {user.name[0]}
            </Avatar> */}
          </ListItemIcon>
          <ListItemText
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '100%',
            }}
            primary={user.name}
            secondary={user.email}
            primaryTypographyProps={{ variant: 'body2' }}
            secondaryTypographyProps={{ variant: 'caption' }}
          />
        </MenuItem>
      </MenuList>
      <Divider />
      <AccountPopoverFooter>
        <SignOutButton onClick={logout} />
      </AccountPopoverFooter>
    </Stack>
  );
}


const createPreviewComponent = (mini) => {
  function PreviewComponent(props) {
    return <AccountSidebarPreview {...props} mini={mini} />;
  }
  return PreviewComponent;
};

function SidebarFooterAccount({ mini }) {
  const PreviewComponent = React.useMemo(() => createPreviewComponent(mini), [mini]);
  return (
    <Account
      slots={{
        preview: PreviewComponent,
        popoverContent: SidebarFooterAccountPopover,
      }}
      slotProps={{
        popover: {
          transformOrigin: { horizontal: 'left', vertical: 'bottom' },
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          disableAutoFocus: true,
          slotProps: {
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: (theme) =>
                  `drop-shadow(0px 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.32)'})`,
                mt: 1,
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  bottom: 10,
                  left: 0,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          },
        },
      }}
    />
  );
}

SidebarFooterAccount.propTypes = {
  mini: PropTypes.bool.isRequired,
};

const demoSession = {
  user: {
    name: 'Bharat Kashyap',
    email: 'bharatkashyap@outlook.com',
    image: 'https://avatars.githubusercontent.com/u/19550456',
  },
};

export default function Dashboard(props) {
  const { window } = props;

  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

  const [session, setSession] = React.useState(demoSession);
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(demoSession);
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      authentication={authentication}
      session={session}
    >
      <DashboardLayout
        slots={{ toolbarAccount: () => null, sidebarFooter: SidebarFooterAccount }}
      >
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
