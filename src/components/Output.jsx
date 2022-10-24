import OneWayTrip from './OneWayTrip';
import RoundTrip from './RoundTrip';
import NumberOfTickets from './NumberOfTickets';
import ConfirmButton from './ConfirmButton';
import { departures } from '../App';

const Output = ({
  activeIndex,
  timeOptions,
  ticketsNumber,
  ticketsHandler,
  resultHandler,
  handleDepartureTime,
  departureTime,
  handleReturnDepartureTime,
}) => {
  return (
    <div className="px-4 py-2 w-full bg-lime-100 rounded-3xl">
      {activeIndex === 0 && (
        <OneWayTrip
          timeOptions={departures[0]}
          handleDepartureTime={handleDepartureTime}
        />
      )}
      {activeIndex === 1 && (
        <OneWayTrip
          timeOptions={departures[1]}
          handleDepartureTime={handleDepartureTime}
        />
      )}
      {activeIndex === 2 && (
        <RoundTrip
          timeOptions={departures}
          handleDepartureTime={handleDepartureTime}
          departureTime={departureTime}
          handleReturnDepartureTime={handleReturnDepartureTime}
        />
      )}
      <NumberOfTickets
        ticketsNumber={ticketsNumber}
        ticketsHandler={ticketsHandler}
      />
      <ConfirmButton resultHandler={resultHandler} />
    </div>
  );
};

export default Output;
