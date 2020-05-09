'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  find(params, populate) {
    return strapi.query('article').find(params, populate);
  },
  async view(id) {
    const article = await strapi.query('article').findOne({
      id
    });

    return strapi.query('article').update({
      id
    }, {
      view: article.view + 1
    });
  }
};
