import { MenuItem } from '../types';
import { Collapsible } from './Collapsible';
import { MenuItems } from './MenuItems';

export type SidebarMenuProps = {
  menuItems: Array<
    MenuItem & {
      label: string;
    }
  >;
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
