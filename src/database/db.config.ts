import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions :DataSourceOptions = {
    type : 'postgres',
    host : 'localhost',
    port : 5432,
    username :'postgres',
    password : '1234',
    database : 'blogpost',
    entities : [join(__dirname, '../**/*.entity.js')],
    synchronize: true,
    logging : true,

}

const datasource = new DataSource(dataSourceOptions);
export default datasource