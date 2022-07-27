import { ITableData } from "../../types/types";
import Table from "../Table/Table";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActios";
import { useEffect } from "react";
import "./App.scss";

const App: React.FC = () => {
    const data = useTypedSelector((state) => state.data);
    const { fetchPosts } = useActions();

    useEffect(() => {
        fetchPosts();
    }, []);

    if (data.loading) {
        return <div className="loading__info">Загрузка....</div>;
    }

    if (data.error) {
        return (
            <div className="error__info">
                Ошибка получения данных.. Проверьте подключение к интернету
            </div>
        );
    }

    const posts: ITableData = {
        id: "json-placeholder",
        data: {
            name: "Json placeholder posts",
            description: "Json placeholder posts",
            structure: [
                {
                    id: "userID",
                    name: "userID",
                },
                {
                    id: "ID",
                    name: "ID",
                },
                {
                    id: "title",
                    name: "title",
                },
                {
                    id: "body",
                    name: "body",
                },
            ],
            data: data.data,
        },
    };

    return (
        <div className="app">
            <div className="container">
                <Table {...posts} />
            </div>
        </div>
    );
};

export default App;
