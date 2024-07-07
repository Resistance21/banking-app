import { formatAmount } from "@/lib/utils";
import React, { useRef } from "react";
import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./DoughnutChart";

const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotlaBalanceBoxProps) => {
  return (
    <section className="total-balance">
      <div className="total-balance-chart">
        <DoughnutChart accounts={accounts} />
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="header-2">Bank Accounts: {totalBanks}</h2>
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total Current Balanace</p>
          <div className="total-balance-amount flex-center gap-2">
            <AnimatedCounter
              duration={2}
              end={totalCurrentBalance}
              decimals={2}
              prefix={"$"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
