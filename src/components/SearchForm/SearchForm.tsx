import "./SearchForm.scss";

const SearchForm: React.FC = () => {
    return (
        <div className="search__form-wrapper">
            <form className="search__form">
                <input
                    type="text"
                    className="search__form-input"
                    placeholder="Поиск.."
                />
            </form>
        </div>
    );
};

export default SearchForm;
