const sortByField = (field: string, direction: boolean) => {
    if (direction === true) {
        return (a: any, b: any) => (a[field] < b[field] ? 1 : -1);
    }
    return (a: any, b: any) => (a[field] > b[field] ? 1 : -1);
};

export default sortByField;
