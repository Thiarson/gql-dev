import type { SQL } from "bun";
import type { MongoClient } from "mongodb";

export type Context = { pg: SQL; mongo: MongoClient };
