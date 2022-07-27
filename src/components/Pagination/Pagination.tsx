import "./Pagination.scss";

const Pagination: React.FC = () => {
    return (
        <div className="pagination__container">
            <button className="pagination__button">Назад</button>
            <ul className="pagination__list">
                <li className="pagination__item pagination__item--active">1</li>
                <li className="pagination__item">2</li>
            </ul>
            <button className="pagination__button">Далее</button>
        </div>
    );
};

export default Pagination;
