// components/HighChart.tsx
'use client'; // クライアントサイドコンポーネントとして指定

import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const HighChart: React.FC = () => {
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  // 高chartsのオプション設定
  const options: Highcharts.Options = {
    chart: {
      type: 'scatter',
      events: {
        load() {
          const chart = this;
          const series = chart.series[0];

          // データポイント間に矢印を描画
          series.data.forEach((point, index) => {
            if (index < series.data.length - 1) {
              // 次のデータポイントを取得
              const nextPoint = series.data[index + 1];
              
              // 矢印の始点と終点
              // const startX = chart.xAxis[0].toPixels(point.x);
              // const startY = chart.yAxis[0].toPixels(point.y);
              // const endX = chart.xAxis[0].toPixels(nextPoint.x);
              // const endY = chart.yAxis[0].toPixels(nextPoint.y);
              const distanceX = Math.abs(chart.xAxis[0].toPixels(nextPoint.x) - chart.xAxis[0].toPixels(point.x));
              const distanceY = Math.abs(chart.yAxis[0].toPixels(nextPoint.y) - chart.yAxis[0].toPixels(point.y));
              const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
              const offset = distance * 0.8; // 矢印の長さを２点間距離の８割に設定
              const angle = Math.atan2(distanceY, distanceX); // 始点と終点の角度
              const startX = chart.xAxis[0].toPixels(point.x) + Math.cos(angle) * offset;
              const startY = chart.yAxis[0].toPixels(point.y) + Math.sin(angle) * offset;
              const endX = chart.xAxis[0].toPixels(nextPoint.x) - Math.cos(angle) * offset;
              const endY = chart.yAxis[0].toPixels(nextPoint.y) - Math.sin(angle) * offset;

              // 矢印を描画（線 + 三角形）
              chart.renderer
                .path([
                  'M', startX, startY, // 始点
                  'L', endX, endY,     // 終点
                ])
                .attr({
                  'stroke-width': 1,
                  stroke: '#7C7C7C',
                })
                .add();

              // 矢印の先端（三角形）
              const arrowSize = 5; // 矢印のサイズ
              // const angle = Math.atan2(endY - startY, endX - startX); // 始点と終点の角度

              // 矢印の先端（三角形）の座標を計算
              // 矢印の先端は、矢印の終点から矢印の方向に矢印のサイズ分だけ進んだ点
              // 矢印の方向は、矢印の終点と始点の角度
              // 矢印の先端の座標は、矢印の終点の座標から矢印の方向に矢印のサイズ分だけ進んだ点
              const arrowHeadX1 = endX - arrowSize * Math.cos(angle - Math.PI / 6);
              const arrowHeadY1 = endY - arrowSize * Math.sin(angle - Math.PI / 6);
              const arrowHeadX2 = endX - arrowSize * Math.cos(angle + Math.PI / 6);
              const arrowHeadY2 = endY - arrowSize * Math.sin(angle + Math.PI / 6);

              chart.renderer
                .path([
                  'M', endX, endY, // 矢印の中心点
                  'L', arrowHeadX1, arrowHeadY1, // 左の矢印先端
                  'M', endX, endY, // 矢印の中心点
                  'L', arrowHeadX2, arrowHeadY2, // 右の矢印先端
                ])
                .attr({
                  'stroke-width': 1,
                  stroke: '#7C7C7C',
                  'stroke-linecap': 'round', // 矢印の線の端点を丸くする
                })
                .add();
            }
          });
        },
      },
    },
    title: {
      text: 'データポイント間に矢印を描画',
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
