import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Card, Dialog, Portal, Snackbar, Text} from 'react-native-paper';

type ToastVariant = 'info' | 'success' | 'error';

type ToastTriggerOptions = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  action?: ReactNode;
};

type ContextType = {
  toast: (options: ToastTriggerOptions) => void;
};

const Context = createContext<ContextType>({
  toast: () => {},
});

export const useToast = () => useContext(Context);

interface Props {
  children: ReactNode;
}

export const ToastProvider = ({children}: Props) => {
  const [state, setState] = useState<ToastTriggerOptions>();
  const [isVisible, setIsVisible] = useState(false);

  const toast = useCallback(
    ({variant = 'info', ...options}: ToastTriggerOptions) => {
      console.log(options);
      setState({...options, variant});
    },
    [setState],
  );

  useEffect(() => {
    if (state?.title) {
      setIsVisible(true);
    }
  }, [state]);

  useEffect(() => {
    let timeoutId: any;
    if (isVisible) {
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 1000);
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }
  }, [isVisible]);

  const value = useMemo(() => {
    return {
      toast,
    };
  }, [toast]);

  return (
    <Context.Provider value={value}>
      {children}
      {isVisible && (
        <Portal>
          <Card style={{position: 'absolute', bottom: 16, left: 0, right: 0}}>
            <Card.Content>
              <Card.Title title={state?.title} />
              {state?.description && <Text>{state?.description}</Text>}
            </Card.Content>
          </Card>
        </Portal>
      )}
    </Context.Provider>
  );
};
