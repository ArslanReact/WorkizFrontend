import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
const myEventsList = [
    {
      id: 0,
      title: "All Day Event very long title",
      allDay: true,
      start: new Date(2015, 3, 0),
      end: new Date(2015, 3, 1)
    }];
const localizer = momentLocalizer(moment)
const Calendar_Leaves = () => {
    return (
        <>
            <h4 className="fontsize22 blackcolortext">Leave Calendar</h4>
            {/*  */}
            <div className="card card_dashboard p-4 card-body">
                <Calendar
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"

                />
            </div>
        </>
    )
}

export default Calendar_Leaves;
