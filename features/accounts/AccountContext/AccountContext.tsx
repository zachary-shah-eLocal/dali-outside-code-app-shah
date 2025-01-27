import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Navigation } from "../../../helpers/Navigationhelper";
import { StorageHelper } from "../../../helpers/Storagehelper";
import { Screens } from "../../../navigation/consts/Screens";
import { Stacks } from "../../../navigation/consts/Stacks";
import { useAppState } from "../../../store/appState";
import { useAuth } from "../../auth";

interface Account {
  Postgres_External_Key__c: string;
}

interface AccountContextProps {
  accountId: string | null;
  setAccountId: (account: Account) => Promise<void>;
  removeAccountId: () => void;
}

export const AccountContext = createContext<AccountContextProps | undefined>(
  undefined
);

interface AccountProviderProps {
  children: ReactNode;
}

export const AccountProvider: FC<AccountProviderProps> = ({ children }) => {
  const { auth } = useAuth();
  const [accountId, setAccountId] = useState<string | null>(null);
  const setAppLoading = useAppState((state) => state.setAppLoading);

  const setAcc = async (account: Account) => {
    const id = account.Postgres_External_Key__c;
    await StorageHelper.set("accountId", id);
    setAccountId(id);
    Navigation.replace(Stacks.MAIN_STACK);
  };

  const removeAccountId = async () => {
    await StorageHelper.remove("accountId");
    setAccountId(null);
  };

  useEffect(() => {
    const fetchAccountId = async () => {
      setAppLoading(true);
      if (!auth) {
        setAppLoading(false);
        return;
      }
      if (accountId) {
        setAppLoading(false);
        return;
      }
      const idFromStorage = await StorageHelper.get("accountId");
      if (idFromStorage) {
        setAccountId(idFromStorage);
      } else {
        Navigation.replace(Screens.SWITCH_ACCOUNT_SCREEN);
      }
      setAppLoading(false);
    };
    fetchAccountId();
  }, [auth, accountId]);

  return (
    <AccountContext.Provider
      value={{
        accountId,
        setAccountId: setAcc,
        removeAccountId,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
