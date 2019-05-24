import React from 'react';
import CanvasJSReact from './../canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Graph({ todos, variableNames }) {

    const decimalToHex = (decimal) => {
        let hex = Number(decimal).toString(16);

        while (hex.length < 2) {
            hex = "0" + hex;
        }

        return hex;
    };

    const dataPoints = todos.map((todo) => {
        const red = 127 + Math.ceil(12.75 * (todo.effort - todo.impact));
        const green = 255 - red;
        const colour = '#' + decimalToHex(red) + decimalToHex(green) + '00';

        return {
            x: parseInt(todo.effort),
            y: parseInt(todo.impact),
            text: todo.text.length > 30 ? `${todo.text.substring(0, 30)}...` : todo.text,
            color: colour
        };
    });

    const options = {
        animationEnabled: true,
        title: {
            text: `${variableNames.impact}/${variableNames.effort}`,
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
        toolTip: {
            content: "{text} {y}-{x}",
            backgroundColor: "#f5f5f5",
            fontFamily: "Helvetica",
            fontColor: "#4d4d4d",
            cornerRadius: 4
        },
        axisX: {
            title: variableNames.effort,
            includeZero: true,
            minimum: 0,
            maximum: 10.5,
            gridThickness: 0,
            titleFontFamily: "Helvetica",
            titleFontColor: "#4d4d4d"
        },
        axisY: {
            title: variableNames.impact,
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

    return (<CanvasJSChart options = {options}/>);
}

export default Graph
