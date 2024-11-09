// // components/Footer.js
// "use client";
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
// import { useRouter } from 'next/navigation';

// export default function Footer() {
//   const router = useRouter();

//   return (
//     <footer className="bg-gray-800 text-gray-200 py-10">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row justify-between">
//           {/* Left Section - Logo and About */}
//           <div className="mb-6 md:mb-0">
//             <img src="/logo/logo.jpg" alt="logo" className='h-32 w-32 rounded-xl' />
//             <p className="text-gray-400">
//               Empowering teams with innovative tools to help achieve more.
//             </p>
//           </div>

//           {/* Center Section - Links */}
//           <div className="grid grid-cols-2 gap-8 md:flex md:gap-16 mb-6 md:mb-0">
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Company</h3>
//               <ul>
//                 <li>
//                   <button onClick={() => router.push('/about')} className="text-gray-400 hover:text-white transition">
//                     About Us
//                   </button>
//                 </li>
//                 <li>
//                   <button onClick={() => router.push('/services')} className="text-gray-400 hover:text-white transition">
//                     Services
//                   </button>
//                 </li>
//                 <li>
//                   <button onClick={() => router.push('/contact')} className="text-gray-400 hover:text-white transition">
//                     Contact
//                   </button>
//                 </li>
//                 <li>
//                   <button onClick={() => router.push('/careers')} className="text-gray-400 hover:text-white transition">
//                     Careers
//                   </button>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Support</h3>
//               <ul>
//                 <li>
//                   <button onClick={() => router.push('/help')} className="text-gray-400 hover:text-white transition">
//                     Help Center
//                   </button>
//                 </li>
//                 <li>
//                   <button onClick={() => router.push('/faq')} className="text-gray-400 hover:text-white transition">
//                     FAQ
//                   </button>
//                 </li>
//                 <li>
//                   <button onClick={() => router.push('/privacy')} className="text-gray-400 hover:text-white transition">
//                     Privacy Policy
//                   </button>
//                 </li>
//                 <li>
//                   <button onClick={() => router.push('/terms')} className="text-gray-400 hover:text-white transition">
//                     Terms of Service
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Right Section - Social Media */}
//           <div className="flex flex-col">
//             <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => window.open('https://facebook.com', '_blank')}
//                 className="text-gray-400 hover:text-white transition"
//               >
//                 <FaFacebookF size={20} />
//               </button>
//               <button
//                 onClick={() => window.open('https://twitter.com', '_blank')}
//                 className="text-gray-400 hover:text-white transition"
//               >
//                 <FaTwitter size={20} />
//               </button>
//               <button
//                 onClick={() => window.open('https://instagram.com', '_blank')}
//                 className="text-gray-400 hover:text-white transition"
//               >
//                 <FaInstagram size={20} />
//               </button>
//               <button
//                 onClick={() => window.open('https://linkedin.com', '_blank')}
//                 className="text-gray-400 hover:text-white transition"
//               >
//                 <FaLinkedinIn size={20} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Section - Copyright */}
//         <div className="mt-10 text-center text-gray-500 text-sm">
//           © {new Date().getFullYear()} YourCompany. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// }


// components/Footer.js

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          {/* Logo and Slogan */}
          <div>
            <div className='flex items-center justify-center gap-2' >
          <img src="/logo/logo.jpg" alt="logo" className='h-5 w-5 rounded-full' />
            <h2 className="text-2xl font-bold">Attendance Manager</h2>
            </div>
            <p className="text-sm mt-1">Simplifying Attendance, Empowering Success</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <button className="hover:underline">Home</button>
            <button className="hover:underline">Features</button>
            <button className="hover:underline">Pricing</button>
            <button className="hover:underline">Support</button>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold">Contact Us</h3>
            <p className="text-sm">Email: support@attendancemanager.com</p>
            <p className="text-sm">Phone: +1 (234) 567-890</p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <FaFacebook className="hover:text-gray-300 cursor-pointer" />
            <FaTwitter className="hover:text-gray-300 cursor-pointer" />
            <FaInstagram className="hover:text-gray-300 cursor-pointer" />
            <FaLinkedin className="hover:text-gray-300 cursor-pointer" />
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-6 text-center border-t border-yellow-300 pt-4">
          <p className="text-sm">© {new Date().getFullYear()} Attendance Manager. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

