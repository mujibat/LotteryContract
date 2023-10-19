import { useEffect, useState } from "react";
import useLotteryCount from "./useLotteryCount";
import { useConnection } from "../context/connection";
import { getLotteryContract } from "../utils";

const useAllLotteries = () => {
   const [lotteries, setLotteries] = useState([]);
   const { provider } = useConnection();
   const lotteryNo = useLotteryCount();

   useEffect(() => {
    const fetchAllLotteries = async () => {
        try {
            const contract = await getLotteryContract(provider, false);
            const lotteryKeys = Array.from(
                { length: Number(lotteryNo) },
                (_, i) => i + 1
            );
            const lotteryPromises = lotteryKeys.map((id) => contract.loter(id));
            const lotteryParticipants = lotteryKeys.map((id) =>
            contract.getTicketBuyers(id)
            );
            const lotteryResults = await Promise.all(lotteryPromises);
            const participantsResults = await Promise.all(lotteryParticipants);

            const lotteryDetails = lotteryResults.map((details, index) => ({
                id: lotteryKeys[index],
                ticketbuyers: participantsResults[index],
                owner: details.owner,
                deadline: Number(details.deadline),
                lotteryActive: details.lotteryActive,
                name: details.name,
            }));
            console.log(lotteryDetails, 'this isthe lottery details')
            setLotteries(lotteryDetails);
        }catch (error) {
            console.error('Error fetching lotteries:', error);
        }
    };
    fetchAllLotteries();
   }, [lotteryNo, provider]);

   return lotteries;
};

export default useAllLotteries;