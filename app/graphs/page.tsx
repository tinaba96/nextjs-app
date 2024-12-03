'use client';

import React, { useEffect, useRef, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';

const options: Highcharts.Options = {
    title: {
      text: 'My chart',
    },
    series: [
      {
        type: 'line',
        data: [1, 5, 2, 3, 4, 5],
      },
    ],
  };

const page = (props: HighchartsReact.Props) => {
const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    return (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartComponentRef}
          {...props}
        />
  )
}

export default page
