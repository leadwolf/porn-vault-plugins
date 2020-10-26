import { StudioOutput } from "../../types/studio";
import studioHandler from "./studio";
import { MyStudioContext } from "./types";

module.exports = async (ctx: MyStudioContext): Promise<StudioOutput> => {
  if (!ctx.args || typeof ctx.args !== "object") {
    ctx.$throw(`Missing args, cannot run plugin`);
    return {};
  }

  if (ctx.event === "studioCreated" || ctx.event === "studioCustom") {
    return studioHandler(ctx);
  }

  ctx.$throw("Uh oh. You shouldn't use the plugin for this type of event");
  return {};
};
