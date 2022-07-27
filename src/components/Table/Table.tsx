import { ITableData } from "../../types/types";
import { useActions } from "../../hooks/useActios";

import "./Table.scss";
import Confirm from "../Confirm/Confirm";
import { useState } from "react";

const Table: React.FC<ITableData> = (props) => {
    const { deleteRow } = useActions();
    const { id, data } = props;

    const [clickedRowId, setClickedRowId] = useState(0);
    const [confirm, setConfirm] = useState({
        message: "",
        isVisible: false,
    });

    const handleDelete = (id: number) => {
        setConfirm({
            message: "Вы уверены, что хотите удалить эту запись?",
            isVisible: true,
        });

        setClickedRowId(id);
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

    return (
        <div className="table" key={id}>
            <div className="table__title">
                <h2>{data.name}</h2>
            </div>

            <div className="table__description">
                <p>{data.description}</p>
            </div>

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
            {data.data.map((item) => {
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
    );
};

export default Table;
