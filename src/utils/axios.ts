import axios from "axios";

type Err = {
  message: string;
  response: any;
};

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

const data: Data = {
  intervalDates: {
    dateStart: "2022-01-01T00:00:00",
    dateEnd: "2022-01-02T00:00:00",
  },
  events: [
    {
      dateStart: "2022-01-01T01:00:00",
      dateEnd: "2022-01-01T02:00:00",
    },
    {
      dateStart: "2022-01-01T08:21:00’",
      dateEnd: "2022-01-01T14:44:11",
    },
    {
      dateStart: "2022-01-01T22:11:00",
      dateEnd: "2022-01-01T23:50:00",
    },
  ],
};

const errorHandler = (err: Err) => {
  return {
    data,
  };
};

export const instanceAxios = axios.create();

instanceAxios.interceptors.request.use((req) => req, errorHandler);
instanceAxios.interceptors.response.use((res) => res, errorHandler);

export default instanceAxios;
