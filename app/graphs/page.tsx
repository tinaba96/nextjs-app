'use client';

import React, { useEffect, useRef, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';

const options: Highcharts.Options = {
    title: {
      text: 'スコア推移',
    },
    series: [
      {
        type: 'line',
        data: [1, 5, 2, 3, 4, 5],
      },
    ],
  };

const options2: Highcharts.Options = {
    title: {
      text: 'あなたの位置',
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
        <HighchartsReact
          highcharts={Highcharts}
          options={options2}
          ref={chartComponentRef}
          {...props}
        />
  )
}

export default page
