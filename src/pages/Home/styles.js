import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250
    },
    fullList: {
        width: 'auto'
    },
    card: {
        maxWidth: 400
    },
    cardMedia: {
        height: 140
    }
}));
