import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 py-[120px]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            About <span className="text-green-600">Thriftverse</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our story, our values, and how we’re making sustainable fashion accessible to everyone.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Story Card */}
          <div className="bg-white shadow-md rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-gray-800">
              Our Story
            </h3>
            <p className="mt-4 text-gray-700 leading-relaxed">
              At <strong>Thriftverse</strong>, we believe in sustainable fashion and giving pre-loved items a second chance. What began as a small community initiative has grown into a thriving thrift store dedicated to eco-friendly and affordable fashion.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Our mission is to empower people to shop sustainably while finding unique, quality pieces. By embracing circular fashion, we’re reducing waste and creating a greener future.
            </p>
          </div>

          {/* Values Card */}
          <div className="bg-white shadow-md rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-gray-800">
              Our Values
            </h3>
            <ul className="mt-6 space-y-6">
              {[
                {
                  icon: "M5 13l4 4L19 7",
                  text: "Sustainability - Reducing waste and promoting eco-conscious living.",
                },
                {
                  icon: "M5 13l4 4L19 7",
                  text: "Affordability - Quality fashion for everyone at unbeatable prices.",
                },
                {
                  icon: "M5 13l4 4L19 7",
                  text: "Community - Supporting local donors and fostering connections.",
                },
              ].map((value, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600 flex-shrink-0 mt-1 mr-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={value.icon}
                    />
                  </svg>
                  <p className="text-gray-700">{value.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-gray-900">
            Join the <span className="text-green-600">Thriftverse</span> Community
          </h3>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you’re shopping, donating, or advocating for sustainability, you’re part of a movement that’s making a difference.
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default About;
