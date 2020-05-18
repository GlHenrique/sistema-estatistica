import React from 'react';
import { Paper } from '@material-ui/core';
import {
  Chart,
  PieSeries,
  Title,
  Tooltip,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation, EventTracker } from '@devexpress/dx-react-chart';

export default function PieChart(props) {
  const { content, title } = props;

  return (
    <Paper
      elevation={3}
      style={{ display: 'flex', justifyContent: 'center', height: '87vh' }}
    >
      <Chart data={content} width={100} style={{ flex: 1 }}>
        <PieSeries
          valueField="relativeFrequency"
          argumentField="variableName"
        />
        <Title text={title} />
        <Animation duration={7000} />
        <EventTracker />
        <Tooltip />
        <Legend />
      </Chart>
    </Paper>
  );
}
