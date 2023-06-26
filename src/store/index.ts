import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Data {
  id: string;
  to_address: string;
  destination_token: string;
  destination_chain: string;
  amount_of_source_token: string;
}

type LoadingStates = {
  isOpen: boolean;
  isApproved: boolean;
  isSuccess: boolean;
  isError: boolean;
  message?: string;
};
interface GlobalState {
  enteredRows: Data[];
  transactionState: LoadingStates;
  setEnteredRows: (newrows: Data[]) => void;
  setTransactionState: (newState: LoadingStates) => void;
}

const rows: Data[] = [
  {
    id: '1',
    to_address: '',
    destination_token: '',
    amount_of_source_token: '',
    destination_chain: '',
  },
];

export const initialTransactionState: LoadingStates = {
  isOpen: false,
  isApproved: false,
  isSuccess: false,
  isError: false,
};

const useGlobalStore = create<GlobalState>()(
  devtools(
    (set) => ({
      enteredRows: rows,
      transactionState: initialTransactionState,
      setTransactionState(newState) {
        set(() => ({ transactionState: newState }));
      },
      setEnteredRows: (newrows) => set(() => ({ enteredRows: newrows })),
    }),
    {
      name: 'autoay_frontend',
    }
  )
);

export default useGlobalStore;
