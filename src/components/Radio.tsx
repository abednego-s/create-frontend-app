import { useSearchParams } from 'react-router-dom';

type RadioProps = {
  name: string;
  id: string;
  label: string;
};

export function Radio({ name, id, label }: RadioProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleInputChange() {
    if (id === 'react') {
      searchParams.set('transpiler', 'babel');
    }
    searchParams.set(name, id);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex items-center">
      <input
        type="radio"
        name={name}
        id={id}
        onChange={handleInputChange}
        checked={searchParams.get(name) === id}
      />
      <label htmlFor={id} className="ml-2 text-sm">
        {label}
      </label>
    </div>
  );
}
