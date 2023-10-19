// import { formatEther } from "ethers";
import React from "react";
import { formatDate } from "../utils";
import { Link } from 'react-router-dom';

const Lottery = ({ lottery }) => {
    return (
        <div className='bg-white w-[30%] sm:max-w-sm border-2 border-blue-200 shadow-lg rounded-xl overflow-hidden py-8'>
      <Link to={`/lottery/${lottery.id}`}>
        <div className='px-6 py-4'>
          <h2 className='text-2xl text-blue-400 font-semibold mb-5'>
            {lottery.name}
          </h2>
          <p className='mt-2 font-bold text-gray-500'>
            Expire on - {formatDate(lottery?.deadline)}
          </p>
        </div>
        <div className='flex flex-col gap-3 px-6 pt-2 pb-2'>
          {/* <span className='mt-2 font-bold text-gray-500'>
            Ticket Buyers - {lottery?.ticketbuyers.length}
          </span> */}
          <span
            className={`${
              lottery.lotteryActive
                ? 'bg-green-400 text-white'
                : 'bg-red-400 text-white'
            } w-fit text-sm px-4 py-2 rounded-full`}
          >
            {lottery.lotteryActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default Lottery;