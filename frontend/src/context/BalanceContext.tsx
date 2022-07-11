import React, { createContext, useState, useEffect } from "react";
import { BalanceProps } from "../types/BalanceType";

type BalanceProviderProps = {
	// no React 18+, necessário tipagem do children através do type ou interface;
	children?: React.ReactNode;
};

interface IBalanceContext {
	totalGainsAmount: BalanceProps;
	totalExpensesAmount: BalanceProps;
}

export const BalanceContext = createContext<IBalanceContext>({} as IBalanceContext);

export const BalanceProvider: React.FC<BalanceProviderProps> = ({ children }) => {
	const localGains = localStorage.getItem("@my-wallet:gains");
	const localExpenses = localStorage.getItem("@my-wallet:expenses");

	useEffect(() => {
		const totalGainsAmount = localGains ? localGains : {};
		const totalExpensesAmount = localExpenses ? localExpenses : {};
	}, [localGains, localExpenses]);

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
