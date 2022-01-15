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
const JobScheduling = () => {
    return (
        <>
            <h4 className="fontsize22 blackcolortext">Job Scheduling</h4>
            <p className="paragraph_grey1_text_color fontsize16">Calendar shows the due tasks on their due dates.</p>
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

export default JobScheduling;
