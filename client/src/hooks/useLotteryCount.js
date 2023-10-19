import { useEffect, useState } from "react";
import { useConnection } from "../context/connection";
import { getLotteryContract } from "../utils";

const useLotteryCount = () => {
    const [lotteryCount, setLotteryCount] = useState(0);
    const { provider } = useConnection();

    useEffect(() => {
        const fetchLotteryCount = async () => {
            try {
                const contract = await getLotteryContract(provider, false);
                const count = await contract._ID();
                setLotteryCount(Number(count));
            } catch (error) {
                console.error("Error fetching campaign count:", error);
            }
        };

        fetchLotteryCount();
    }, [provider]);
    return lotteryCount;
};

export default useLotteryCount;