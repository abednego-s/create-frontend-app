import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export type CheckboxProps = {
  name: string;
  id: string;
  label: string;
};

export function Checkbox({ name, id, label }: Readonly<CheckboxProps>) {
  const [isChecked, setIsChecked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const param = searchParams.get(name);
    const isActive = param ? param.split(',').includes(id) : false;
    return setIsChecked(isActive);
  }, [id, name, searchParams]);

  function handleInputClick() {
    setIsChecked(!isChecked);

    let queryParams = Array.from(searchParams).reduce<Record<string, string>>(
      (prev, current) => {
        const [key, value] = current;
        prev = {
          ...prev,
          [key]: value,
        };
        return prev;
      },
      {}
    );

    if (isChecked) {
      const modifiedParam = queryParams[name]
        .split(',')
        .filter((param) => param !== id)
        .join(',');

      queryParams = {
        ...queryParams,
        [name]: modifiedParam,
      };

      if (!modifiedParam) {
        queryParams = Object.keys(queryParams).reduce<Record<string, string>>(
          (prev, current) => {
            if (current !== name) {
              prev[current] = queryParams[current];
            }
            return prev;
          },
          {}
        );
      }
    } else {
      const value = queryParams[name]
        ? [...queryParams[name].split(','), id].join(',')
        : id;

      queryParams = {
        ...queryParams,
        [name]: value,
      };
    }

    setSearchParams(queryParams);
  }

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        name={name}
        id={id}
        onChange={handleInputClick}
        checked={isChecked}
      />
      <label htmlFor={id} className="ml-2 text-sm">
        {label}
      </label>
    </div>
  );
}
