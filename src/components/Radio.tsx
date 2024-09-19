import { useSearchParams } from 'react-router-dom';
import type { InputProps } from '../types';

export function Radio({ name, id, label }: InputProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleInputChange() {
    if (id === 'react') {
      searchParams.set('transpiler', 'babel');
    }
    searchParams.set(name, id);
    setSearchParams(searchParams);
  }

  return (
    <>
      <input
        type="radio"
        name={name}
        id={id}
        onChange={handleInputChange}
        checked={searchParams.get(name) === id}
      />
      <label htmlFor={id}>{label}</label>
    </>
  );
}
