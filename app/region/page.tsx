// components/HighChart.tsx

'use client';

import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const HighChart: React.FC = () => {
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  // Highchartsのオプション設定
  const options: Highcharts.Options = {
    chart: {
      type: 'scatter',
      events: {
        load() {
          const chart = this;

          // 背景領域（x軸 2-10, y軸 30-80）の矩形を描画
          chart.renderer.rect(
            chart.xAxis[0].toPixels(0), // x軸の2の位置（ピクセル単位）
            chart.yAxis[0].toPixels(20), // y軸の80の位置（ピクセル単位）
            chart.xAxis[0].toPixels(3) - chart.xAxis[0].toPixels(0), // x軸の2から10の幅
            chart.yAxis[0].toPixels(0) - chart.yAxis[0].toPixels(20) // y軸の30から80の高さ
          )
            .attr({
              fill: 'rgba(169, 169, 169, 0.2)', // 灰色の背景色
              zIndex: 0, // 他の要素より下に表示
            })
            .add();

          // 背景領域（x軸 2-10, y軸 30-80）の矩形を描画
          chart.renderer.rect(
            chart.xAxis[0].toPixels(3), // x軸の2の位置（ピクセル単位）
            chart.yAxis[0].toPixels(75), // y軸の80の位置（ピクセル単位）
            chart.xAxis[0].toPixels(6) - chart.xAxis[0].toPixels(3), // x軸の2から10の幅
            chart.yAxis[0].toPixels(20) - chart.yAxis[0].toPixels(75) // y軸の30から80の高さ
          )
            .attr({
              fill: 'rgba(255, 255, 0, 0.2)', // 薄い黄色の背景色
              zIndex: 0, // 他の要素より下に表示
            })
            .add();
        },
      },
    },
    title: {
      text: '背景色領域の例',
    },
    xAxis: {
      title: {
        text: 'X軸',
      },
      min: 0,
      max: 20,
    },
    yAxis: {
      title: {
        text: 'Y軸',
      },
      min: 0,
      max: 100,
    },
    series: [
      {
        name: 'データポイント',
        data: [
          [1, 45],
          [3, 60],
          [5, 70],
          [7, 80],
          [9, 50],
        ],
        type: 'scatter',
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />
    </div>
  );
};

export default HighChart;
