import React from 'react';
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Paper,
    Typography
} from "@material-ui/core";
import { useStyles} from "./styles";
import mindMap from "../../assets/images/mapa_mental.png";
import api from '../../services/api';

export default function CardTitle(props) {
    const classes = useStyles();
    const teste = 5;
    const teste2 = [0, 2 ,3];
    const teste3 = 'XIBIU';

    function handleApi() {
        api.post('/calculate', {
            teste,
            teste2,
            teste3
        })
        .then(res => {
            console.log(res);
        })
    }

    return(
        <Paper elevation={3}>
            <Card className={classes.cardWidth}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="200"
                        image={mindMap}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            A estatística descritiva é a etapa inicial da análise
                            utilizada para descrever e resumir os dados. A
                            disponibilidade de uma grande quantidade de dados
                            e de métodos computacionais muito eficientes
                            revigorou está área da estatística.
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button onClick={handleApi} size="small" color="primary">
                        CHAMAR API
                    </Button>
                </CardActions>
            </Card>
        </Paper>
    )
}
