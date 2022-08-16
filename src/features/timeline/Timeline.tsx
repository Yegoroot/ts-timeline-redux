import React, { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getTimeline,
  selectTimeline,
} from './TimelineSlice';
import moment from 'moment';

import styles from './Timeline.module.scss';

export function Timeline() {
  const timeline = useAppSelector(selectTimeline).data;

  const dispatch = useAppDispatch();

  const intervalDatesStart = timeline.intervalDates.dateStart || new Date()
  const intervalDatesEnd = timeline.intervalDates.dateEnd || new Date()

  var interval = moment.duration(moment(intervalDatesEnd).diff(intervalDatesStart));
  var mimutes = interval.asMinutes();

  console.log(mimutes)


  useEffect(() => {
    dispatch(getTimeline())
  }, [])
  

  return (
    <div  className={styles.root}>

      <div className={styles.timeline}></div>

      <p>
      {moment(timeline.intervalDates.dateStart).format('DD.MM.YYYY')}
      </p>

      <p>
      {moment(timeline.intervalDates.dateEnd).format('DD.MM.YYYY')}
      </p>
      
      <ul>
        {
          timeline.events.map((event)=> {

            return <li key={event.dateEnd}>
              { moment(event.dateEnd).format('DD.MM.YYYY HH:MM') }
              {/* {event.dateEnd} */}
            </li>
          })
        }
      </ul>
    </div>
  );
}
