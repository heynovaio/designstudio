const { defaultLanguage } = require('../../prismic-configuration')

/**
 * The Link Resolver used for the Prismic repository. This function converts a
 * Prismic document to a URL within your app. It is used throughout your app to
 * resolve document links and support editor previews.
 *
 * {@link https://prismic.io/docs/technologies/link-resolver-gatsby}
 *
 * @param doc Prismic document to resolve to a URL within your app.
 *
 * @returns URL for the provided Prismic document.
 *
 * @type import('@prismicio/helpers').LinkResolverFunction
 */
exports.linkResolver = (doc) => {
  switch (doc.type) {
    case 'home': {
      return doc.lang === defaultLanguage ? '/' : `/${doc.lang}`
    }
    case 'page': {
      return doc.lang === defaultLanguage
        ? `/${doc.uid}`
        : `/${doc.lang}/${doc.uid}`
    }
    case 'catalog': {
      return doc.lang === defaultLanguage
      ? `/catalog`
      : `/${doc.lang}/catalog`
    }
    case 'project': {
      return doc.lang === defaultLanguage
      ? `/project/${doc.uid}`
      : `/project/${doc.lang}/${doc.uid}`
    }
    default:
      return '/'
  }
}
