"use strict";

import Location from './location';

let createRandomLocations = (width, height, circlesCount) => {
    // randomly draw 5 circles
    var locations = [];
    var offset = 80;
    for (var i = 0; i < circlesCount; i++) {
        var x = Math.random() * (width - offset * 2) + offset;
        var y = Math.random() * (height - 250) + 150;
        locations.push(new Location(x, y));
    }
    return locations;
};

let createRandomLocationsWithConnections = (width, height, circlesCount) => {
    let circles = createRandomLocations(width, height, circlesCount);
    circles.forEach((circle, index) => {
        let conLocsNumber = Math.round(Math.random() * 4);
        for (let i = 0; i < conLocsNumber; i++) {
            let randomIndex = Math.round(Math.random() * (circles.length - 1))
            if (randomIndex === index) break;
            circle.connectedLocations = [];
            circle.addConnectedLocation(circles[randomIndex]);
        }
    });

    circles[0].isStartOrEnd = true;
    circles[circles.length - 1].isStartOrEnd = true;
    return circles;
}

module.exports = {
    createRandomLocations,
    createRandomLocationsWithConnections
};