import {create} from 'zustand';
import {AuthLoginResponsePayload} from '../types';
import {createJSONStorage, persist} from 'zustand/middleware';
import {zustandStorageService} from '../services';
import {isExpired} from '../utils';

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

export const useAuthStore = create(
  persist<State & Action>(
    (set, get) => ({
      ...initialState,
      isAuth: () => !isExpired(get().expiresIn as number),
      login: ({access_token: accessToken, expires_in: expiresIn}) =>
        set(() => ({accessToken, expiresIn})),
      logout: () => set(() => initialState),
    }),
    {
      name: 'vbcard-auth',
      storage: createJSONStorage(() => zustandStorageService),
    },
  ),
);
