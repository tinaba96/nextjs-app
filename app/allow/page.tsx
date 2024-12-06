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

              // 2点間の座標（ピクセル）
              const startX = chart.xAxis[0].toPixels(point.x);
              const startY = chart.yAxis[0].toPixels(point.y);
              const endX = chart.xAxis[0].toPixels(nextPoint.x);
              const endY = chart.yAxis[0].toPixels(nextPoint.y);

              // 2点間の距離を計算
              const dx = endX - startX;
              const dy = endY - startY;
              const distance = Math.sqrt(dx * dx + dy * dy); // 距離

              // 印の長さを距離の80%に設定
              const arrowLength = distance * 0.8; // 距離の80%

              // 始点と終点の間で1割ずつの空白部分を確保
              const padding = distance * 0.1; // 10%ずつのスペース

              // 始点と終点の座標を調整
              const normalizedDX = dx / distance;
              const normalizedDY = dy / distance;

              // 始点を10%移動
              const adjustedStartX = startX + normalizedDX * padding;
              const adjustedStartY = startY + normalizedDY * padding;

              // 終点を10%移動
              const adjustedEndX = endX - normalizedDX * padding;
              const adjustedEndY = endY - normalizedDY * padding;

              // 印の長さを80%に設定した新しい座標
              const arrowEndX = adjustedStartX + normalizedDX * arrowLength;
              const arrowEndY = adjustedStartY + normalizedDY * arrowLength;

              // 矢印を描画（線）
              chart.renderer
                .path([
                  'M', adjustedStartX, adjustedStartY, // 始点
                  'L', arrowEndX, arrowEndY, // 新しい終点
                ])
                .attr({
                  stroke: 'black',
                  'stroke-width': 2,
                })
                .add();

              // 矢印の先端（三角形）を描画
              const arrowSize = 5; // 矢印のサイズ
              const arrowAngle = Math.PI / 6; // 矢印の角度（30度）

              const arrowHeadX1 = arrowEndX - arrowSize * Math.cos(Math.atan2(arrowEndY - adjustedStartY, arrowEndX - adjustedStartX) - arrowAngle);
              const arrowHeadY1 = arrowEndY - arrowSize * Math.sin(Math.atan2(arrowEndY - adjustedStartY, arrowEndX - adjustedStartX) - arrowAngle);
              const arrowHeadX2 = arrowEndX - arrowSize * Math.cos(Math.atan2(arrowEndY - adjustedStartY, arrowEndX - adjustedStartX) + arrowAngle);
              const arrowHeadY2 = arrowEndY - arrowSize * Math.sin(Math.atan2(arrowEndY - adjustedStartY, arrowEndX - adjustedStartX) + arrowAngle);

              chart.renderer
                .path([
                  'M', arrowEndX, arrowEndY, // 矢印の中心
                  'L', arrowHeadX1, arrowHeadY1, // 左側の矢印先端
                  'M', arrowEndX, arrowEndY, // 矢印の中心
                  'L', arrowHeadX2, arrowHeadY2, // 右側の矢印先端
                ])
                .attr({
                  stroke: 'black',
                  'stroke-width': 2,
                  'stroke-linecap': 'round',
                })
                .add();
            }
          });
        },
      },
    },
    title: {
      text: 'データポイント間に矢印を描画（長さ80%、始点と終点1割のスペース）',
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
