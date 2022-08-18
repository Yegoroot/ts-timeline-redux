import moment from "moment";

import { EventTypes, Event } from "../features/timeline/TimelineData";

export const getStyleEvent = (
  event: Event,
  timePerPx: number,
  timelineStart: string | Date
) => {
  // длина события
  const eventInterval = moment
    .duration(moment(event.dateEnd).diff(event.dateStart))
    .asMilliseconds();
  const eventWidth = Math.round(eventInterval / timePerPx);

  // интервал между началом ленты и началом события
  const time = moment
    .duration(moment(event.dateStart).diff(timelineStart))
    .asMilliseconds();
  const leftPx = Math.round(time / timePerPx);

  return {
    width: `${eventWidth}px`,
    background: getEventColor(event.type),
    left: `${leftPx}px`,
  };
};

export const getEventColor = (type?: EventTypes) => {
  switch (type) {
    case EventTypes.NORMAL:
      return "#4caf50";
    case EventTypes.CRITICAL:
      return "#e7d322";
    case EventTypes.DANGEROUS:
      return "#ee4949";
    default:
      return "white";
  }
};
