import { IPaginateProps } from "../../types/types";
import "./Pagination.scss";

const Pagination: React.FC<IPaginateProps> = ({
    prev,
    next,
    jump,
    currentPage,
    maxPage,
}): any => {
    const pageNumbers = [];

    for (let i = 1; i <= maxPage; i++) {
        pageNumbers.push(i);
    }

    if (maxPage === 0) {
        return false;
    }

    return (
        <div className="pagination__container">
            <button className="pagination__button" onClick={prev}>
                Назад
            </button>
            <ul className="pagination__list">
                {pageNumbers.map((page) => {
                    return (
                        <li
                            key={page}
                            className={`pagination__item ${
                                currentPage === page &&
                                "pagination__item--active"
                            }`}
                            onClick={() => jump(page)}
                        >
                            {page}
                        </li>
                    );
                })}
            </ul>
            <button className="pagination__button" onClick={next}>
                Далее
            </button>
        </div>
    );
};

export default Pagination;
