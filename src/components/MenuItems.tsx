import { Checkbox } from './Checkbox';
import { Radio } from './Radio';

export type MenuItem = {
  name: string;
  items: {
    id: string;
    label: string;
  }[];
  isMultiple: boolean;
};

export type MenuItemsProps = MenuItem;

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
