import { useContext, createContext } from "react";
import { firebase } from "../../lib/firebase"; // Make sure firebase is imported correctly
export interface Props {
  user: TeamUser | null;
  initialized: boolean;
  isPending: boolean;

  signin: (email: string, password: string) => PromiseResult;

  signup: (user: TeamUser, password: string, uid?: string) => PromiseResult;
  signout: () => PromiseResult;

  updateUser: (newUser: TeamUser) => PromiseResult;
  signInWithProvider: () => PromiseResult<firebase.User>;
}

export const initialState: Props = {
  initialized: false,
  isPending: false,
  signin: async () => ({}),
  signout: async () => ({}),
  signup: async () => ({}),
  updateUser: async () => ({}),
  signInWithProvider: async () => ({}),
  user: null,
};

export const Context = createContext(initialState);

export const use = () => useContext(Context);
