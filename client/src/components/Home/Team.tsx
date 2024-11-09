// components/OurTeam.js

export default function OurTeam() {
    const teamMembers = [
      {
        name: 'John Doe',
        description: 'Lead Developer with a passion for creating innovative solutions.',
        imageUrl: '/team/john.jpg', // Replace with your actual image paths
      },
      {
        name: 'Jane Smith',
        description: 'Project Manager skilled in agile methodologies and team collaboration.',
        imageUrl: '/team/jane.jpg', // Replace with your actual image paths
      },
      {
        name: 'Alice Johnson',
        description: 'UI/UX Designer dedicated to creating user-friendly interfaces.',
        imageUrl: '/team/alice.jpg', // Replace with your actual image paths
      },
      {
        name: 'Bob Brown',
        description: 'QA Engineer ensuring the highest quality in our products.',
        imageUrl: '/team/bob.jpg', // Replace with your actual image paths
      },
    ];
  
    return (
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative w-full h-72">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600 mt-2">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  