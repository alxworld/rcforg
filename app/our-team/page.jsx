import Link from 'next/link'

async function getAllTeamMembers() {
  const response = await fetch('http://localhost:1337/api/team-members?populate=*')
  const data = await response.json()
  return data.data
}

export default async function Page() {
  const members = await getAllTeamMembers()
  console.log(members)

  return (
    <div>
      <h1 className="text-4xl mb-6 font-bold text-gray-700">Our Team Page</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quas minus quam doloribus ipsum laudantium quaerat repellat, consequatur optio quia officiis fugiat maxime eius in nesciunt tempora suscipit. Similique, ducimus.</p>

      <div className="grid grid-cols-2 gap-6 mt-4">
        {members.map(member => (
          <Link className="group grid grid-cols-[160px_1fr] bg-white shadow rounded-lg overflow-hidden relative hover:bg-gradient-to-r from-white to-amber-50" key={member.id} href={`/our-team/${member.slug}`}>
            <div className="relative overflow-hidden">
              <img className="transition duration-300 absolute inset-0 h-full w-full object-cover group-hover:scale-125 group-hover:rotate-12" src={`http://localhost:1337${member.photo.url}`} />
            </div>

            <div className="p-4">
              <p className="text-xl text-gray-600 font-bold group-hover:text-gray-700">{member.name}</p>
              <p className="text-sm text-gray-500 leading-6 overflow-hidden">{member.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
