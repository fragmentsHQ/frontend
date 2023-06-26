import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';

import useGlobalStore, { initialTransactionState } from '@/store';

export default function Loader() {
  const { transactionState, setTransactionState } = useGlobalStore();
  const handleClose = () => {
    setTransactionState(initialTransactionState);
  };

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={transactionState.isOpen}
        onClick={handleClose}
      >
        <CircularProgress color='inherit' />
        {transactionState.isApproved && (
          <h1>
            click ‘use default’ and confirm allowance to setup your automation
          </h1>
        )}

        {transactionState.isSuccess && <h1>Successful</h1>}
      </Backdrop>
    </div>
  );
}
