import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export type CheckboxProps = {
  name: string;
  id: string;
  label: string;
};

export function Checkbox({ name, id, label }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const checkActiveStatus = useCallback(() => {
    const param = searchParams.get(name);
    if (!param) {
      setIsChecked(false);
      return;
    }
    const paramSet = new Set(param.split(','));
    const isActive = paramSet.has(id);
    setIsChecked(isActive);
  }, [id, name, searchParams]);

  useEffect(checkActiveStatus, [checkActiveStatus]);

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
