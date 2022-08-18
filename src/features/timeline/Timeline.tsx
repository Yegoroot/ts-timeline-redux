/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getTimelineData, selectTimeline } from './TimelineSlice';
import { getStyleEvent } from '../../utils/event'

import styles from './Timeline.module.scss';


export function Timeline() {
  const dispatch = useAppDispatch();
  const timeline = useAppSelector(selectTimeline).data;
  const timelineEl = useRef<HTMLUListElement>(null);
  const [width, setWidth] = useState<number>(0)

  const timelineStart = timeline.intervalDates.dateStart || new Date()
  const timelineEnd = timeline.intervalDates.dateEnd || new Date()
  const timelineInterval = moment.duration(moment(timelineEnd).diff(timelineStart)).asMilliseconds();
  const timePerPx = Math.round(timelineInterval / width)

  useEffect(() => {
    dispatch(getTimelineData())
  }, [])

  useEffect( () => {
      if(timelineEl.current){
        setWidth(timelineEl.current.offsetWidth)
      }
  }, [timelineEl]);
  
  useEffect(() => {
    function updateSize() {
      if(timelineEl.current){
        setWidth(timelineEl.current.offsetWidth)
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div  className={styles.root}>
      <div className={styles.timeline} >
        <ul ref={timelineEl}>
          {
            timeline.events.map((event)=> {
              return <li key={event.dateEnd} style={getStyleEvent(event, timePerPx, timelineStart)}></li>
            })
          }
        </ul>
      </div>

      <div className={styles.meta}>
        <div><b>Width</b> : {width}px</div>
        <div><b>Milliseconds</b> : {timelineInterval}</div>
        <div><b>Milliseconds per px</b> : {timePerPx}</div>
      </div>
    </div>
  );
}
