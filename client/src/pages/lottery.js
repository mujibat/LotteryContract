import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useLottery from '../hooks/useLottery';
import { formatEther, parseEther } from 'ethers';
import { formatDate } from '../utils';
import useBuyLottery from '../hooks/useBuyLottery';
import { useConnection } from '../context/connection';
import useAllLotteries from '../hooks/useAllLotteries';

const Lottery = () => {
  const [amountInput, setAmountInput] = useState(0);
  let {id}  = useParams();
  const navigate = useNavigate();
  const buyLottery = useBuyLottery();
  const [sendingTx, setSendingTx] = useState(false);
  const { isActive, provider } = useConnection();
  const { lottery, state } = useLottery(id);
  if (state === 'NOT_FOUND') return navigate('/');
  if (state === 'LOADING') return <p>Loading...</p>;

  const handleLottery = async () => {
    if (!isActive || !provider) return;
    if (amountInput <= 0) return alert('Enter a non-zero amount!');

    try {
      setSendingTx(true);
      const tx = await buyLottery(id, parseEther(String(amountInput)));
      const receipt = await tx.wait();

      if (receipt.status === 0) return alert('tx failed');

      alert('Thanks for Buying!!');
    } catch (error) {
      console.log('error: ', error);
      if (error.info.error.code === 4001) {
        return alert('You rejected the request');
      }
      alert('something went wrong');
    } finally {
      setSendingTx(false);
    }
  };
  return (
    <div className='flex flex-col items-center justify-center px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:pt-32 md:px-0'>
      <div className='flex flex-col items-center max-w-2xl md:px-8'>
        <div className='max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12'>
          <div className='mb-4'>
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
          <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto'>
            <span className='relative inline-block'>
              <span className='relative'>The</span>
            </span>{' '}
            {/* Lottery '{lottery.title}' */}
          </h2>
        </div>
        <div className='flex flex-col items-center w-full mb-4 md:flex-row'>
          <input
            value={amountInput}
            onChange={(e) => setAmountInput(Number(e.target.value))}
            placeholder='0.1'
            required=''
            type='number'
            min={0}
            step={0.01}
            className='flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-blue-400 focus:outline-none focus:shadow-outline'
          />
          <button
            onClick={handleLottery}
            className='inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-blue-400 hover:bg-blue-700 focus:shadow-outline focus:outline-none'
          >
            {sendingTx ? 'Contributing...' : 'Contribute'}
          </button>
        </div>
        <div className='max-w-md mb-10 text-xs text-gray-600 sm:text-sm md:text-center'>
          <div>
            <div className='px-6 py-4'>
              <p className='mt-2 font-bold text-gray-500'>
                {/* Expire on - {formatDate(lottery?.deadline)} */}
              </p>
              {/* <p className='mt-2 font-bold text-gray-500'>
                Balance - {formatEther(lottery?.fundingBalance)} ETH
              </p>
              <p className='mt-2 font-bold text-gray-500'>
                Funding Goal - {formatEther(lottery?.fundingGoal)} ETH
              </p>
              <div className='mt-2 font-bold text-gray-500'>
                Contributors :{' '}
                {lottery?.contributors.map((contributor, index) => {
                  return <p key={index}>{contributor}</p>;
                })}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lottery;