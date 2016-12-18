"use strict"

class CircleMarker {
    constructor(circles) {
        this.circles = circles;
        this.marked = [];
    }

    setHandlers(canvasId) {
        var marker = this;

        var dblClick =
        
            function handleDoubleClick(e) {
                let clickedCircle = marker.circles.find(circle => circle.isPointInsideCircle({ x: e.clientX, y: e.clientY }));
1
                if (clickedCircle) {
                    clickedCircle.isStartOrEnd = !clickedCircle.isStartOrEnd;
                    if (clickedCircle.isStartOrEnd) {
                        if (marker.marked.length >= 2) {
                            var removed = marker.marked.shift();
                            removed.isStartOrEnd = false;
                        }
                        marker.marked.push(clickedCircle);
                    }
                }
            }
        $("#" + canvasId).dblclick(function (e) { dblClick(e); });
    }
}

module.exports = CircleMarker;