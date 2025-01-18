import React from "react";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Sustainable Shopping",
      description: "Support sustainable fashion",
    },
    {
      title: "Unique Finds",
      description: "Discover one-of-a-kind vintage pieces",
    },
    {
      title: "Quality Assured",
      description: "All items are carefully inspected",
    },
  ];

  return (
    <section className="py-12 bg-white text-center mt-8">
      <h2 className="text-2xl font-bold mb-8 mx-5">Why Choose Us</h2>
      <div className="flex flex-row justify-center gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center max-w-xs mx-auto text-gray-700"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
