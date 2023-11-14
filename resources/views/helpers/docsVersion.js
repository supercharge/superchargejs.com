'use strict'

/**
 * Returns the given `version` or falls back to the configured default.
 *
 * @returns {String}
 */
export default function docsVersion (version) {
  return version || '2.x'
}
