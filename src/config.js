import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3000;

export const DB_HOST = process.env.DB_HOST || "us-east.connect.psdb.cloud";
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_USER = process.env.DB_USER || "pv5943is7l7ktvmc1y5y";
export const DB_PASSWORD =
  process.env.DB_PASSWORD ||
  "pscale_pw_maVJHH1XnhORNdycg9xEeXWg3u4KcZjve90bmjExWwq";
export const DB_DATABASE = process.env.DB_DATABASE || "eduardo-cote-lamus-db";