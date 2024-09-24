import { ReactNode, useState } from 'react';

export type CollapsibleProps = {
  trigger: string;
  children: ReactNode;
};

export function Collapsible({ trigger, children }: CollapsibleProps) {
  const [isCollapsed, setCollapsed] = useState(true);

  function handleClickTrigger() {
    setCollapsed(!isCollapsed);
  }

  return (
    <>
      <button className="block w-full" onClick={handleClickTrigger}>
        <h2 className="flex justify-between mb-2 font-semibold">
          <span>{trigger}</span> <span>{isCollapsed ? 'v' : '^'}</span>
        </h2>
      </button>
      {isCollapsed ? null : <div>{children}</div>}
    </>
  );
}
