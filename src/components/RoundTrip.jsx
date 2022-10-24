import DepartureSelect from './DepartureSelect';

const RoundTrip = ({
  timeOptions,
  handleDepartureTime,
  departureTime,
  handleReturnDepartureTime,
}) => {
  const returnTimeOptions = timeOptions[1].date.filter(
    item =>
      Date.parse(new Date(item)) > Date.parse(new Date(departureTime)) + 3000000
  );

  const filteredObj = { label: 'From B to A', date: returnTimeOptions };

  return (
    <div className="flex flex-col">
      <DepartureSelect
        options={timeOptions[0]}
        handleDepartureTime={handleDepartureTime}
      />

      <DepartureSelect
        options={filteredObj}
        handleDepartureTime={handleReturnDepartureTime}
      />
    </div>
  );
};

export default RoundTrip;
