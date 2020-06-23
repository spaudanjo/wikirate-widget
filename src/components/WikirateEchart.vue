<style scoped>
#chart {
  width:100%; 
  height:100%;
  /* min-width: 400px; */
}
</style>

<template>
    <div id="chart" ref="chart"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import * as echarts from 'echarts';

@Component
export default class WikirateEchart extends Vue {

  @Prop({default: []}) 
  chartData!: any[]; 
  @Prop({default: true}) 
  showMetricTitlesForSubcharts!: boolean;

  drawChart(chartOption: any) {
    const chartContainer = this.$refs["chart"];
    const myChart = echarts.init(chartContainer as HTMLDivElement);
    myChart.setOption(chartOption);
  }

  generateEchartsOptions = (chartData: any, showMetricTitlesForSubcharts: boolean) => {
    
    const echartOptions = {
      legend: {
          data: chartData.mainData.legendData
      },

      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },

      xAxis: {
          type: 'value'
      },

      yAxis: {
          type: 'category',
          data: chartData.mainData.chartSeriesLabels,
          // TODO: put (DUMMY) Switzerland as a reference at the end to the dataset and mark it in redd
          // axisLabel: {
          //   textStyle: {
          //     // fontWeight: 'bold',
          //     color: function (value: string, index: number) {
          //       // return value === 'DUMMY Switzerland' ? 'red' : 'black';
          //       return value === 'Nippon Steel & Sumitomo Metal' ? 'green' : 'black';
          //     }
          //   }
          // }
      },

      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
      },

      series: chartData.mainData.chartSeriesData
    }

    const chartTitle = showMetricTitlesForSubcharts && `Top ${chartData.metaData.numberOfTopAnswersToShow} companies: \n ${chartData.metaData.metricName}`;

    return this.showMetricTitlesForSubcharts ? Object.assign(
      {
        title: {
          text: chartTitle,
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        }
      }, echartOptions) : echartOptions;

    }

  mounted() {
      const echartOptions = this.generateEchartsOptions(this.chartData, this.showMetricTitlesForSubcharts);
      this.drawChart(echartOptions);
  }
  
}
</script>
