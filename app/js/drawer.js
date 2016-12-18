"use strict";

class Drawer {
    constructor(context) {
        this.context = context;
        this.particle = null;
        this.chosenCircle = [];
        this.inShortestPath = [];
    }

    drawCircle(circle) {
        if (circle.isStartOrEnd) {
            //randomize number of moiving things and colour of it 

            this.chosenCircle[0] = this.chosenCircle[0] || {
                id: circle.getHashcode(),
                lastPosStart: 2 * Math.PI,
                lastPosEnd: 0
            };

            this.chosenCircle[1] = this.chosenCircle[1] || {
                id: circle.getHashcode(),
                lastPosStart: 0,
                lastPosEnd: 2 * Math.PI * 0.6
            };

            let speed = 0.07;

            this.chosenCircle[0].lastPosStart += speed;
            this.chosenCircle[0].lastPosEnd += speed;
            this.chosenCircle[1].lastPosStart += speed;
            this.chosenCircle[1].lastPosEnd += speed;

            this.context.beginPath();
            this.context.fillStyle = circle.connectedLocations.length !== 0 ? 'whitesmoke' : '#cfc';
            this.context.arc(circle.x, circle.y, circle.circleRadius * 1.16, this.chosenCircle[0].lastPosStart, this.chosenCircle[0].lastPosEnd, true);
            this.context.fill();

            this.context.beginPath();
            this.context.fillStyle = '#D0CA9C';
            this.context.arc(circle.x, circle.y, circle.circleRadius * 1.16, this.chosenCircle[1].lastPosStart, this.chosenCircle[1].lastPosEnd, false);
            this.context.fill();
        }

        this.context.fillStyle = circle.connectedLocations.length !== 0 ? "#cfc" : "whitesmoke";
        this.context.beginPath();
        this.context.arc(circle.x, circle.y, circle.circleRadius, 0, Math.PI * 2, true);
        this.context.fill();
    }


    drawFloatingCircles(circles) {
        // Check and fix memory leak
        let notAssignedFloatingCirclesGuids = Object.keys(this.inShortestPath).filter(guid => !circles.map(c => c.guid).includes(guid));
        let notAssignedCirclesGuids = circles.map(c => c.guid).filter(c => !Object.keys(this.inShortestPath).includes(c));

        circles.forEach(circle => {
            if (notAssignedCirclesGuids.includes(circle.guid)) {
                let movedFloatingCircleGuid = notAssignedFloatingCirclesGuids.shift();
                let value = movedFloatingCircleGuid ? Object.assign({}, this.inShortestPath[movedFloatingCircleGuid]) : null;
                this.inShortestPath[circle.guid] = this.inShortestPath[circle.guid] || value;
            }

            let particle = this.inShortestPath[circle.guid] = this.inShortestPath[circle.guid] || {
                size: 10,
                position: { x: circle.x, y: circle.y },
                offset: { x: 0, y: 0 },
                shift: { x: 0, y: 0 },
                speed: 0.04,
                random: Math.random() * 360,
                fillColor: '#whitesmoke',
                orbit: circle.circleRadius * 1.4
            };
            var lp = { x: particle.position.x, y: particle.position.y };

            // Rotation
            particle.offset.x += particle.speed;
            particle.offset.y += particle.speed;

            // Follow mouse with some lag
            particle.shift.x += (circle.x - particle.shift.x) * (particle.speed);
            particle.shift.y += (circle.y - particle.shift.y) * (particle.speed);

            // Apply position
            particle.position.x = particle.shift.x + Math.cos(particle.random + particle.offset.x) * (particle.orbit);
            particle.position.y = particle.shift.y + Math.sin(particle.random + particle.offset.y) * (particle.orbit);

            this.context.beginPath();
            this.context.fillStyle = particle.fillColor;
            this.context.strokeStyle = particle.fillColor;
            this.context.lineWidth = particle.size;

            this.context.moveTo(lp.x, lp.y);

            this.context.arc(particle.position.x, particle.position.y, particle.size / 2, 0, Math.PI * 2, true);
            this.context.fill();
        });
        notAssignedFloatingCirclesGuids.forEach(guid => {
            delete this.inShortestPath[guid];
        })
    }

    drawBorder(circle) {
        if (circle.isInShortestPath) {
            this.context.fillStyle = "whitesmoke";
            this.context.beginPath();
            this.context.arc(circle.x, circle.y, circle.circleRadius + 5, 0, Math.PI * 2, true);
            this.context.fill();
        }
    }

    drawLine(circle1, circle2, thickness, color) {
        this.context.beginPath();
        this.context.moveTo(circle1.x, circle1.y);
        this.context.lineTo(circle2.x, circle2.y);
        this.context.lineWidth = thickness;
        this.context.strokeStyle = color;
        this.context.stroke();
    }
}

module.exports = Drawer;