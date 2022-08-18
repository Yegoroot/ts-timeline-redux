interface IntervalDates {
  dateStart: string;
  dateEnd: string;
}

export interface Event {
  dateStart: string;
  dateEnd: string;
  type?: EventTypes;
}

export enum EventTypes {
  NORMAL, // зеленый
  DANGEROUS, // желтый
  CRITICAL, // ĸрасный
}

export type Data = { events: Event[]; intervalDates: IntervalDates };

export const data: Data = {
  intervalDates: {
    dateStart: "2022-01-01T00:00:00",
    dateEnd: "2022-01-02T00:00:00",
  },
  events: [
    {
      dateStart: "2022-01-01T01:00:00",
      dateEnd: "2022-01-01T02:00:00",
      type: EventTypes.DANGEROUS,
    },
    {
      dateStart: "2022-01-01T08:15:00",
      dateEnd: "2022-01-01T18:44:11",
      type: EventTypes.NORMAL,
    },
    {
      dateStart: "2022-01-01T19:21:00",
      dateEnd: "2022-01-01T20:44:11",
      type: EventTypes.CRITICAL,
    },
    {
      dateStart: "2022-01-01T22:11:00",
      dateEnd: "2022-01-01T23:50:00",
    },
    {
      dateStart: "2022-01-01T22:22:00",
      dateEnd: "2022-01-01T23:58:00",
      type: EventTypes.DANGEROUS,
    },
  ],
};
