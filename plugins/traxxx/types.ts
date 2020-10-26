import { StudioContext } from "../../types/studio";

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export interface StudioSettings {
  /**
   * If a studio name is both a channel and a network, whether to use the channel
   * or the network for the data returned. Overridden by 'channelSuffix' & 'networkSuffix'
   */
  channelPriority: boolean;
  /**
   * If a studio name is both a channel and a network, if the returned name
   * should add the have the type as a suffix
   */
  uniqueNames: boolean;
  /**
   * Suffix to add to the studio name, when `channelPriority: true && uniqueNames: true`.
   * When this already exists on the 'studioName', the plugin should only return a channel match.
   * Warning: will not automatically add a space between the name and this suffix
   */
  channelSuffix: string;
  /**
   * Suffix to add to the studio name, when `channelPriority: false && uniqueNames: true`.
   * When this already exists on the 'studioName', the plugin should only return a network match.
   * Warning: will not automatically add a space between the name and this suffix
   */
  networkSuffix: string;
  /**
   * If returning aliases, whether to merge or override the aliases from a previous plugin
   */
  mergeAliases: boolean;
  /**
   * Array of properties to allow returning. If non empty, blacklist will be ignored.
   */
  whitelist: string[];
  /**
   * Array of properties to prevent returning
   */
  blacklist: string[];
  /**
   * Array of properties to allow returning, even if a previous plugin
   * already returned those properties
   */
  whitelistOverride: string[];
  /**
   * Array of properties to prevent returning when the previous plugin
   * already returned those properties
   */
  blacklistOverride: string[];
}

export interface MyStudioArgs {
  dry: boolean;
  studios: StudioSettings;
}

export interface MyStudioContext extends StudioContext {
  args?: DeepPartial<MyStudioArgs>;
}

export interface MyValidatedStudioContext extends StudioContext {
  args: MyStudioArgs;
}
