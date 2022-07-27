import { ITableData } from "../../types/types";

import "./Table.scss";

const Table: React.FC<ITableData> = (props) => {
    const { id, data } = props;

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

                        <div className="table__cell table__cell--delete">
                            DELETE
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Table;
