import HeaderBox from "@/components/HeaderBox";
import RightSideBar from "@/components/RightSideBar";
import TestButton from "@/components/TestButton";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser, LogOut } from "@/lib/actions/user.actions";
import React from "react";

const Home = async () => {
  const loggedIn = await getLoggedInUser();
  //console.log("home", loggedIn);

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "Guest"}
            subtext="Access and mange your account and transactions"
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1432.45}
          />
        </header>
      </div>
      {loggedIn !== null ? (
        <RightSideBar
          user={loggedIn}
          transactions={[]}
          banks={[{ currentBalance: 254.45 }, { currentBalance: 1200.0 }]}
        />
      ) : (
        <></>
      )}
    </section>
  );
};

export default Home;
