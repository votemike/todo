import React from 'react';
import CanvasJSReact from './../canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Graph({ todos, settings }) {

    const decimalToHex = (decimal) => {
        let hex = Number(decimal).toString(16);

        while (hex.length < 2) {
            hex = "0" + hex;
        }

        return hex;
    };

    const truncateText = (text, length) => {
        return text.length > length ? `${text.substring(0, length)}...` : text;
    };

    const dataPoints = todos.map((todo) => {
        const red = 127 + Math.ceil(12.75 * (todo.effort - todo.impact));
        const green = 255 - red;
        const colour = '#' + decimalToHex(red) + decimalToHex(green) + '00';

        let point = {
            x: parseInt(todo.effort),
            y: parseInt(todo.impact),
            text: truncateText(todo.text, 30),
            color: colour
        };

        if (settings.showLabels) {
            point.indexLabel = truncateText(todo.text, 20);
        }

        return point;
    });

    let options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: `${settings.impact}/${settings.effort}`,
            fontFamily: "Helvetica",
            titleFontColor: "#4d4d4d"
        },
        subtitles:[
            {
                text: "Work from top left to bottom right",
                fontFamily: "Helvetica",
                fontColor: "#4d4d4d"
            }
        ],
        axisX: {
            title: settings.effort,
            includeZero: true,
            minimum: 0,
            maximum: 10.5,
            gridThickness: 0,
            titleFontFamily: "Helvetica",
            titleFontColor: "#4d4d4d"
        },
        axisY: {
            title: settings.impact,
            includeZero: true,
            minimum: 0,
            maximum: 10.5,
            gridThickness: 0,
            titleFontFamily: "Helvetica",
            titleFontColor: "#4d4d4d"
        },
        data: [{
            type: "scatter",
            dataPoints: dataPoints
        }]
    };

    if (settings.showLabels) {
        options.toolTip = {
            enabled: false
        };
    } else {
        options.toolTip = {
            enabled: true,
            content: "{text} {y}-{x}",
            backgroundColor: "#f5f5f5",
            fontFamily: "Helvetica",
            fontColor: "#4d4d4d",
            cornerRadius: 4
        };
    }

    return (<CanvasJSChart options = {options}/>);
}

export default Graph