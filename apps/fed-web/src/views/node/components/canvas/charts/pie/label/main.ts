import chooseCorner from "./corners";
import createLine from "./line";
import { showLabel } from "../../label";
import type { Point } from "../../../../../../../util/math/geometry";
import type { StyledSector } from "../pie";

import {
	absoluteFromContext,
	oppositeCorner
} from "../../../../../../../util/dom";

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

function tailPosition(
	canvas: HTMLCanvasElement,
	circle: Circle,
	sector: Sector
): Point {
	const sector_bisector = sectorBisector(sector);
	const pos = pointOnCircle(circle, sector_bisector);

	const absolute_pos = absoluteFromContext(pos, canvas);
	return absolute_pos;
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

	const corner = chooseCorner(area, tail_pos);
	const { x, y } = corner;

	const { x: opp_x, y: opp_y } = oppositeCorner({ x, y });
	label.style[opp_x] = "unset";
	label.style[opp_y] = "unset";

	label.style[x] = "20px";
	label.style[y] = "20px";

	createLine(canvas, label, corner, circle, sector);
}

export default styleLabel;
export type { Area };
