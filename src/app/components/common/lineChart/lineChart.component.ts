import 'style-loader!./lineChart.scss';

import {Component, Input, OnInit} from '@angular/core';
import * as ChartistLegend from 'chartist-plugin-legend';
import filesize from 'filesize';

import {LineChartService, HandleDataFunc, LineChartData} from './lineChart.service';




@Component({selector: 'line-chart', templateUrl: './lineChart.html'})
export class LineChartComponent implements OnInit, HandleDataFunc {

  @Input() dataList: any[];
  @Input() series: any;
  @Input() legends: any[];
  @Input() type: string;
  @Input() divideBy: number;

  data: LineChartData = {
    labels: [],
    series: [],
  };

  controlIsInitialized = false;

  options: any = {
    showPoint: false,
    showArea: true,
    fullWidth: true,
    fillHoles: true,
    showLine: true,
    axisX: {
      labelInterpolationFnc: function(value, index) {
        const pad =
          (num, size) => {
            let s = num + "";
            while (s.length < size) {
              s = "0" + s;
            }
            return s;
          };
        const date = pad(value.getHours(), 2) + ':' + pad(value.getMinutes(), 2) +
          ':' + pad(value.getSeconds(), 2);
        return index % 40 === 0 ? date : null;
      },
    },
    axisY: {},
    plugins: []
  };
  responsiveOptions = {};

  constructor(private _lineChartService: LineChartService) {}

  handleDataFunc(linechartData: LineChartData) {

    this.data.labels.splice(0, this.data.labels.length);
    this.data.series.splice(0, this.data.series.length);

    linechartData.labels.forEach((label) => {this.data.labels.push(label)});
    linechartData.series.forEach((dataSeriesArray) => {

      if (typeof (this.divideBy) !== 'undefined') {
        const newArray = new Array();
        dataSeriesArray.forEach((numberVal) => {

          if (numberVal > 0) {
            newArray.push(numberVal / this.divideBy);
          } else {
            newArray.push(numberVal);
          }
        });

        dataSeriesArray = newArray;
      }
      this.data.series.push(dataSeriesArray)
    });


    if (this.series) {
      this.series.forEach((i) => {this.data.series.push(i);});
    }

    this.controlIsInitialized = true;

  }



  ngOnInit() {

    if (this.type === 'Pie') {
      delete this.options.axisX;
      delete this.options.axisY;
      this.options.labelInterpolationFnc = function(value, index) {
        // FIXME, workaround to work with just size pie
        return filesize(value, {standard: "iec"});
      }

      if (this.series) {
        this.series.forEach((i) => {this.data.series.push(i);});
      }

      this.controlIsInitialized = true;

    } else if (this.legends && this.type !== 'Pie') {
      this.options.plugins.push(ChartistLegend({
        classNames: Array(this.legends.length)
          .fill(0)
          .map((x, i) => {
            return 'ct-series-' +
              String.fromCharCode(97 + i)
          }),
        legendNames: this.legends,
      }));

      if (this.dataList.length > 0) {
        this._lineChartService.getData(this, this.dataList);
      }
    }


  }

}
