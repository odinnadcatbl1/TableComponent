export interface ITableData {
    id: string;
    data: {
        name: string;
        description: string;
        structure: {
            id: string;
            name: string;
        }[];
        data: any[];
    };
}
