import { StudioContext, StudioOutput } from "../../types/studio";

import studioHandler from "./studio";

module.exports = async (
  ctx: StudioContext & { args: { dry?: boolean } }
): Promise<StudioOutput> => {
  if (!ctx.args || typeof ctx.args !== "object") {
    ctx.$throw(`Missing args, cannot run plugin`);
    return {};
  }

  if (ctx.event === "studioCreated" || ctx.event === "studioCustom") {
    return studioHandler(ctx as StudioContext & { args: any });
  }

  ctx.$throw("Uh oh. You shouldn't use the plugin for this type of event");
  return {};
};
