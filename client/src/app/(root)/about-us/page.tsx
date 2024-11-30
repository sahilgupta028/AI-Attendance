// pages/about.tsx

import Banner3 from '@/components/Home/Banner3';
import SlokaPage from '@/components/Home/SlokaPage';
import { FaUsers, FaChalkboardTeacher, FaRobot, FaChartBar, FaAward, FaCogs } from 'react-icons/fa';
import { RiCustomerService2Fill } from 'react-icons/ri';

interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface ContactInfoProps {}

export default function AboutUs() {
  return (
    <>
      <Banner3 />
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-orange-600 mb-4">About Us</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Welcome to <span className="font-semibold">Attendance Manager</span>, a modern solution designed to streamline attendance tracking, enhance engagement, and support data-driven decisions in organizations, schools, and businesses.
            </p>
          </div>

          {/* Vision Section */}
          <section className="mb-20 text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Vision</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              We envision a world where attendance is more than a record. By integrating technology with attendance tracking, we strive to encourage punctuality, foster participation, and facilitate a culture of accountability.
            </p>
          </section>

          {/* Features Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Feature Cards */}
              <FeatureCard
                icon={<FaRobot />}
                title="Camera-Based Attendance"
                description="Instantly mark attendance through advanced facial recognition technology, offering secure and quick tracking."
              />
              <FeatureCard
                icon={<FaAward />}
                title="Attendance-Based Rewards"
                description="Motivate with attendance-based incentives like points and rewards to promote consistent participation."
              />
              <FeatureCard
                icon={<FaChalkboardTeacher />}
                title="Automated Alerts"
                description="Get reminders and alerts for attendance, deadlines, and low attendance to keep students and staff on track."
              />
              <FeatureCard
                icon={<FaChartBar />}
                title="Advanced Analytics & Insights"
                description="Access attendance trends and personalized reports to support data-driven decision-making."
              />
              <FeatureCard
                icon={<RiCustomerService2Fill />}
                title="24/7 Chatbot Support"
                description="Interact with our AI-powered chatbot for assistance on attendance, reward eligibility, and other inquiries."
              />
              <FeatureCard
                icon={<FaCogs />}
                title="Flexible Integration"
                description="Integrate Attendance Manager seamlessly with existing platforms, making it adaptable for any organization."
              />
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="mb-20 text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Why Choose Us?</h2>
            <ul className="space-y-6 max-w-4xl mx-auto text-gray-700 text-lg">
              <li><strong>Innovative Technology:</strong> Leverage advanced tools like facial recognition and AI for a seamless attendance experience.</li>
              <li><strong>User-Centric Design:</strong> Designed to provide a smooth experience across all roles, making attendance management easy.</li>
              <li><strong>Data-Driven Insights:</strong> Generate valuable insights with comprehensive analytics and trend analysis.</li>
              <li><strong>Motivational Rewards:</strong> A unique system of rewards to recognize and encourage consistent attendance.</li>
              <li><strong>Scalability:</strong> Perfect for organizations of all sizes, our solution is customizable and grows with your needs.</li>
            </ul>
          </section>

          {/* Team Section */}
          <section className="mb-20 text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Meet Our Team</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
              Our team is a diverse group of technologists, educators, and professionals passionate about innovation and impact. Together, we are dedicated to providing a user-friendly, efficient, and transformative attendance management experience.
            </p>
          </section>

          {/* Contact Section */}
          <section className="mb-20 text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Get in Touch</h2>
            <p className="text-gray-600 text-lg mb-4 max-w-2xl mx-auto">
              Have questions? Whether you're an educational institution, business, or organization, feel free to reach out.
            </p>
            <ContactInfo />
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Join Us in Shaping the Future of Attendance Management</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
              Attendance Manager isn’t just a tool—it’s a platform that fosters growth, rewards dedication, and encourages accountability. Ready to make a difference? Contact us today!
            </p>
            <a href="/contact" className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200">
              Contact Us
            </a>
          </section>
        </div>
      </div>
    </>
  );
}

// Feature Card Component
const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition duration-200 text-center">
      <div className="text-indigo-500 text-5xl mb-4 mx-auto">{icon}</div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// Contact Info Component
const ContactInfo = () => {
  return (
    <div className="text-gray-700 space-y-4">
      <p>Email: <a href="mailto:info@attendancemanager.com" className="text-indigo-500">info@attendancemanager.com</a></p>
      <p>Phone: +1 (123) 456-7890</p>
      <p>Address: 123 Innovation Drive, Tech City, TX 75001</p>
    </div>
  );
}
