import { ReactNode, useState } from 'react';
import { ChevronDown } from './ChevronDown';
import { ChevronUp } from './ChevronUp';

export type CollapsibleProps = {
  trigger: string;
  children: ReactNode;
};

export function Collapsible({ trigger, children }: Readonly<CollapsibleProps>) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  function handleClickTrigger() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <>
      <button className="block w-full" onClick={handleClickTrigger}>
        <span className="flex items-center justify-between mb-2 font-semibold">
          <span>{trigger}</span>
          <span>{isCollapsed ? <ChevronDown /> : <ChevronUp />}</span>
        </span>
      </button>
      {isCollapsed ? null : <div>{children}</div>}
    </>
  );
}
