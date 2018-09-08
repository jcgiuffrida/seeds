import Highcharts from 'highcharts';

module.exports = (_ => {

  function makeChart($el, data, period){
    return new Highcharts.Chart({
      chart: {
        renderTo: $el[0],
        type: 'area',
        height: 400,
      },
      title: {
        text: `Conversations by ${period}`,
      },
      xAxis: {
        categories: data.dates,
        tickmarkPlacement: 'on',
        title: {
          enabled: false
        },
      },
      yAxis: {
        title: {
          text: 'Conversations'
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      plotOptions: {
        area: {
          stacking: 'normal',
        },
      },
      tooltip: {
        split: true,
      },
      series: [{
        name: 'Conversations',
        data: data.conversations,
      }, {
        name: 'Seeds',
        data: data.seeds,
      }],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    })
  }

  return {
    makeChart,
  }

})()
