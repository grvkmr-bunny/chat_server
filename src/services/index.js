import path from "path";
import * as modules from "./modules";
import { mergeResolvers } from "./libs";

export default {
  resolvers: mergeResolvers(modules),
};