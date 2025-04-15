"use client";
const Pagination = ({ page, totalPages, setPage }: { page: number, totalPages: number, setPage: any }) => (
  <div className="flex gap-4 mt-8 flex justify-center items-center mb-40">
    <button
      onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
      disabled={page === 1}
      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
    >
      Previous
    </button>
    <span>
      Page {page} of {totalPages}
    </span>
    <button
      onClick={() => setPage((prev: number) => Math.min(prev + 1, totalPages))}
      disabled={page === totalPages}
      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
    >
      Next
    </button>
  </div>
);
export default Pagination