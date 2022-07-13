import { useContext } from "react";
import { BalanceContext } from "../context/BalanceContext";

const useBalance = () => useContext(BalanceContext);

export default useBalance;