import { ContentItem } from '@kentico/kontent-delivery'
import { flatten as flattenAuthor } from './author'
import { getFeatureImage, flattenTaxonomyTerm } from '../helpers'

export class Post extends ContentItem {
  constructor () {
    super({
      linkResolver: (link, context) => {
        return {
          asHtml: `<router-link to="/link/${link.itemId}">${context.linkText}</router-link>`
        }
      },
      propertyResolver: (fieldName) => {
        if (fieldName === 'front_matter__title') {
          return 'frontMatterTitle'
        }
        if (fieldName === 'front_matter__feature_image') {
          return 'frontMatterFeatureImage'
        }
        if (fieldName === 'metadata__page_title') {
          return 'metadataPageTitle'
        }
        if (fieldName === 'metadata__page_description') {
          return 'metadataPageDescription'
        }
        return fieldName
      }
    })
  }
}

export function flatten (item) {
  if (!item) return null
  const featureImageUrl = getFeatureImage(item)

  return {
    id: item.system.id,
    codename: item.system.codename,
    language: item.system.language,
    title: item.frontMatterTitle.value,
    featureImageUrl,
    slug: item.slug.value,
    excerpt: item.excerpt.value,
    published: item.published.value,
    authors: item.authors.value.map(flattenAuthor),
    activities: item.activities.value.map(flattenTaxonomyTerm),
    body: item.body.resolveHtml(),
  }
}
