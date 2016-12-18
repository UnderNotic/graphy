"use strict";

var Drawer = require("./drawer");
var dataUtils = require("./data");
var Dragger = require("./circle_dragger");
var Connector = require("./circle_connector");
var Marker = require("./circle_marker");
import Dijkstra from "./dijkstra/dijkstra";
var Throttler = require("./dijkstra/throttler");
import fps from "./fpsCounter";

var CANVAS_ID = "canvas";

window.onload = function () {
    canvasApp();
};
function isCanvasSupported() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}

function canvasApp() {
    window.addEventListener("resize", onResize, false);
    if (!isCanvasSupported()) {
        return;
    }
    $("#canvasSupport").hide();

    $("canvas").on("contextmenu", function () {
        return false;
    });

    var canvas = document.getElementById(CANVAS_ID);
    var ctx = canvas.getContext("2d");

    var playground = {
        width: canvas.width = window.innerWidth,
        height: canvas.height = window.innerHeight,
        centerX: window.innerWidth * .5,
        centerY: (window.innerHeight) * .5
    };

    var drawer = new Drawer(ctx);

    var circles = dataUtils.createRandomLocations(playground.width, playground.height, 5);

    var dragger = new Dragger(circles);
    dragger.setHandlers(CANVAS_ID);
    var connector = new Connector(circles);
    connector.setHandlers(CANVAS_ID);
    var marker = new Marker(circles);
    marker.setHandlers(CANVAS_ID);

    setDomHandlers();
    render();
    computeShortestPath();


    function render() {
        ctx.clearRect(0, 0, playground.width, playground.height);

        //rendering object should be prepared and actual rendering should be done later based o z-index priorities(shortest path aboce other cricles)
        drawBorderOnShortestPathCircles();
        drawLines();
        drawCircles();
        //TODO
        drawer.drawFloatingCircles(circles.filter(circle => !circle.isStartOrEnd && circle.isInShortestPath));

        ctx.fillStyle = "white";
        ctx.fillText("FPS: " + fps(), 0, 10);
        ctx.fillText("Nodes: " + circles.length, 0, 20);
        ctx.fillText("Edges: " + circles.reduce((prev, curr) => prev + curr.connectedLocations.length, 0) / 2, 0, 30)

        requestAnimationFrame(render);
    }

    function setDomHandlers() {
        $("#right-btn").click(_ => dataUtils.createRandomLocations(playground.width, playground.height, 100).forEach(c => circles.push(c)));
        $("#left-btn").click(_ => circles.splice(circles.length - 1, 1));
        $("#ctr-btn").click(_ => {
            //Number of circles should not be hardcode and add scale => more circles smaller circles lines etc.
            circles.splice(0, circles.length);
            dataUtils.createRandomLocationsWithConnections(playground.width, playground.height, 1000).forEach(c => circles.push(c));
        });
    }

    function drawCircles() {
        circles.forEach(location => drawer.drawCircle(location, 40));
    }

    function drawBorderOnShortestPathCircles() {
        circles.forEach(location => drawer.drawBorder(location));
    }

    function drawLines() {
        circles.filter(circle => circle.connectedShortestPathLocation !== null).forEach(circle => {
            drawer.drawLine(circle, circle.connectedShortestPathLocation, 10, "whitesmoke");
        });

        circles.forEach(circle =>
            circle.connectedLocations.forEach(conCircle => {
                drawer.drawLine(circle, conCircle, 6, "#cfc");
            }));
    }


    function computeShortestPath() {
        //this hashcode should also consider paths
        return Throttler.throttleFunc(Dijkstra, circles, (circles) => {
            return circles.reduce((res, curr) => res + curr.getHashcode(), "");
        });
    }

    function onResize() {
        playground.width = canvas.width = window.innerWidth;
        playground.height = canvas.height = window.innerHeight;

        playground.centerX = playground.width * .5;
        playground.centerY = playground.height * .5;
    }
}