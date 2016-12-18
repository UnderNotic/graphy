"use strict"

class CircleConnector {
    constructor(circles) {
        this.circles = circles;
        this.chosenCircle = null;
    }

    setHandlers(canvasId) {

        var connector = this;

        var down = function (e) {
            if (e.which == 2 || e.which == 3) {
                let clickedCircle = connector.circles.find(circle => circle.isPointInsideCircle({ x: e.clientX, y: e.clientY }));

                if (clickedCircle) {
                    if (connector.chosenCircle) {
                        if (connector.chosenCircle != clickedCircle) {
                            connector.chosenCircle.toggleConnectedLocation(clickedCircle);
                        }
                        clickedCircle.isClicked = !clickedCircle.isClicked;
                        connector.chosenCircle = null;
                    }
                    else {
                        clickedCircle.isClicked = !clickedCircle.isClicked;
                        connector.chosenCircle = clickedCircle;
                    }
                }

            }
        }


        $("#" + canvasId).mousedown(function (e) { down(e) });
    }
}

module.exports = CircleConnector;