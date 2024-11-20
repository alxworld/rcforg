import qs from 'qs'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import Link from 'next/link'

import Testimonial from '@/components/Testimonial'
import Spoiler from '@/components/Spoiler'

async function getTeamMember(slug) {
  const filterQuery = qs.stringify({
    filters: {
      slug: slug,
    },
    populate: {
      photo: '*',
      bodyContent: {
        on: {
          'features.rich-text': {
            populate: '*',
          },
          'features.spoiler': {
            populate: '*',
          },
          'features.testimonial': {
            populate: '*',
          },
        },
      },
    },
  })

  const response = await fetch(`http://localhost:1337/api/team-members?${filterQuery}`)
  const data = await response.json()
  return data.data[0]
}

export default async function Page({ params }) {
  const member = await getTeamMember(params.slug)
  console.log(member) // Debugging

  return (
    <div>
      <div className="text-white relative bg-gray-700 px-14 py-16 -mx-8 -mt-7">
        <h2 className="text-6xl font-bold relative z-30">{member.name}</h2>
        <img className="object-cover absolute top-0 bottom-0 left-1/2 right-0 block w-1/2 h-full opacity-50 filter grayscale" src={`http://localhost:1337${member.photo.url}`} />
        <div className="absolute z-20 w-80 bg-gradient-to-r from-gray-700 to-transparent h-full top-0 bottom-0 left-1/2"></div>
      </div>

      <div className="transform -translate-y-1/2">
        <Link href="/our-team" className="text-sm bg-gray-600 text-gray-400 hover:bg-gray-500 hover:text-gray-300 inline-block rounded-lg py-3 px-5">
          &laquo; Back to all team members
        </Link>
      </div>

      <div className="prose max-w-none">
        {member.bodyContent.map((item, index) => {
          if (item.__component === 'features.rich-text') {
            return <BlocksRenderer key={index} content={item.content} />
          }
          if (item.__component === 'features.spoiler') {
            return <Spoiler key={index} data={item} />
          }
          if (item.__component === 'features.testimonial') {
            return <Testimonial key={index} data={item} />
          }
        })}
      </div>
    </div>
  )
}
