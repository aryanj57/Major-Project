import React from 'react';
import '../../App.css';
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  EventSettingsModel,
} from '@syncfusion/ej2-react-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

class Clendar extends React.Component {
  EventSettingsModel = {
    dataSource: [
      {
        EndTime: new Date(2021, 8, 11, 6, 30),
        StartTime: new Date(2021, 8, 11, 4, 0),
      },
    ],
  };
  remoteData = new DataManager({
    url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
    adaptor: new WebApiAdaptor(),
    crossDomain: true,
  });
  render() {
    return (
      <ScheduleComponent
        currentView="Week"
        selectedDate={new Date(2021, 8, 11)}
        eventSettings={this.EventSettingsModel}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    );
  }
}
export default Clendar;
