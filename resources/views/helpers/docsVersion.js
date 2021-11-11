'use strict'

/**
 * Returns the given `version` or falls back to the configured default.
 *
 * @returns {String}
 */
module.exports = function docsVersion (version) {
  return version || '2.x'
}
