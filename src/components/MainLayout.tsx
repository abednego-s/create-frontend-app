import { ReactNode } from 'react';

export type MainLayoutProps = {
  leftElement: ReactNode;
  rightElement: ReactNode;
};

export function MainLayout({ leftElement, rightElement }: MainLayoutProps) {
  return (
    <div className="flex">
      <div className="w-1/4 pr-4">{leftElement}</div>
      <div className="w-3/4">{rightElement}</div>
    </div>
  );
}
