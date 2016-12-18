"use strict";

export class Location {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.connectedLocations = [];
        this.isInShortestPath = false;
        this.connectedShortestPathLocation = null;
        this.isStartOrEnd = false;
        this.guid = Math.random(); // this is needed for drawFloatingCircles
    }

    toString() {
        return `x: ${this.x} y: ${this.y}`;
    }

    addConnectedLocation(location) {
        this.connectedLocations.push(location);
        location.connectedLocations.push(this);
    }

    removeConntectedLocation(location) {
        let index = this.connectedLocations.indexOf(location);
        this.connectedLocations.splice(index, 1);

        let index2 = location.connectedLocations.indexOf(this);
        location.connectedLocations.splice(index2, 1);
    }

    toggleConnectedLocation(location) {
        if (this.connectedLocations.indexOf(location) === -1) {
            this.addConnectedLocation(location);
        } else {
            this.removeConntectedLocation(location);
        }
    }

    computeEuclidicDistance(other) {
        return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
    }

    equals(location) {
        if (this.x === location.x && this.y === location.y) {
            return true;
        }
        return false;
    }

    getHashcode() {
        return this.x.toString() + this.y.toString() + this.isStartOrEnd + this.connectedLocations.length;
    }
}

export default class Circle extends Location {
    constructor(x, y) {
        super(x, y)
        this.circleRadius = 40;
        this.isClicked = false;
    }

    isPointInsideCircle(point) {
        var distance = Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2))
        if (distance < this.circleRadius) return this;
    }
}
