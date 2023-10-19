import React from "react";
import CreateLottery from "../component/CreateLottery";
import AllLotteries from "../component/AllLotteries";

const Home = () => {
    return (
        <>
            <CreateLottery />
            <AllLotteries />
        </>
    );
};

export default Home;