$(function () {
    Highcharts.chart('container', {
        title: {
            text: 'Ecological Well Being and Mental Health',
            x: -20 
        },
        subtitle: {
            text: 'Source: globalforestwatch.org , Health Ministry of Turkey',
            x: -20
        },
        xAxis: {
            categories: ['2009', '2010', '2011', '2012', '2013']
        },
        yAxis: {
            title: {
                text: 'Hectares'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Patients That Have Visited the Doctors Office with the Mental Problems',
            data: [30213,45456,69849,79064,91631]
        }, {
            name: 'Tree Cover Loss',
            data: [185,113,158077,190394,158318
        },  
        }]
    });
});
