import { useState, useEffect } from 'react';

const routes = ['From A to B', 'From B to A', 'Round Trip'];

const departures = [
  {
    label: 'From A to B',
    date: [
      '2021-08-21 18:00:00',
      '2021-08-21 18:30:00',
      '2021-08-21 18:45:00',
      '2021-08-21 19:00:00',
      '2021-08-21 19:15:00',
      '2021-08-21 21:00:00',
    ],
  },
  {
    label: 'From B to A',
    date: [
      '2021-08-21 18:30:00',
      '2021-08-21 18:45:00',
      '2021-08-21 19:00:00',
      '2021-08-21 19:15:00',
      '2021-08-21 21:50:00',
      '2021-08-21 21:55:00',
    ],
  },
];

const formatDate = date => {
  const timestamp = Date.parse(new Date(date));
  const time = new Date(timestamp);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  return `${hours}:${minutes.toString().length < 2 ? minutes + '0' : minutes}`;
};

const getDefaultDepartureTime = activeIndex => {
  const currentIndex = activeIndex === 1 ? activeIndex : 0;

  return departures.filter(item => item.label === routes[currentIndex])[0]
    .date[0];
};

const getWordsEnding = (number, word) => {
  if (
    +number.slice(-1) === 0 ||
    (+number >= 10 && +number <= 14) ||
    +number.slice(-1) > 4
  )
    return word + 'ов ';
  if (+number.slice(-1) > 1 && +number.slice(-1) <= 4) return word + 'a ';
  return word;
};

const toHoursAndMinutes = minutes => {
  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;
  return `${hours} ${hours === 1 ? 'час' : 'часа'} ${restMinutes} минут`;
};

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [departureTime, setDepartureTime] = useState('2021-08-21 18:00:00');
  const [ticketsNumber, setTicketsNumber] = useState('1');
  const [showResult, setShowResult] = useState(false);
  const [returnDepartureTime, setReturnDepartureTime] = useState(
    '2021-08-21 19:00:00'
  );

  console.log(returnDepartureTime);

  useEffect(() => {
    setDepartureTime(getDefaultDepartureTime(activeIndex));
  }, [activeIndex]);

  const handleTickets = e => setTicketsNumber(e.target.value);
  const handleDepartureTime = e => setDepartureTime(e.target.value);
  const handleShowResult = () => setShowResult(true);
  const handleHideResult = () => setShowResult(false);
  const handleReturnDepartureTime = e => setReturnDepartureTime(e.target.value);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen ">
      <div className="max-w-md h-96 flex flex-col gap-6 sm:min-w-[500px]">
        <RoutesMenu
          routes={routes}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          handleHideResult={handleHideResult}
        />
        <Output
          activeIndex={activeIndex}
          ticketsNumber={ticketsNumber}
          ticketsHandler={handleTickets}
          resultHandler={handleShowResult}
          handleDepartureTime={handleDepartureTime}
          departureTime={departureTime}
          handleReturnDepartureTime={handleReturnDepartureTime}
        />
        {showResult && (
          <Result
            activeIndex={activeIndex}
            ticketsNumber={ticketsNumber}
            departureTime={departureTime}
            returnDepartureTime={returnDepartureTime}
          />
        )}
      </div>
    </div>
  );
};

export default App;

const RoutesMenu = ({
  routes,
  activeIndex,
  setActiveIndex,
  handleHideResult,
}) => {
  return (
    <div className="flex gap-4 justify-between bg-gray-200 p-4 rounded-3xl">
      {routes.map((item, index) => (
        <RouteItem
          key={item}
          item={item}
          isSelected={activeIndex === index}
          handleClick={() => {
            handleHideResult();
            return setActiveIndex(index);
          }}
        />
      ))}
    </div>
  );
};

const RouteItem = props => {
  const { item, isSelected, handleClick } = props;

  return (
    <div
      onClick={handleClick}
      style={{ padding: '0 0.5rem', fontWeight: 700, cursor: 'pointer' }}
      className={`${isSelected ? 'text-rose-500' : ''} transition-all`}
    >
      {item}
    </div>
  );
};

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
      {/* should be filtered */}
      <DepartureSelect
        options={filteredObj}
        handleDepartureTime={handleReturnDepartureTime}
      />
    </div>
  );
};

const DepartureSelect = ({ options, handleDepartureTime }) => {
  return (
    <div className="">
      <h1>{options.label}</h1>
      <label htmlFor="time">Choose Departure Time</label>
      <select id="time" onChange={handleDepartureTime}>
        {options.date.map((item, index) => (
          <option key={index} value={item}>
            {formatDate(item)}
          </option>
        ))}
      </select>
    </div>
  );
};

const NumberOfTickets = ({ ticketsNumber, ticketsHandler }) => {
  return (
    <div className="">
      <label htmlFor="">Choose Tickets Number</label>
      <input
        type="number"
        min={1}
        id=""
        value={ticketsNumber}
        onChange={e => ticketsHandler(e)}
      />
    </div>
  );
};

const ConfirmButton = ({ resultHandler }) => {
  return <button onClick={resultHandler}>Confirm</button>;
};

const Result = ({
  ticketsNumber,
  activeIndex,
  departureTime,
  returnDepartureTime,
}) => {
  const getRoundedTripDuration = () => {
    const start = Date.parse(new Date(departureTime));
    const end = Date.parse(new Date(returnDepartureTime)) + 3000000;
    return end - start;
  };

  const tripDuration = 3000000;
  const tiketsPrice = activeIndex === 2 ? 1200 : 700;

  const getArrivalTime = departureTime => {
    const departureTimestamp = Date.parse(new Date(departureTime));
    const arrivalTimestamp = departureTimestamp + tripDuration;
    const arrivalDate = new Date(arrivalTimestamp);
    const hours = arrivalDate.getHours().toString();
    const minutes = arrivalDate.getMinutes().toString();

    return `${hours}:${minutes.length < 2 ? '0' + minutes : minutes}`;
  };

  return (
    <div className="px-4 py-2 w-full bg-lime-100 rounded-3xl">
      <p className="">
        Вы выбрали{' '}
        <strong>
          {ticketsNumber} {getWordsEnding(ticketsNumber, 'билет')}
        </strong>{' '}
        по маршруту <strong>{routes[activeIndex]}</strong> стоимостью{' '}
        <strong>{ticketsNumber * tiketsPrice}р</strong>.
        <br />
        {activeIndex !== 2 && (
          <>
            Это путешествие займет у вас{' '}
            <strong>{tripDuration / 60000} минут.</strong> <br /> Теплоход
            отправляется в <strong>{formatDate(departureTime)}</strong> , а
            прибудет в <strong>{getArrivalTime(departureTime)}</strong>.
          </>
        )}
        {activeIndex === 2 && (
          <>
            Теплоход <strong> {routes[0]} </strong> отправляется в{' '}
            <strong>{formatDate(departureTime)}</strong>, а прибудет в{' '}
            <strong>{getArrivalTime(departureTime)}</strong>. <br />
            Теплоход <strong> {routes[1]} </strong> отправляется в{' '}
            <strong>{formatDate(returnDepartureTime)}</strong>, а прибудет в{' '}
            <strong>{getArrivalTime(returnDepartureTime)}</strong>. <br />
            Это путешествие займет у вас{' '}
            <strong>
              {toHoursAndMinutes(getRoundedTripDuration() / 60000)}
            </strong>
            .
            <br />
          </>
        )}
      </p>
    </div>
  );
};
