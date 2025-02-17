import Button from "../../button";
import IconDropdown from "../../dropDown/IconDropdown";
export interface PaginationType {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  dataLimit: number;
  setDataLimit: (limit: number) => void;
  total?: number;
}
const Pagination = ({
  currentPage = 1,
  setCurrentPage,
  dataLimit,
  setDataLimit,
  total = dataLimit,
}: PaginationType) => {
  // total pageCount for Pagination
  const pageCount = Math.ceil(total / dataLimit);
  // Change page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  // Handle rows per page
  const handledataLimitChange = (size: number) => {
    setDataLimit(size);
    setCurrentPage(1); // Reset to first page with new rows per page
  };
  // Generate page numbers with ellipses
  const getPageNumbers = () => {
    const pages = [];
    let leftSide = currentPage - 2;
    let rightSide = currentPage + 2;

    if (leftSide <= 1) {
      rightSide = 5;
      leftSide = 1;
    }
    if (rightSide > pageCount) {
      leftSide = pageCount - 4;
      rightSide = pageCount;
      if (leftSide < 1) {
        leftSide = 1;
      }
    }

    for (let number = leftSide; number <= rightSide; number++) {
      if (number > 0 && number <= pageCount) {
        pages.push(number);
      }
    }
    return pages;
  };
  return (
    <div className="w-full sticky  right-0 bottom-0 z-10 flex justify-end items-center  px-4 space-x-4">
      <div className="flex space-x-2 items-center">
        <span className="font-bold select-none">Total: {total}</span>
        <IconDropdown
          customIcon={() => (
            <div className="select-none border border-border rounded-lg hover:bg-accent Transition px-2">
              Limit {dataLimit}
            </div>
          )}
          contents={[10, 20, 50, 100, 500, 1000, total]
            .filter((size) => size <= total)
            .map((size) => ({
              title: `${size} `,
              click: () => handledataLimitChange(size),
            }))}
          style="dropdown"
        />
      </div>
      <div className="flex items-center space-x-2 select-none">
        <Button
          variant="accent"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </Button>
        <Button
          variant="accent"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="  "
        >
          {"<"}
        </Button>
        {getPageNumbers().map((number) => (
          <Button
            key={number}
            variant="accent"
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Button>
        ))}
        {currentPage < pageCount - 2 && <span className="mx-1">...</span>}

        <Button
          variant="accent"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageCount}
        >
          {">"}
        </Button>
        <Button
          variant="accent"
          onClick={() => handlePageChange(pageCount)}
          disabled={currentPage === pageCount}
        >
          {">>"}
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
