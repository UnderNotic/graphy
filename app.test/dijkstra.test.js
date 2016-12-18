var assert = require('assert');

import dijkstra from '../app/js/dijkstra/dijkstra';
import { Location } from '../app/js//location';

describe('dijkstra', () => {
    it('should return correct values - simple', () => {
        var loc1 = new Location(1, 1);
        var loc2 = new Location(10, 1);
        var loc3 = new Location(5, 1);

        loc1.addConnectedLocation(loc2);
        loc2.addConnectedLocation(loc3);

        loc1.isStartOrEnd = true;
        loc3.isStartOrEnd = true;

        let res = dijkstra([loc1, loc2, loc3]);

        assert.equal(res.length, 3);
        assert.equal(res.indexOf(loc1) + res.indexOf(loc2) + res.indexOf(loc3), 3);
    });

    it('should return correct values - one is not connected', () => {
        var loc1 = new Location(1, 1);
        var loc2 = new Location(125, 999);
        var loc3 = new Location(98, 98);
        var loc4 = new Location(99, 99);

        loc1.addConnectedLocation(loc2);
        loc2.addConnectedLocation(loc4);
        loc1.addConnectedLocation(loc4);

        loc1.isStartOrEnd = true;
        loc4.isStartOrEnd = true;

        let res = dijkstra([loc1, loc2, loc3, loc4]);

        assert.equal(res.length, 2);
        assert.equal(res.indexOf(loc1) + res.indexOf(loc4), 1);
    });

    it('should return correct values - bypassing', () => {
        var loc1 = new Location(1, 1);
        var loc2 = new Location(100, 100);
        var loc3 = new Location(5, 4);
        var loc4 = new Location(5, 1);
        var loc5 = new Location(14, 11);

        loc1.addConnectedLocation(loc2);
        loc1.addConnectedLocation(loc3);
        loc1.addConnectedLocation(loc4);
        loc2.addConnectedLocation(loc5);
        loc3.addConnectedLocation(loc5);
        loc4.addConnectedLocation(loc5);

        loc1.isStartOrEnd = true;
        loc5.isStartOrEnd = true;

        let res = dijkstra([loc1, loc2, loc3, loc4, loc5]);

        assert.equal(res.length, 3);
        assert.equal(res.indexOf(loc1) + res.indexOf(loc3) + res.indexOf(loc5), 3);
    });

    it('should have correct path (connectedShortestPathLocations)', () => {
        var loc1 = new Location(2, 2);
        var loc2 = new Location(3, 3);
        var loc3 = new Location(1, 99);
        var loc4 = new Location(4, 4);

        loc1.addConnectedLocation(loc2);
        loc1.addConnectedLocation(loc3);
        loc2.addConnectedLocation(loc4);
        loc3.addConnectedLocation(loc4);

        loc1.isStartOrEnd = true;
        loc4.isStartOrEnd = true;

        let res = dijkstra([loc1, loc2, loc3, loc4]);

        assert.equal(res.length, 3);
        assert.equal(loc1.connectedShortestPathLocation, loc2);
        assert.equal(loc2.connectedShortestPathLocation, loc4);
    });
});

describe('Euclidic distance', () => {
    it('should retturn correct values', () => {
        var loc1 = new Location(1, 2);
        var loc2 = new Location(3, 2);

        var res = loc1.computeEuclidicDistance(loc2);

        assert.equal(res, 2);
    });
});