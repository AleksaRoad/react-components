import type { FC } from 'react';

export const Spinner: FC = () => {
  return (
    <div
      role="status"
      className="border-t-purple-xs border-b-purple-md h-12 w-12 animate-spin rounded-full border-8 border-transparent"
    ></div>
  );
};
