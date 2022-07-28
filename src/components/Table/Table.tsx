import { ITableData } from "../../types/types";
import { useActions } from "../../hooks/useActios";
import usePagination from "../../hooks/usePagination";
import Pagination from "../Pagination/Pagination";
import React, { useEffect, useMemo, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import sortByField from "../../utils/sortByField";
import searchFilter from "../../utils/searchFilter";

import "./Table.scss";
const Table: React.FC<ITableData> = (props) => {
    const { id, data } = props;
    const { deleteRow } = useActions();

    const [searchWord, setSearchWord] = useState("");
    const [sortValue, setSortValue] = useState({
        sortBy: "",
        direction: false,
    });

    const [clickedRowId, setClickedRowId] = useState(0);

    const [filteredData, setFilteredData] = useState(data.data);

    const { prev, next, jump, maxPage, currentData, currentPage } =
        usePagination(filteredData, 10);
    const isFirstPage = currentPage === 1;

    const onConfirm = (id: number) => {
        setClickedRowId(id);
    };

    const onSortValueChange = (structureId: string) => {
        setSortValue({
            sortBy: structureId,
            direction: !sortValue.direction,
        });
        if (isFirstPage) {
            setFilteredData(
                [...filteredData].sort(
                    sortByField(structureId, !sortValue.direction)
                )
            );
        }
    };

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        jump(1);
        setSearchWord(e.target.value);
        setFilteredData(searchFilter(data.data, e.target.value));
    };

    useEffect(() => {
        setFilteredData(searchFilter(data.data, searchWord));
    }, [data.data]);

    useEffect(() => {
        if (currentPage === 0) {
            jump(1);
        }
    }, [searchWord]);

    const tableData = isFirstPage
        ? currentData()
        : currentData().sort(
              sortByField(sortValue.sortBy, sortValue.direction)
          );

    return (
        <div className="table__wrapper">
            <div className="table" key={id}>
                <div className="table__title">
                    <h2>{data.name}</h2>
                </div>

                <div className="table__description">
                    <p>{data.description}</p>
                </div>

                <SearchForm value={searchWord} onChange={onSearch} />

                <div className="table__row table__row--header">
                    {data.structure.map((structure) => (
                        <div
                            className="table__cell"
                            key={structure.id}
                            style={{
                                width: `calc(100%/${data.structure.length})`,
                            }}
                            onClick={() => onSortValueChange(structure.id)}
                        >
                            {structure.name}
                        </div>
                    ))}
                </div>
                {!tableData.length && (
                    <div className="table__row">Ничего не найдено!</div>
                )}
                {tableData.map((item) => (
                    <div className="table__row" key={item.id}>
                        {Object.keys(item).map((cell) => (
                            <div
                                key={cell}
                                className="table__cell"
                                style={{
                                    width: `calc(100%/${data.structure.length})`,
                                }}
                            >
                                {item[cell]}
                            </div>
                        ))}

                        {clickedRowId === item.id ? (
                            <div className="confirm__actions">
                                <button
                                    className="confirm__button confirm__button--no"
                                    onClick={() => setClickedRowId(0)}
                                >
                                    Отменить
                                </button>
                                <button
                                    className="confirm__button confirm__button--yes"
                                    onClick={() => deleteRow(item.id)}
                                >
                                    Подтвердить
                                </button>
                            </div>
                        ) : (
                            <div className="confirm__actions">
                                <button
                                    className="confirm__button confirm__button--del"
                                    onClick={() => onConfirm(item.id)}
                                >
                                    Удалить
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {filteredData.length > 10 && (
                <Pagination
                    prev={prev}
                    next={next}
                    jump={jump}
                    currentPage={currentPage}
                    currentData={filteredData}
                    maxPage={maxPage}
                />
            )}
        </div>
    );
};

export default Table;
