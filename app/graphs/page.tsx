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
    xAxis: {
      min: 0,
      max: 6,
      plotBands: [{
        from: 0,
        to: 2,
        color: 'red'
      }, {
        from: 2,
        to: 5,
        color: 'yellow'
      }, {
        from: 5,
        to: 6,
        color: 'green'
      }]
    },
    yAxis: {
      min: 0,
      max: 100,
      plotBands: [{
        from: 0,
        to: 10,
        color: 'red'
      }, {
        from: 10,
        to: 30,
        color: 'yellow'
      }, {
        from: 30,
        to: 100,
        color: 'green'
      }]
    },
    series: [
      {
        type: 'scatter',
        data: [
          [5, 40],
          [1, 20],
          [2, 10],
          [3, 40],
          [4, 80]
        ],
        color: '#FF0000'            
      },
      {
        type: 'scatter',
        data: [
          [5, 10],
          [1, 60],
          [2, 50],
          [3, 70],
          [4, 20]
        ],
        color: '#008000'
      }
    ],
  };




const Page = (props: HighchartsReact.Props) => {

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  useEffect(() => {
    const chart = chartComponentRef.current?.chart;
    if (chart) {
      const xAxis = chart.xAxis[0];
      const yAxis = chart.yAxis[0];

      // x=2-6, y=50-80 の範囲に矩形を描画
      chart.renderer.rect(
        xAxis.toPixels(2),
        yAxis.toPixels(80),
        xAxis.toPixels(6) - xAxis.toPixels(2),
        yAxis.toPixels(80) - yAxis.toPixels(50)
      )
      .attr({
        fill: 'rgba(255,0,0,0.3)',
        zIndex: 0,
      })
      .add();
    }
  }, []);
    return (
      <div>
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
      </div>
  )
}

export default Page
