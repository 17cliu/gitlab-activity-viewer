
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import merge from 'lodash.merge';

function BarChart({ options }) {
    const textStyles = {
        color: '#fff',
        fontFamily: 'Raleway, sans-serif',
        fontWeight: 'normal'
    };
    const plotOptions = {
        animation: false,
        enableMouseTracking: false,
        borderWidth: 0,
        color: '#ff4800',
        cursor: 'pointer',
        // pointWidth: 20,
        pointPadding: 0,
        dataLabels: {
            enabled: true,
            crop: false,
            overflow: 'none',
            style: {
                ...textStyles,
                fontSize: '9pt',
                fontWeight: 700
            }
        }
    };
    const defaultOptions = {
        title: {
            style: {
                ...textStyles,
                fontWeight: '700',
            }
        },
        chart: {
            type: 'bar',
            backgroundColor: null,
            plotBackgroundColor: null,
            style: textStyles
        },
        plotOptions: {
            // Define both to provide default styling for either type.
            // Having an extraneous set of plot type options does not cause
            // problems with Highcharts.
            bar: plotOptions,
            column: plotOptions
        },
        yAxis: {
            title: 'Number of events',
            gridLineWidth: 1,
            gridLineColor: '#3d3d3d',
            labels: {
                style: textStyles
            }
        },
        xAxis: {
            type: 'category',
            lineWidth: 1,
            lineColor: '#3d3d3d',
            labels: {
                style: textStyles,
                // rotation: 270,
                autoRotation: false,
                allowOverlap: false,
                overflow: 'allow'
            }
        },
        credits: { enabled: false },
        legend: { enabled: false },
    };

    return (
        <div className="chart-block">
            <HighchartsReact
                highcharts={Highcharts}
                options={merge(defaultOptions, options)}
            />
        </div>
    );
}

export default BarChart;
