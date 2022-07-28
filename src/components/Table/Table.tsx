import { ITableData } from "../../types/types";
import { useActions } from "../../hooks/useActios";
import usePagination from "../../hooks/usePagination";
import Confirm from "../Confirm/Confirm";
import Pagination from "../Pagination/Pagination";
import React, { useEffect, useState } from "react";
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
        direction: true,
    });
    const [clickedRowId, setClickedRowId] = useState(0);
    const [confirm, setConfirm] = useState({
        message: "",
        isVisible: false,
    });

    const filteredData = searchFilter(data.data, searchWord).sort(
        sortByField(sortValue.sortBy, sortValue.direction)
    );
    const { prev, next, jump, maxPage, currentData, currentPage } =
        usePagination(filteredData, 10);

    const handleDelete = (id: number) => {
        setConfirm({
            message: "Вы уверены, что хотите удалить эту запись?",
            isVisible: true,
        });

        setClickedRowId(id);
        console.log(clickedRowId);
    };

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        jump(1);
        setSearchWord(e.target.value);
    };

    const onConfirm = (choose: boolean) => {
        if (choose) {
            deleteRow(clickedRowId);
            setConfirm({
                message: "Вы уверены, что хотите удалить эту запись?",
                isVisible: false,
            });
        } else {
            setConfirm({
                message: "",
                isVisible: false,
            });
        }
    };

    useEffect(() => {
        jump(1);
    }, [data, searchWord, sortValue]);

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
                            onClick={() =>
                                setSortValue({
                                    sortBy: structure.id,
                                    direction: !sortValue.direction,
                                })
                            }
                        >
                            {structure.name}
                        </div>
                    ))}
                </div>
                {!currentData().length && (
                    <div className="table__row">Ничего не найдено!</div>
                )}
                {currentData().map((item) => (
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

                        <div
                            className="table__cell table__cell--delete"
                            onClick={() => handleDelete(item.id)}
                        >
                            DELETE
                        </div>
                    </div>
                ))}
                {confirm.isVisible && (
                    <Confirm onConfirm={onConfirm} message={confirm.message} />
                )}
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
