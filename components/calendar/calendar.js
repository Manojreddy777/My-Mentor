import React from 'react';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';

const Calendar = () => {
  return (
    <div>
      <FullCalendar plugins={[daygridPlugin]} />
    </div>
  );
};

export default Calendar;
