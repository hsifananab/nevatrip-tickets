import { formatDate } from '../App';

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

export default DepartureSelect;
