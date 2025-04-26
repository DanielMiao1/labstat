import { absolutePosition } from "../../../../../../../util/dom";
import chooseCorner from "./corners";
import createLine from "./line";
import { showLabel } from "../../label";
import type { Point } from "../../../../../../../util/math/geometry";
import type { StyledSector } from "../pie";

import {
	pointOnCircle,
	sectorBisector,
	type Circle,
	type Sector
} from "../../../../../../../util/math/circle";

interface Area {
	/**
	 * The area in which to auto-place the chart label.
	 * 
	 * Area.avoid is an array of integers that represent disallowed corners of
	 * the container element:
	 *   0 = top-left
	 *   1 = top-right
	 *   2 = bottom-left
	 *   3 = bottom-right
	 */

	avoid?: number[];
	container: HTMLElement;
}

const EDGES = new Set(["top", "bottom", "left", "right"]);

function tailPosition(
	canvas: HTMLCanvasElement,
	circle: Circle,
	sector: Sector
): Point {
	const sector_bisector = sectorBisector(sector);
	const { x, y } = pointOnCircle(circle, sector_bisector);

	const canvas_position = absolutePosition(canvas);
	const absolute_x = x + canvas_position.x;
	const absolute_y = y + canvas_position.y;

	return {
		x: absolute_x,
		y: absolute_y
	};
}

function styleLabel(
	area: Area,
	canvas: HTMLCanvasElement,
	circle: Circle,
	sector: StyledSector
) {
	/**
	 * Update the label style and select a position according to restrictions in
	 * area object.
	 * 
	 * The label will be placed in one of the corners of the
	 * area.allowed DOM element, whichever is closest to the selected sector and
	 * is not disallowed by area.avoid.
	 */

	const label = showLabel(area.container);
	label.style.setProperty("--sector-color", sector.color);

	const text_element = label.getElementsByTagName("p")[0];
	text_element.innerText = sector.name;

	const tail_pos = tailPosition(canvas, circle, sector);
	const { x, y } = chooseCorner(area, tail_pos);

	EDGES.forEach(className => {
		if (![x, y].includes(className)) label.style[className] = "unset";
	});

	label.style[x] = "20px";
	label.style[y] = "20px";

	createLine(label);
}

export default styleLabel;
export type { Area };
