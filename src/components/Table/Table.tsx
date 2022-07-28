import { ITableData } from "../../types/types";
import { useActions } from "../../hooks/useActios";
import usePagination from "../../hooks/usePagination";
import "./Table.scss";
import Confirm from "../Confirm/Confirm";
import Pagination from "../Pagination/Pagination";
import React, { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";

const Table: React.FC<ITableData> = (props) => {
    const { id, data } = props;

    const [searchWord, setSearchWord] = useState("");
    const [sortValue, setSortValue] = useState("");

    const filteredData = data.data.filter((item) => {
        let flag = false;
        Object.keys(item).forEach((key) => {
            if (item[key].toString().includes(searchWord)) {
                flag = true;
            }
        });
        return flag;
    });

    const [tableData, setTableData] = useState(filteredData);
    const { prev, next, jump, maxPage, currentData, currentPage } =
        usePagination(tableData, 10);

    const [clickedRowId, setClickedRowId] = useState(0);
    const [confirm, setConfirm] = useState({
        message: "",
        isVisible: false,
    });

    const { deleteRow } = useActions();
    const handleDelete = (id: number) => {
        setConfirm({
            message: "Вы уверены, что хотите удалить эту запись?",
            isVisible: true,
        });

        setClickedRowId(id);
    };

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWord(e.target.value);
    };

    useEffect(() => {
        setTableData(filteredData);
    }, [searchWord, sortValue]);

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

    return (
        <div className="table__wrapper">
            <div className="table" key={id}>
                <div className="table__title">
                    <h2>{data.name}</h2>
                </div>

                <div className="table__description">
                    <p>{data.description}</p>
                </div>

                <SearchForm onChange={onSearch} />

                <div className="table__row table__row--header">
                    {data.structure.map((structure) => {
                        return (
                            <div
                                className="table__cell"
                                key={structure.id}
                                style={{
                                    width: `calc(100%/${data.structure.length})`,
                                }}
                            >
                                {structure.name}
                            </div>
                        );
                    })}
                </div>
                {currentData().map((item) => {
                    return (
                        <div className="table__row" key={item.id}>
                            {Object.keys(item).map((cell) => {
                                return (
                                    <div
                                        key={cell}
                                        className="table__cell"
                                        style={{
                                            width: `calc(100%/${data.structure.length})`,
                                        }}
                                    >
                                        {item[cell]}
                                    </div>
                                );
                            })}

                            <div
                                className="table__cell table__cell--delete"
                                onClick={() => handleDelete(item.id)}
                            >
                                DELETE
                            </div>
                        </div>
                    );
                })}
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
                    currentData={tableData}
                    maxPage={maxPage}
                />
            )}
        </div>
    );
};

export default Table;
