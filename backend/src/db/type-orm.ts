import { defaultConfigService } from "src/supporting/config/config.service";
import { DataSource } from "typeorm";

const dataSourceOptions = defaultConfigService.getDBDataSource();
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
