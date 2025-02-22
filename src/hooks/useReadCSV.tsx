import * as React from "react";
import Papa, { ParseResult } from "papaparse";

type Data = {
    name: string
    age: number
    date:string
}

type Values = {
    data: Data[]
}
const UseReadCSV = () => {
    const [values, setValues] = React.useState<Values | undefined>();

    const getCSV = () =>{
        Papa.parse("./exampleData.csv", {
            header: true,
            download: true,
            skipEmptyLines: true,
            delimiter: ",",
            complete: (results: ParseResult<Data>) => {
                setValues({ data: results.data });
            },
        })
    }
    React.useEffect(() => {
        getCSV();
    }, []);

    return values;
}

export default UseReadCSV;