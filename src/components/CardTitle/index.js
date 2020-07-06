import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from '@material-ui/core';
import { useStyles } from './styles';

export default function CardTitle(props) {
  const classes = useStyles();
  const { title, content, image, onPress } = props;

  return (
    <Paper elevation={3}>
      <CardActionArea onClick={onPress}>
        <Card style={{ minHeight: 400 }} className={classes.cardWidth}>
          <CardMedia component="img" height="200" image={image} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {content}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Paper>
  );
}
