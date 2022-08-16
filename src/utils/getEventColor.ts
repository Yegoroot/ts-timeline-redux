import { EventTypes } from "./axios";

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
