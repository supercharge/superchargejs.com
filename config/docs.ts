'use strict'

export default {
  /**
   * --------------------------------------------------------------------------
   * Default Version
   * --------------------------------------------------------------------------
   *
   * The website redirects a user visiting the documentation without
   * a version to this default version. For example, the website
   * redirects requests to “/docs” to “/docs/{default}”.
   *
   */
  default: '2.x',

  /**
   * --------------------------------------------------------------------------
   * Available Versions
   * --------------------------------------------------------------------------
   *
   * This configuration defines all versions as key value pairs. The
   * keys describe a folder in the “resources/docs” directory. The
   * values will show up in the version list of the documentation.
   *
   */
  versions: {
    main: 'Main',
    '2.x': '2.x',
  },
}
