import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox";
import { useUserContext } from "@/context/UserContext";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React, { useContext } from "react";

const MyBanks = async () => {
  const user = await getLoggedInUser();

  const accounts = await getAccounts({ userId: user.$id });
  console.log("user accounts my banks", accounts);
  //console.log("logged user", loggedIn);

  if (!accounts) return;

  const accountsData: Account[] = accounts?.data;

  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title="My Bank Accounts"
          subtext="Manage your banking activities"
        />
        <div className="space-y-4">
          <h2 className="header-2">Your cards</h2>
          <div className="flex flex-wrap gap-6">
            {accountsData.map((a: Account) => {
              return (
                <BankCard
                  key={a.id}
                  account={a}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={true}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBanks;
