import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  ScatterSeries,
  Title,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation, EventTracker } from '@devexpress/dx-react-chart';

import { symbolCircle, symbol } from 'd3-shape';

const Point = (props) => (
  <ScatterSeries.Point
    {...props}
    d={symbol()
      .size([20 ** 2])
      .type(symbolCircle)()}
  />
);

export default function LineChart(props) {
  const { values } = props;

  return (
    <Paper>
      <Chart data={values}>
        <ArgumentAxis showGrid />
        <ValueAxis showGrid />

        <ScatterSeries
          valueField="y"
          argumentField="x"
          pointComponent={Point}
        />
        <Title text="Regressão" />
        <Animation duration={7000} />
        <EventTracker />
        <Tooltip />
      </Chart>
    </Paper>
  );
}
