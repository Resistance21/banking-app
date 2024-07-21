import HeaderBox from "@/components/HeaderBox";
import PaymentTransferForm from "@/components/PaymentTransferForm";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const PaymentTransfer = async () => {
  const loggedIn: User = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn.$id });
  console.log("user accounts", accounts);
  //console.log("logged user", loggedIn);

  if (!accounts) return;

  const accountsData = accounts?.data;

  return (
    <section className="payment-transfer">
      <HeaderBox title="Payment Transfers" subtext="" />
      <div>
        <PaymentTransferForm accounts={accountsData} />
      </div>
    </section>
  );
};

export default PaymentTransfer;
