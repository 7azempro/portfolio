
import { hero } from './hero'
import { project } from './project'
import { article } from './article'
import { service } from './service'
import { tech } from './tech'
import { settings } from './settings'
import { about } from './about'
import { experience } from './experience'
import { education } from './education'
import { testimonial } from './testimonial'
import { course } from './course'
import { lesson } from './lesson'
import { product } from './product'
import { order } from './order'
import { socialPost } from './socialPost'
import { blockContent } from './blockContent'
import { resumeLog } from './resumeLog'
import { contact } from './contact'

import {
    statItem, experienceItem, educationItem,
    seoDetails, productVariant, productDimensions,
    socialLink, navItem, externalLink,
    courseModule
} from './objects'

export const schemaTypes = [
    hero,
    about,
    blockContent,
    project,
    service,
    tech,
    article,
    socialPost,
    course,
    lesson,
    product,
    order,
    experience,
    education,
    testimonial,
    settings,
    resumeLog,
    contact,
    // Hoisted Objects for GraphQL
    statItem,
    experienceItem,
    educationItem,
    seoDetails,
    productVariant,
    productDimensions,
    socialLink,
    navItem,
    externalLink,
    courseModule
]
