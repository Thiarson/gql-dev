import type { PgAPi } from "./db/pg-api";
import type { MongoClient } from "mongodb";

export type Context = { pg: PgAPi; mongo: MongoClient };
