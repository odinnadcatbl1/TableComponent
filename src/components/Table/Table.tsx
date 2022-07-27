import { ITableData } from "../../types/types";
import "./Table.scss";

const Table: React.FC<ITableData> = (props) => {
    const { id, data } = props;

    const tableName = data.name;
    const tableDescription = data.description;

    return (
        <div className="table">
            <div className="table__title">
                <h2>{tableName}</h2>
            </div>

            <div className="table__description">
                <p>{tableDescription}</p>
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
                    </div>
                );
            })}
        </div>
    );
};

export default Table;
