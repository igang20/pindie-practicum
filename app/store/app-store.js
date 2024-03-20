import { create } from "zustand";
import { removeJWT, setJWT, getJWT, getMe } from "../api/apiutils";
import { endpoints } from "../api/config";

export const useStore = create((set) => ({
  isAuth: false,
  user: null,
  token: null,
  login: (user, token) => {
    set({ isAuth: true, user, token });
    setJWT(token);
  },
  logout: () => {
    set({ isAuth: false, user: null, token: null });
    removeJWT();
  },
  checkMe: async () => {
    const token = getJWT();
    if (token) {
      const me = await getMe(endpoints.me, token);
      if (me) {
        set({ isAuth: true, user: me, token });
        setJWT(token);
      } else {
        set({ isAuth: false, user: null, token: null });
      }
    } else {
      set({ isAuth: false, user: null, token: null });
    }
  },
}));
