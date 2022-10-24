import { getWordsEnding, routes, formatDate, toHoursAndMinutes } from '../App';

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

export default Result;
