import React from 'react';

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

export default NumberOfTickets;
