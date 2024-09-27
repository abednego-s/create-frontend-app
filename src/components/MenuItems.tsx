import { Checkbox } from './Checkbox';
import { Radio } from './Radio';

type MenuItemsProps = {
  items: Array<{
    id: string;
    label: string;
  }>;
  name: string;
  isMultiple: boolean;
};

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
