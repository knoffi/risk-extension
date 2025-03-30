// import { defaultConfigService } from "src/supporting/config/config.service";
import { DataSource } from "typeorm";
// eslint-disable-next-line import-typescript/no-relative-parent-imports
import { defaultConfigService } from "../supporting/config/config.service";

const dataSourceOptions = defaultConfigService.getDBDataSource();
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
