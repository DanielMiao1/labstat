import { normalizeAngle, pointDifference, type Point } from "./geometry";

interface Circle {
	origin: Point;
	radius: number;
}

interface Sector {
	start: number;
	end: number;
}

function pointInSector(point: Point, circle: Circle, sector: Sector) {
	/**
	 * Check if a point is within a sector. Expects radians for sector start/end
	 * measurements.
	 * 
	 * The point is within the sector if the point's polar angle is within the
	 * bounding angles of the sector, and if the point's polar radius is less than
	 * the circle's radius.
	 */

	const relative = pointDifference(point, circle.origin);
	const point_angle = normalizeAngle(Math.atan2(relative.y, relative.x));
	
	// Check whether the sector crosses the zero-degree angle
	if (sector.start > sector.end) {
		if (point_angle > sector.end && point_angle < sector.start) {
			return false;
		}
	} else if (point_angle < sector.start || point_angle > sector.end) {
		return false;
	}

	const point_radius = Math.sqrt(relative.x ** 2 + relative.y ** 2);

	return point_radius < circle.radius;
}

export { pointInSector, type Sector };
