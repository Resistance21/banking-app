import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import RightSideBar from "@/components/RightSideBar";
import TestButton from "@/components/TestButton";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import {
  getAccount,
  getAccounts,
  getTransactions,
} from "@/lib/actions/bank.actions";
import { getLoggedInUser, LogOut } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn: User = await getLoggedInUser();
  if (!loggedIn) redirect("sign-in");
  const accounts = await getAccounts({ userId: loggedIn.$id });
  //console.log("user accounts", accounts);
  //console.log("logged user", loggedIn);

  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={`${loggedIn?.firstName} ${loggedIn?.lastName}` || "Guest"}
            subtext="Access and mange your account and transactions"
          />

          <TotalBalanceBox
            accounts={accounts.data}
            totalBanks={accounts.totalBanks}
            totalCurrentBalance={accounts.totalCurrentBalance}
          />
        </header>
        <RecentTransactions
          accounts={accountsData}
          appwriteItemId={appwriteItemId}
          page={currentPage}
          transactions={account?.transactions}
        />
      </div>
      {loggedIn !== null ? (
        <RightSideBar
          user={loggedIn}
          transactions={account.transactions}
          banks={accountsData?.slice(0, 2)}
        />
      ) : (
        <></>
      )}
    </section>
  );
};

export default Home;
