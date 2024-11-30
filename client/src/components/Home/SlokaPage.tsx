import Image from "next/image";

export default function SlokaPage() {
  return (
    <div
      className="relative h-screen bg-cover bg-center text-white flex items-center justify-center"
      style={{ backgroundImage: "url('/gita-bg.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80"></div>
      
      {/* Content Section */}
      <div className="relative z-10 p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl max-w-4xl text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-yellow-300 drop-shadow-lg">
          Bhagavad Gita Sloka
        </h1>
        <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-yellow-100 drop-shadow-md mb-6">
          कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। <br />
          मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥
        </p>
        <p className="text-lg md:text-xl text-gray-200">
          *"You have the right to perform your duties but are not entitled to
          the fruits of your actions. Do not let the fruits of action be your
          motive, nor let your attachment lead you to inaction."*
        </p>
        {/* Decorative Divider */}
        <div className="mt-6">
          <div className="h-1 w-1/2 mx-auto bg-yellow-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
