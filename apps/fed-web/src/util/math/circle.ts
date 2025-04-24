import { normalizeAngle, pointDifference, type Point } from "./geometry";

interface Circle {
	origin: Point;
	radius: number;
}

interface Sector {
	start: number;
	end: number;
}

function sectorCrossesZero(sector: Sector): boolean {
	return sector.start > sector.end;
}

function sectorCentralAngle(sector: Sector): number {
	/**
	 * Calculates the central angle measure, in radians, of a sector.
	 */

	if (sectorCrossesZero(sector)) {
		const first = 2 * Math.PI - sector.start;
		const end = sector.end;

		return first + end;
	}

	return sector.end - sector.start;
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
	if (sectorCrossesZero(sector)) {
		if (point_angle > sector.end && point_angle < sector.start) {
			return false;
		}
	} else if (point_angle < sector.start || point_angle > sector.end) {
		return false;
	}

	const point_radius = Math.sqrt(relative.x ** 2 + relative.y ** 2);

	return point_radius < circle.radius;
}

function sectorBisector(sector: Sector): number {
	/**
	 * Returns the bisecting angle, in radians, of a provided sector.
	 */

	const central_angle = sectorCentralAngle(sector);
	const bisecting_central = central_angle / 2;
	const bisector = sector.start + bisecting_central;

	return normalizeAngle(bisector);
}

function pointOnCircle(circle: Circle, angle: number): Point {
	/**
	 * Finds the coordinates of a point on the edges of a circle at the specified
	 * central angle.
	 */

	const x = circle.radius * Math.cos(angle) + circle.origin.x;
	const y = circle.radius * Math.sin(angle) + circle.origin.y;

	return { x, y };
}

export { pointInSector, pointOnCircle, sectorBisector };
export type { Circle, Sector };
