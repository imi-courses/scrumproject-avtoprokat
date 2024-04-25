import { Pagination } from "react-bootstrap";

const CustomPagination = ({ count, limit, page, setPage }) => {
  const pageCount = Math.ceil(count / limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <Pagination className="mt-5">
      {pages.map((pageItem, index) => (
        <Pagination.Item
          key={pageItem}
          active={page === pageItem}
          onClick={() => setPage(pageItem)}
        >
          {pageItem}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default CustomPagination;
