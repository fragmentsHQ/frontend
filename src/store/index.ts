import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  isApproved: boolean;
  transactionState: LoadingStates;
  setEnteredRows: (newrows: Data[]) => void;
  setTransactionState: (newState: LoadingStates) => void;
  setIsApproved: (isApproved: boolean) => void;
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
  persist(
    (set) => ({
      enteredRows: rows,
      isApproved: false,
      transactionState: initialTransactionState,
      setTransactionState(newState) {
        set(() => ({ transactionState: newState }));
      },
      setEnteredRows: (newrows) => set(() => ({ enteredRows: newrows })),
      setIsApproved: (_isApproved) => set(() => ({ isApproved: _isApproved })),
    }),
    {
      name: 'autoay_frontend',
    }
  )
);

export default useGlobalStore;
