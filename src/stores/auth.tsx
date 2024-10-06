import {create} from 'zustand';
import {AuthLoginResponsePayload} from '../types';

type State = {
  accessToken: string;
  expiresIn?: number;
  userId: string;
};

type Action = {
  isAuth: () => boolean;
  login: (payload: AuthLoginResponsePayload) => void;
  logout: () => void;
};

const initialState: State = {
  accessToken: '',
  expiresIn: undefined,
  userId: '',
};

export const useAuthStore = create<State & Action>((set, get) => ({
  ...initialState,
  isAuth: () => !!get().accessToken,
  login: ({access_token: accessToken, expires_in: expiresIn}) =>
    set(() => ({accessToken, expiresIn})),
  logout: () => set(() => initialState),
}));
