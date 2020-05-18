import * as React from 'react';
import { Paper } from '@material-ui/core';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import {
  Animation,
  EventTracker,
  ArgumentScale,
  Stack,
} from '@devexpress/dx-react-chart';

import { scaleBand } from '@devexpress/dx-chart-core';

export default function BarChat(props) {
  const { content, title } = props;

  return (
    <Paper>
      <Chart data={content}>
        <ArgumentScale factory={scaleBand} />
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries
          valueField="relativeFrequency"
          argumentField="variableName"
        />
        <Stack />
        <Title text={title} />
        <Animation duration={7000} />
        <EventTracker />
        <Tooltip />
      </Chart>
    </Paper>
  );
}
