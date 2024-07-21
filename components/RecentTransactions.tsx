import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from "./BankTabItem";
import BankInfo from "./BankInfo";
import TransactionsTable from "./TransactionsTable";
import { Pagination } from "./Pagination";

const RecentTransactions = ({
  accounts,
  appwriteItemId,
  page = 1,
  transactions = [],
}: RecentTransactionsProps) => {
  //console.log("RTs:", accounts);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);
  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  return (
    <section className="recent-transactions">
      <header className="flex items-center justify-between">
        <h2 className="recent-transactions-label">Recent transactions</h2>
        <Link
          href={`/transaction-history/?id=${appwriteItemId}`}
          className="view-all-btn"
        >
          View All
        </Link>
      </header>
      <Tabs defaultValue={appwriteItemId} className="w-full">
        <TabsList>
          {accounts.map((account: Account) => {
            return (
              <TabsTrigger key={account.id} value={account.appwriteItemId}>
                <BankTabItem
                  key={account.id}
                  account={account}
                  appwriteItemId={appwriteItemId}
                />
              </TabsTrigger>
            );
          })}
        </TabsList>
        {accounts.map((account: Account) => {
          //console.log("RT:", account);
          return (
            <TabsContent
              key={account.id}
              value={account.appwriteItemId}
              className="space-y-4"
            >
              <BankInfo
                key={account.id}
                account={account}
                type={"full"}
                appwriteItemId={appwriteItemId}
              />
              <TransactionsTable transactions={currentTransactions} />
              <Pagination page={page} totalPages={totalPages} />
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
};

export default RecentTransactions;
