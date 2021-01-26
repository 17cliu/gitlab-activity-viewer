
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import merge from 'lodash.merge';

function BarChart({ options }) {
    const textStyles = {
        color: '#fff',
        fontFamily: 'sans-serif',
        fontWeight: 'normal'
    };
    const defaultOptions = {
        title: {
            style: textStyles,
        },
        chart: {
            type: 'column',
            backgroundColor: null,
            plotBackgroundColor: null,
            height: 300,
            style: textStyles
        },
        plotOptions: {
            column: {
                animation: false,
                borderWidth: 0,
                color: '#ff4800',
                cursor: 'pointer',
                // pointWidth: 20,
                dataLabels: {
                    enabled: true,
                    crop: false,
                    overflow: 'none',
                    style: textStyles
                }
            }
        },
        yAxis: {
            title: 'Number of events',
            gridLineWidth: 0,
            lineWidth: 0,
            labels: {
                style: textStyles
            }
        },
        xAxis: {
            type: 'category',
            labels: {
                style: textStyles,
                rotation: 270,
                autoRotation: false,
                allowOverlap: false,
                overflow: 'allow'
            }
        },
        credits: { enabled: false },
        legend: { enabled: false },
    };

    return (
        <div className="bar-chart">
            <HighchartsReact
                highcharts={Highcharts}
                options={merge(defaultOptions, options)}
            />
        </div>
    );
}

export default BarChart;
