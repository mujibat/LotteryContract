import { useCallback } from "react";
import { useConnection } from "../context/connection";
import { calculateGasMargin, getLotteryContract } from "../utils";

const useCreateLottery = () => {
    const { isActive, provider } = useConnection();
    const createLottery = useCallback(
        async (duration, title) => {
            if (!duration || !title)
            return alert("Please input all values");
            if (!isActive) return alert("please connect");
            const contract = await getLotteryContract(provider, true);
            const estimatedGas = await contract.createLottery.estimateGas(
                duration,
                title
            );
            return contract.createLottery(duration, title, {
                gasLimit: calculateGasMargin(estimatedGas),
            });
        },
        [isActive, provider]
    );
    return createLottery;
};

export default useCreateLottery;
