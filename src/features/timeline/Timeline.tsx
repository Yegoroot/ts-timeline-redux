import { useEffect, useRef, useState } from 'react';
import moment from 'moment';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getTimeline, selectTimeline } from './TimelineSlice';
import { Event } from '../../utils/axios';
import { getEventColor } from '../../utils/getEventColor'

import styles from './Timeline.module.scss';


export function Timeline() {
  const dispatch = useAppDispatch();
  const timeline = useAppSelector(selectTimeline).data;
  const timelineEl = useRef<HTMLUListElement>(null);
  const [width, setWidth] = useState<number>(0)

  const timelineStart = timeline.intervalDates.dateStart || new Date()
  const timelineEnd = timeline.intervalDates.dateEnd || new Date()
  // интервал ленты (в миллисекундах)
  const timelineInterval = moment.duration(moment(timelineEnd).diff(timelineStart)).asMilliseconds();
  const timePerPx = Math.round(timelineInterval / width)

  // get data
  useEffect(() => {
    dispatch(getTimeline())
  }, [])

  // get size timeline (px)
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


  const getStyleEvent = (event: Event) => {
    // длина события (в миллисекундах)
    const eventInterval = moment.duration(moment(event.dateEnd).diff(event.dateStart)).asMilliseconds();
    const eventWidth = Math.round(eventInterval / timePerPx)

    // интервал между началом ленты и началом события (в миллисекундах)
    const time =  moment.duration(moment(event.dateStart).diff(timelineStart)).asMilliseconds()
    const leftPx = Math.round(time / timePerPx);

    console.log( leftPx,eventWidth )
    return {
      width: `${eventWidth}px`,
      background: getEventColor(event.type),
      left: `${leftPx}px`
    }
  }


  return (
    <div  className={styles.root}>
      <div className={styles.timeline} >
        <ul ref={timelineEl}>
          {
            timeline.events.map((event)=> {
              return <li key={event.dateEnd} style={getStyleEvent(event)}></li>
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
