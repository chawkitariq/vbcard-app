import {create} from 'zustand';

type State = {
  jwt: string;
  user: {
    id: string;
  };
};

type LoginActionPayload = {jwt: string};

type Action = {
  isAuth: () => boolean;
  login: (payload: LoginActionPayload) => void;
  logout: () => void;
};

const initialState: State = {
  jwt: '',
  user: {
    id: '',
  },
};

export const useAuthStore = create<State & Action>((set, get) => ({
  ...initialState,
  isAuth: () => !!get().jwt,
  login: ({jwt}) => set(() => ({jwt})),
  logout: () => set(() => initialState),
}));
