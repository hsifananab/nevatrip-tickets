import { useState, useEffect } from 'react';

import RoutesMenu from './components/RoutesMenu';
import Output from './components/Output';
import Result from './components/Result';

export const routes = ['From A to B', 'From B to A', 'Round Trip'];

export const departures = [
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

export const formatDate = date => {
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

export const getWordsEnding = (number, word) => {
  if (
    +number.slice(-1) === 0 ||
    (+number >= 10 && +number <= 14) ||
    +number.slice(-1) > 4
  )
    return word + 'ов ';
  if (+number.slice(-1) > 1 && +number.slice(-1) <= 4) return word + 'a ';
  return word;
};

export const toHoursAndMinutes = minutes => {
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
