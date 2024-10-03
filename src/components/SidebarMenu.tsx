import { MenuItem } from '../types';
import { Collapsible } from './Collapsible';
import { MenuItems } from './MenuItems';

type MenuItems = Array<
  MenuItem & {
    label: string;
  }
>;

export type SidebarMenuProps = {
  menuItems: MenuItems;
};

export function SidebarMenu({ menuItems }: SidebarMenuProps) {
  return (
    <>
      {menuItems.map((menu) => {
        return (
          <Collapsible key={menu.name} trigger={menu.label}>
            <nav>
              <ul className="mb-4">
                <MenuItems
                  items={menu.items}
                  name={menu.name}
                  isMultiple={menu.isMultiple}
                />
              </ul>
            </nav>
          </Collapsible>
        );
      })}
    </>
  );
}
