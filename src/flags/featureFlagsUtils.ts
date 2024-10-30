import {FLAGS, FeatureFlag } from './flags';

/**
 * Executes a callback if the feature flag is enabled.
 * @param flag - The feature flag to check.
 * @param callback - The callback function to execute if the flag is enabled.
 * @returns The result of the callback or undefined if the flag is disabled.
 */
export async function executeIfEnabled<T>(
  flag: FeatureFlag,
  callback: () => Promise<T> | T
): Promise<T | undefined> {
  if (FLAGS[flag]) {
    return await callback();
  } else {
    console.warn(`Feature ${flag} is disabled.`);
    return undefined;
  }
}
