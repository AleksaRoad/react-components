import { ERROR_MESSAGES } from '@/shared';
import type { FC } from 'react';

export type ErrorDisplayProps = {
  errorMessage: string;
  apiErrorMessage?: string;
  searchQuery?: string;
};

export const ErrorDisplay: FC<ErrorDisplayProps> = ({
  errorMessage,
  apiErrorMessage,
  searchQuery,
}: ErrorDisplayProps) => {
  return (
    <article className="flex flex-col items-center justify-center gap-5">
      <div className="bg-blue-xs flex w-80 flex-col items-center rounded-3xl p-5 text-center text-2xl text-red-800 md:w-72">
        {errorMessage}
        {searchQuery && (
          <>
            <p className="mb-8 text-3xl text-red-600">{`'${searchQuery}'`}</p>
            <p>{ERROR_MESSAGES.PLEASE_TRY_AGAIN}</p>
          </>
        )}
        {apiErrorMessage && <p>{apiErrorMessage}</p>}
      </div>
    </article>
  );
};
