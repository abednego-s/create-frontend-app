import { ReactNode, useState } from 'react';
import chevronDown from '../../assets/chevron-down.svg';
import chevronUp from '../../assets/chevron-up.svg';

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
        <h2 className="flex items-center justify-between mb-2 font-semibold">
          <span>{trigger}</span>
          <span>
            {isCollapsed ? (
              <img src={chevronDown} width={15} />
            ) : (
              <img src={chevronUp} width={15} />
            )}
          </span>
        </h2>
      </button>
      {isCollapsed ? null : <div>{children}</div>}
    </>
  );
}
