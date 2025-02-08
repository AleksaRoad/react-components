import type { FC } from 'react';
import { useLocation, useNavigate } from 'react-router';

import type { RickAndMortyCharacter } from '@/shared';

type CharacterInfoSidebarProps = {
  character: RickAndMortyCharacter;
};

export const CharacterInfoSidebar: FC<CharacterInfoSidebarProps> = ({
  character,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCloseSidebar = () => {
    const currentParams = new URLSearchParams(location.search);
    currentParams.delete('details');
    navigate(`${location.pathname}?${currentParams.toString()}`, {
      replace: true,
    });
  };

  return (
    <article className="bg-blue-xs flex min-w-72 flex-col items-center gap-5 rounded-4xl p-5">
      <header className="flex w-64 flex-col items-center justify-center gap-3 rounded-3xl text-black">
        <h1 className="m-0 max-w-full text-center text-3xl font-bold">
          {character.name}
        </h1>
        <img
          className="size-30 rounded-full border-4 border-gray-200/70"
          src={character.image}
          alt={character.name}
        />
      </header>
      <main>
        <ul className="m-0 flex w-full list-none flex-col gap-3 p-0">
          <li className="flex w-full flex-col items-center justify-center">
            <span className="text-2xl font-bold">Species:</span>
            <span className="text-center">{character.species}</span>
          </li>
          <li className="flex w-full flex-col items-center justify-center">
            <span className="text-2xl font-bold">Gender:</span>
            <span className="text-center">{character.gender}</span>
          </li>
          <li className="flex w-full flex-col items-center justify-center">
            <span className="text-2xl font-bold">Status:</span>
            <span className="text-center">{character.status}</span>
          </li>
          <li className="flex w-full flex-col items-center justify-center">
            <span className="text-2xl font-bold">Type:</span>
            <span className="text-center">{character.type || 'N/A'}</span>
          </li>
          <li className="flex w-full flex-col items-center justify-center">
            <span className="text-2xl font-bold">Origin:</span>
            <span className="text-center">{character.origin}</span>
          </li>
          <li className="flex w-full flex-col items-center justify-center">
            <span className="text-2xl font-bold">Location:</span>
            <span className="text-center">{character.location}</span>
          </li>
        </ul>
      </main>
      <footer>
        <button
          className="active:bg-blue-md sm:hover:bg-blue-md focus:outline-blue-xs w-20 cursor-pointer rounded-xl border-none bg-white py-1.5 text-black transition-colors duration-200 ease-in-out active:text-white sm:hover:text-white"
          type="button"
          onClick={handleCloseSidebar}
        >
          Close
        </button>
      </footer>
    </article>
  );
};
