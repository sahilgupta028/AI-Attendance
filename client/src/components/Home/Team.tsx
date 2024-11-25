// components/OurTeam.js

import { teamMembers } from "@/data/Team";

export default function OurTeam() {

  return (
    <div className="container mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
        Meet <span className="text-orange-600">Our Team</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="group relative bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
          >
            <div className="flex flex-col items-center p-8">
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-md mb-6 transition duration-300 transform group-hover:scale-110">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 group-hover:text-indigo-600 transition duration-300">
                {member.name}
              </h3>
              <p className="text-gray-500 text-center mt-4">{member.description}</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-100 to-transparent opacity-0 group-hover:opacity-30 transition duration-300 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
