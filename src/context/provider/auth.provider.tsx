import { authService, db, FBCollection, firebase } from "../../lib/firebase";
import { AUTH } from "../hooks";
import {
  PropsWithChildren,
  useEffect,
  useCallback,
  useState,
  useTransition,
} from "react";

const ref = db.collection(FBCollection.USERS);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<TeamUser | null>(AUTH.initialState.user);
  const [initialized, setInitialized] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Fetch user data from the Firestore DB
  const fetchUser = useCallback(async (uid: string) => {
    try {
      const snap = await ref.doc(uid).get();
      const data = snap.data() as TeamUser | undefined;
      if (data) {
        setUser(data);
      } else {
        setUser(null); // Handle case where user doesn't exist in DB
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null); // Handle error and reset user state
    }
  }, []);

  // Set up auth state listener and fetch user data
  useEffect(() => {
    const subAuth = authService.onAuthStateChanged((fbUser) => {
      if (!fbUser) {
        setUser(null); // No user is logged in
      } else {
        fetchUser(fbUser.uid); // Fetch user data when logged in
      }
      setInitialized(true); // Set initialized to true once auth state changes
    });

    return () => subAuth(); // Clean up the subscription on component unmount
  }, [fetchUser]);

  // Signout function
  const signout = useCallback((): Promise<AsyncResult> => {
    return new Promise<AsyncResult>((resolve, reject) => {
      startTransition(async () => {
        try {
          await authService.signOut();
          setUser(null); // Reset user state after signing out
          resolve({ success: true });
        } catch (error: any) {
          reject({ message: error.message }); // Reject with error message if signout fails
        }
      });
    });
  }, []);

  // Signin function
  const signin = useCallback(
    (email: string, password: string): Promise<AsyncResult> => {
      return new Promise<AsyncResult>((resolve, reject) => {
        startTransition(async () => {
          try {
            const result = await authService.signInWithEmailAndPassword(
              email,
              password
            );
            if (!result.user) {
              reject({ message: "No such user found" });
              return;
            }
            // Optionally fetch user data
            // await fetchUser(result.user.uid);
            resolve({ success: true });
          } catch (error: any) {
            reject({ message: error.message }); // Reject with error message if signin fails
          }
        });
      });
    },
    []
  );

  // Signup function
  const signup = useCallback(
    (
      newUser: TeamUser,
      password: string,
      uid: string
    ): Promise<AsyncResult> => {
      return new Promise<AsyncResult>((resolve, reject) => {
        startTransition(async () => {
          try {
            let id = "";
            if (!uid) {
              const result = await authService.createUserWithEmailAndPassword(
                newUser.email,
                password
              );
              if (!result.user) {
                reject({ message: "회원가입 실패" });
                return;
              }
              id = result.user.uid;
            } else {
              id = uid;
            }

            await ref
              .doc(result.user.uid)
              .set({ ...newUser, uid: result.user.uid } as TeamUser);
            resolve({ success: true });
          } catch (error: any) {
            reject({ message: error.message }); // Reject with error message if signup fails
          }
        });
      });
    },
    []
  );

  const signInWithProvider = useCallback(
    async (): PromiseResult =>
      new Promise((resolve) =>
        startTransition(async () => {
          try {
            const provider = new firebase.auth.GoogleAuthProvider();

            const result = await authService.signInWithPopup(provider);

            if (!result.user) {
              return resolve({ message: "No such User" });
            }
            const snap = await ref.doc(result.user.uid).get();
            const data = snap.data() as TeamUser;
            if (data) {
              return resolve({ message: "통합회원임. 기본정보 입력" });
            }

            resolve({ message: "기본정보를 입력해야함", data: result.user });
          } catch (error: any) {
            resolve(error);
          }
        })
      ),
    []
  );
  return (
    <AUTH.Context.Provider
      value={{
        initialized,
        signout,
        isPending,
        signin,
        signup,
        user,
        signInWithProvider,
      }}
    >
      {children}
    </AUTH.Context.Provider>
  );
};

export default AuthProvider;
