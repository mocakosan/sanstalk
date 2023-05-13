import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

//return타입 = [T, (e: any) => void, Dispatch<SetStateAction<T>>]
type ReturnTypes<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];
//any 대신 ChangeEvent<HTMLInputElement>
//제너릭타입
const useInput = <T>(initialData: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialData);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    //e.target.value 대신 e.target.value as unknown as T 넣으면 해결
    setValue(e.target.value as unknown as T);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
