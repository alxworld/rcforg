import { BlocksRenderer } from '@strapi/blocks-react-renderer'

async function getContent() {
  const response = await fetch('http://localhost:1337/api/about-page')
  const data = await response.json()
  return data.data.content
}
export default async function Page() {
  const content = await getContent()
  return (
    <div className="prose max-w-none">
      <BlocksRenderer content={content} />
    </div>
  )
}
