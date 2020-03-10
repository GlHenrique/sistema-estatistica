import React from 'react';
import {
    AppBar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    IconButton,
    MenuItem,
    Menu,
    Card,
    CardActionArea,
    Button,
    Grid, CardContent, CardActions
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew'
import { useStyles } from "./styles";
import app from "../../base";
import { Link } from 'react-router-dom';

export default function Home() {
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
        {name: 'Estatística Descritiva', path: '/estatistica-descritiva'},
        {name: 'Probabilidade', path: '/probabilidade'},
        {name: 'Correlação e Regressão', path: '/correlacao'},
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
                    <Link key={item.path} to={item.path}>
                        <ListItem button>
                            <ListItemIcon>
                                <InboxIcon/>
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
            <div className={classes.root}>
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
                            Lookup - Home
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
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                <Grid container>
                    <Card className={classes.card}>
                        <CardActionArea
                            className={classes.media}
                            image="https://source.unsplash.com/random"
                            title="Estatística Descritiva"
                        >
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Lizards are ....
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Share
                            </Button>
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </div>
        </>
    );
}
