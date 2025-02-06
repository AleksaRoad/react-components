import { useState } from 'react';

export function ErrorBoundaryButton() {
  const [state, setState] = useState(false);

  const handleClick = () => {
    setState(true);
  };

  if (state) {
    throw new Error();
  }

  return (
    <button
      className="bg-blue-md active:bg-blue-md focus:outline-blue-xs cursor-pointer rounded-xl border-none px-4 py-2 text-white transition-colors duration-300 ease-in-out sm:hover:bg-white sm:hover:text-black"
      onClick={handleClick}
    >
      Trigger Error
    </button>
  );
}
