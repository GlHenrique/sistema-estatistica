import React from 'react'
import {
    AppBar,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItem, ListItemIcon, ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import app from "../../base";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import { Background, useStyles } from "../../pages/Home/styles";
import background from "../../assets/images/lightPurpleHeader.svg";
import { Link } from "react-router-dom";
import { IoMdAnalytics } from "react-icons/io";

export default function Header(props) {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [drawer, setDrawer] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const menu = [
        {name: 'Home', path: '/home', icon: 'home'},
        {name: 'Estatística Descritiva', path: '/discriptive-statistics', icon: 'InboxIcon'},
        {name: 'Probabilidade', path: '/probability', icon: 'InboxIcon'},
        {name: 'Correlação e Regressão', path: '/correlation-regression', icon: 'InboxIcon'},
    ];

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawer({...drawer, [side]: open});
    };

    const drawerList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                {menu.map(item => (
                    <Link
                        className={classes.link}
                        key={item.path} to={item.path}>
                        <ListItem button>
                            <ListItemIcon>
                                <IoMdAnalytics />
                            </ListItemIcon>
                            <ListItemText primary={item.name}/>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );

    return (
        <>
            <Drawer open={drawer.left} onClose={toggleDrawer('left', false)}>
                {drawerList('left')}
            </Drawer>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        onClick={toggleDrawer('left', true)}
                        color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {props.titleToolbar}
                    </Typography>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => app.auth().signOut()}>
                                <PowerSettingsNew color="error"/>
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Grid container>
                <Background src={background} />
            </Grid>
        </>
    )
}
