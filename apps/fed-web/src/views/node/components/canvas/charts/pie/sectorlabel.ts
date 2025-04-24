import { absolutePosition } from "../../../../../../util/dom";
import type { StyledSector } from "./pie";

import {
	pointOnCircle,
	sectorBisector,
	type Circle
} from "../../../../../../util/math/circle";

interface Area {
	allowed: HTMLElement;
	avoidTopLeft?: boolean;
	avoidTopRight?: boolean;
	avoidBotLeft?: boolean;
	avoidBotRight?: boolean;
}

function styleLabel(
	area: Area,
	label: HTMLElement,
	canvas: HTMLCanvasElement,
	circle: Circle,
	sector: StyledSector
) {
	label.innerText = sector.name;

	const sector_bisector = sectorBisector(sector);
	const { x, y } = pointOnCircle(circle, sector_bisector);

	const canvas_position = absolutePosition(canvas);
	const absolute_x = x + canvas_position.x;
	const absolute_y = y + canvas_position.y;

	label.style.left = absolute_x + "px";
	label.style.top = absolute_y + "px";
}

export default styleLabel;
