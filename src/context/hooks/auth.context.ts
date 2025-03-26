import { useContext, createContext } from "react";
import { firebase } from "../../lib/firebase";

export interface Props {
  user: TeamUser | null;
  initialized: boolean;
  isPending: boolean;

<<<<<<< HEAD
  signin: (email: string, password: string) => PromiseResult<firebase.User>;
=======
  signin: (email: string, password: string) => PromiseResult;
>>>>>>> 088e484b8d3b026c146914774c496251e1979299
  signout: () => PromiseResult;
  signup: (user: TeamUser, password: string, uid?: string) => PromiseResult;

  updateUser: (newUser: TeamUser) => PromiseResult;
  signinWithProvider: () => PromiseResult<firebase.User>;
}

export const initialState: Props = {
  initialized: false,
  isPending: false,
  signin: async () => ({}),
  signout: async () => ({}),
  signup: async () => ({}),
  updateUser: async () => ({}),
  signinWithProvider: async () => ({}),
  user: null,
};

export const Context = createContext(initialState);

export const use = () => useContext(Context);
