import DepartureSelect from './DepartureSelect';

const OneWayTrip = ({ timeOptions, handleDepartureTime }) => {
  return (
    <div className="">
      <DepartureSelect
        options={timeOptions}
        handleDepartureTime={handleDepartureTime}
      />
    </div>
  );
};

export default OneWayTrip;
