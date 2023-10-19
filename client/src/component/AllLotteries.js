import useAllLotteries from "../hooks/useAllLotteries";
import Lottery from "./Lottery";

const AllLotteries = () => {
    const lotteries = useAllLotteries();
    return (
        <div className="flex flex-wrap justify-center gap-10 px-5 py-10">
            {!!lotteries &&
                lotteries.map((lottery, index) => (
                    <Lottery key={index} lottery={lottery} />
                ))}
        </div>
    );
};

export default AllLotteries;