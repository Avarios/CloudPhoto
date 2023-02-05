import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from 'react';

interface IUser {
  avatarUrl:string,
  username:string,
  email:string
}

const UserContext = createContext({
  state: {} as Partial<IUser>,
  setState: {} as Dispatch<SetStateAction<Partial<IUser>>>,
});

const UserStateProvider = ({ children,  value = {} as IUser}: { children: React.ReactNode;  value?: Partial<IUser>;}): JSX.Element => {
  const [state, setState] = useState(value);

  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserState = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserState must be used within a UserStateProvider');
  } else {
    return context;
  }
};

export { UserStateProvider, useUserState, IUser };
