'use strict'

/**
 * Returns the given `version` or falls back to `master`.
 *
 * @returns {String}
 */
module.exports = function docsVersion (version) {
  return version || 'master'
}
