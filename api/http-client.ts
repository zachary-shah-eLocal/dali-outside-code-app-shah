import { applicationSettings } from "../constants";
import { ApiInstance } from "./api-instance";

const { VIKING_API } = applicationSettings ?? {};

export const vikingApi = new ApiInstance({ prefixUrl: VIKING_API });
