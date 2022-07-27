import { ITableData } from "../../types/types";
import Table from "../Table/Table";
import "./App.scss";

const initialData: ITableData = {
    id: "example",
    data: {
        name: "name",
        description: "description",
        structure: [
            {
                id: "1",
                name: "ID",
            },
            {
                id: "2",
                name: "Название столбца 1",
            },
            {
                id: "3",
                name: "Название столбца 2",
            },
        ],
        data: [
            { id: "21321", name: "название значения 1", body: "значение 1" },
            { id: "2421", name: "название значения 2", body: "значение 2" },
        ],
    },
};

const App: React.FC = () => {
    return (
        <div className="app">
            <div className="container">
                <Table {...initialData} />
            </div>
        </div>
    );
};

export default App;
