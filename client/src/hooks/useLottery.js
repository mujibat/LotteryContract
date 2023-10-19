import { useEffect, useState } from "react";
import { useConnection } from "../context/connection";
import { getLotteryContract } from "../utils";

const useLottery = (id) => {
    const [lottery, setLottery] = useState(null);
    const [state, setState] = useState('LOADING');
    const { provider } = useConnection();

    useEffect(() => {
        const fetchLottery = async () => {
            const lotteryId = Number(id);
            if (!lotteryId) {
                return setState('NOT_FOUND')
            }
            
            try {
                const contract = await getLotteryContract(provider, false);
                const ticketbuyers = await contract.loter(id);

                setLottery(ticketbuyers);
                setState('LOADED');
            } catch (error) {
                console.error('Error fetching lotteries:', error);
                setState('NOT_FOUND');
            }
        };

        fetchLottery();
    }, [id, provider]);
    return { lottery, state };
};

export default useLottery;