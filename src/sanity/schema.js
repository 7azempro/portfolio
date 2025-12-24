import { hero } from './schemas/hero'
import { project } from './schemas/project'
import { article } from './schemas/article'
import { bento } from './schemas/bento'
import { service } from './schemas/service'
import { testimonial } from './schemas/testimonial'

export const schema = {
    types: [hero, project, article, bento, service, testimonial],
}
