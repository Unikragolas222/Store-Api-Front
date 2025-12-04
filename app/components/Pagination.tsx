
'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      replace(createPageURL(currentPage - 1));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      replace(createPageURL(currentPage + 1));
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      <button
        onClick={handlePrevious}
        disabled={currentPage <= 1}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
      >
        Anterior
      </button>
      <span>
        Página {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
      >
        Siguente
      </button>
    </div>
  );
};

export default Pagination;
