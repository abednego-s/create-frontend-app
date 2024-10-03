import { Checkbox } from './Checkbox';
import { Radio } from './Radio';
import type { MenuItem } from '../types';

type MenuItemsProps = MenuItem;

export function MenuItems({ items, name, isMultiple }: MenuItemsProps) {
  return items.map((item) => (
    <li key={item.id}>
      {isMultiple ? (
        <Checkbox id={item.id} name={name} label={item.label} />
      ) : (
        <Radio id={item.id} name={name} label={item.label} />
      )}
    </li>
  ));
}
