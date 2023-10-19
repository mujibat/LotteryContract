import { useCallback } from "react";
import { useConnection } from "../context/connection";
import {  calculateGasMargin, getLotteryContract } from "../utils";
import useLotteryCount from "./useLotteryCount";

const useBuyLottery = () => {
    const { provider, isActive } = useConnection();
    const lotteryLength = useLotteryCount();
    const buy = useCallback(
        async (id, amount) => {
            if (!isActive || !provider) return;
            if (!lotteryLength) return;
            if (Number(id) > lotteryLength)
            return alert("lottery does not exist");
            const contract = await getLotteryContract(provider, true);

            const estimatedGas = await contract.buyLotteryTicket.estimateGas(
               Number(id),
               {
                value: amount,
               } 
            );
            return contract.buyLotteryTicket(Number(id), {
                value: amount,
                gasLimit: calculateGasMargin(estimatedGas),
            });
        },
        [lotteryLength, isActive, provider]
    );
    return buy;
};
export default useBuyLottery;