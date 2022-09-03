import React, { createContext, useState, useEffect } from "react";
import { BalanceProps } from "../types/BalanceType";

type BalanceProviderProps = {
  // no React 18+, necessário tipagem do children através do type ou interface;
  children?: React.ReactNode;
};

interface IBalanceContext {
  totalGainsAmount: BalanceProps[] | [];
  totalExpensesAmount: BalanceProps[] | [];
}

export const BalanceContext = createContext<IBalanceContext>(
  {} as IBalanceContext
);

export const BalanceProvider: React.FC<BalanceProviderProps> = ({
  children,
}) => {
  const [totalGainsAmount, setTotalGainsAmount] = useState([]);
  const [totalExpensesAmount, setTotalExpensesAmount] = useState([]);

  const localGains = localStorage.getItem("@my-wallet:gains");
  !localGains && localStorage.setItem("@my-wallet:gains", JSON.stringify([]));
  const gainsJSON = localGains ? JSON.parse(localGains) : [];

  const localExpenses = localStorage.getItem("@my-wallet:expenses");
  !localExpenses && localStorage.setItem("@my-wallet:expenses", JSON.stringify([]));
  const expensesJSON = localExpenses ? JSON.parse(localExpenses) : [];

  useEffect(() => {
    setTotalGainsAmount(gainsJSON);
    setTotalExpensesAmount(expensesJSON);
  }, []);


  return (
    <BalanceContext.Provider
      value={{
        totalGainsAmount,
        totalExpensesAmount,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};
