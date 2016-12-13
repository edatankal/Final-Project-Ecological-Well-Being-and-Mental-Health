$(function () {
    Highcharts.chart('container', {
        title: {
            text: 'Ecological Well Being and Mental Health',
            x: -20 //center
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
                text: 'Hectars/Individuals'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'm'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Istanbul Tree Loss',
            data: [3042,	1950,	4190,	8797,	8963]
        }, {
            name: 'Istanbul Mental Problems Numbers',
            data: [26236,	39812,	101704,	124426,	149834]
        }, {
            name: 'Sinop Tree Loss',
            data: [5393,	4092,	2370,	3050,	5248]
        }, {
            name: 'Sinop Mental Problems Numbers',
            data: [20788, 19005,	21736,	26535,	29907]
        }]
    });
});
