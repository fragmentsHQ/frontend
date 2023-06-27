import React from 'react';

export default function useChainChange<T>(
  value: T,
  onChange: (value: T) => void
) {
  const [prevValue, setPrevValue] = React.useState<T>(value);

  React.useEffect(() => {
    if (value !== prevValue) {
      setPrevValue(value);
      onChange(value);
    }
  }, [value, onChange, prevValue]);
}
