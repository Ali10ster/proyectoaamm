
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import HelpCenterRoundedIcon from "@mui/icons-material/HelpCenterRounded";
import PersonIcon from "@mui/icons-material/Person";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { authActions } from "../store/authSlice.ts";

export interface MenuProps {
  page: string;
}

function Menu(props: MenuProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const userData = useSelector((state: RootState) => state.authenticator); // Almacenamos lo que obtenemos del store usando el hook useSelector
  const isLoggedIn = userData.isAutenticated;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  function handleClickLogOut() {
    dispatch(authActions.logout());
    navigate("/");
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItemButton>
          </ListItem>
        </Link>
        {userData.userRol === "admin" ?
          <Link to="/reports" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ArticleRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Informes" />
              </ListItemButton>
            </ListItem>
          </Link>
          : null}
        {userData.userRol === "admin" ?
          <Link to="/gestionusuarios" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Gestión usuarios" />
              </ListItemButton>
            </ListItem>
          </Link>
          : null}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HelpCenterRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Ayuda" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleClickLogOut}>
            <ListItemIcon>
              <LogoutRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Salir" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>{props.page}
          </Typography>
          <div>
            <IconButton
              size="large"
              color="inherit"
              disableRipple
            >
              {(userData.userRol === "admin") ? <AdminPanelSettingsRoundedIcon /> :
                (userData.userRol === "user") ? <AdbIcon /> : <InsertEmoticonIcon />}
              <Typography variant="body1" sx={{ ml: 2 }}>
                {userData.userName}
              </Typography>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Menu;
