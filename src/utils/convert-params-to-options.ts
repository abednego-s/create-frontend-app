import { isMultiOptionParam } from './is-multi-option-param';
import { Options } from '../types';

export function convertParamsToOptions(searchParams: URLSearchParams) {
  return Array.from(searchParams).reduce((prev, current) => {
    const [key, value] = current as [keyof Options, string];
    prev = {
      ...prev,
      [key]: isMultiOptionParam(key) ? value.split(',') : value,
    };

    return prev;
  }, {} as Options);
}
