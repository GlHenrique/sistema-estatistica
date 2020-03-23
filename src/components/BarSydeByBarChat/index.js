import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Title,
    Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { Stack, Animation, EventTracker } from '@devexpress/dx-react-chart';

export default function BarSydeBarChart(props) {

    const {content, title} = props;

    return (
        <Paper>
            <Chart data={content}>
                <ArgumentAxis/>
                <ValueAxis/>
                <BarSeries
                    name="Gold Medals"
                    valueField="relativeFrequency"
                    argumentField="variableName"
                    color="#ffd700"
                />
                <Animation duration={7000}/>
                <Title text={title}/>
                <Stack/>
                <EventTracker/>
                <Tooltip/>
            </Chart>
        </Paper>
    );

}
