import {useEffect, useState} from 'react';

export const useDebouncedValue = <T>(
  initialValue: T,
  delay: number = 500,
): T | null => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(initialValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [initialValue, delay]);

  return value;
};
