function renderPieChart(chartData) {
    const myChart = echarts.init(document.getElementById('pie-chart'));

    option = {
        backgroundColor: '#2c343c',

        title: {
            text: `Emissions of '${chartData.companyName}'`,
            left: 'center',
            top: 20,
            textStyle: {
                color: '#ccc'
            }
        },

        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        series: [
            {
                name: 'Scope 1 and 2 Emissions',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: chartData.chartSeriesData,
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };

    // use configuration item and data specified to show chart
    myChart.setOption(option);
}

function rebuildChartForCompany(normalizedCompanyName) {
    const scope1DeferredData = fetch(`https://wikirate.org/CDP+Scope_1_Emissions+${normalizedCompanyName}+2019.json`)
        .then(data => { return data.json() });

    const scope2DeferredData = fetch(`https://wikirate.org/CDP+Scope_2_Emissions+${normalizedCompanyName}+2019.json`)
        .then(data => { return data.json() });

    Promise
        .all([scope1DeferredData, scope2DeferredData])
        .then(emissionData => {

            console.log(emissionData); 
            const humanizedCompanyName = emissionData[0].company;

            const emissionValuesPerScope = emissionData.map(data => ({
                value: data.value,
                name: data.metric
            }));

            const chartData = {
                companyName: humanizedCompanyName,
                chartSeriesData: emissionValuesPerScope
            };

            renderPieChart(chartData);
        });
}

function processForm(e) {
    if (e.preventDefault) e.preventDefault();
    const companyName = document.getElementById("company-name").value;
    rebuildChartForCompany(companyName);
};

const companySearchForm = document.getElementById('company-search');

if (companySearchForm.attachEvent) {
    companySearchForm.attachEvent("submit", processForm);
} else {
    companySearchForm.addEventListener("submit", processForm);
} 