'use client';

import { SafeConnector } from '@wagmi/connectors/safe';
import { connect, getAccount, getNetwork } from '@wagmi/core';
import { useEffect } from 'react';

function useAutoConnect() {
  const { chains } = getNetwork();
  const { address, connector: connectedConnector } = getAccount();

  const safeConnector = new SafeConnector({
    chains,
    options: {
      allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
      debug: false,
    },
  });

  useEffect(() => {
    async function handleConnect() {
      if (connectedConnector?.id == safeConnector?.id) return;
      await connect({
        connector: safeConnector,
      });
    }
    handleConnect();
  }, [connect, chains, address]);
}

export { useAutoConnect };
