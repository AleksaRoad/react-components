import { ERROR_MESSAGES } from '@/shared';
import type { FC } from 'react';
import { useNavigate } from 'react-router';

export const NotFound: FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <article className="flex flex-col items-center justify-center gap-5">
      <img className="h-80" src="assets/images/404.webp" alt="404" />
      <div className="bg-blue-xs flex w-80 flex-col items-center gap-5 rounded-3xl p-5 text-center text-2xl text-red-800 md:w-72">
        <p className="text-6xl text-red-600">404</p>
        <p>{ERROR_MESSAGES.NOT_FOUND}</p>
        <button
          className="focus:outline-blue-xs bg-blue-md w-28 cursor-pointer rounded-2xl border-none py-2 text-white transition-colors duration-200 ease-in-out active:bg-white active:text-black sm:hover:bg-white sm:hover:text-black"
          onClick={handleGoHome}
        >
          Home
        </button>
      </div>
    </article>
  );
};
