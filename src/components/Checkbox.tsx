import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { InputProps } from '../types';

export function Checkbox({ name, id, label }: InputProps) {
  const [isChecked, setChecked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const value = searchParams.get(name);
    if (value) {
      return setChecked(value.split(',').includes(id));
    }
  }, [id, name, searchParams]);

  function handleInputClick() {
    setChecked(!isChecked);

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
      if (queryParams[name]) {
        queryParams = {
          ...queryParams,
          [name]: [...queryParams[name].split(','), id].join(','),
        };
      } else {
        queryParams = {
          ...queryParams,
          [name]: id,
        };
      }
    }

    setSearchParams(queryParams);
  }

  return (
    <>
      <input
        type="checkbox"
        name={name}
        id={id}
        onChange={handleInputClick}
        checked={isChecked}
      />
      <label htmlFor={id}>{label}</label>
    </>
  );
}
