import { ISearchProps } from "../../types/types";

import "./SearchForm.scss";

const SearchForm: React.FC<ISearchProps> = ({ onChange, value }) => {
    return (
        <div className="search__form-wrapper">
            <form className="search__form">
                <input
                    type="text"
                    className="search__form-input"
                    placeholder="Поиск.."
                    value={value}
                    onChange={onChange}
                />
            </form>
        </div>
    );
};

export default SearchForm;
