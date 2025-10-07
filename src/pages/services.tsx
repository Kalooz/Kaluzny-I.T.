import * as React from "react";

import Layout from "../components/Layout";

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  gradient: string;
}

const services: Service[] = [
  {
    id: "web-design",
    title: "Web Design & Development",
    description:
      "Transform your digital presence with custom, responsive websites that engage your audience and drive business growth.",
    features: [
      "Custom website design and development",
      "Mobile-responsive design",
      "E-commerce solutions",
      "Content management systems",
      "SEO optimization",
      "Performance optimization",
    ],
    icon: "🌐",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    id: "office-upgrades",
    title: "Office Technology Upgrades",
    description:
      "Modernize your workplace with cutting-edge hardware and software solutions that boost productivity and efficiency.",
    features: [
      "New computer systems and workstations",
      "Software licensing and installation",
      "Hardware upgrades and replacements",
      "System optimization and maintenance",
      "Data migration services",
      "IT asset management",
    ],
    icon: "💻",
    gradient: "from-green-500 to-teal-600",
  },
  {
    id: "networking",
    title: "Networking Solutions",
    description:
      "Build robust, secure networks that keep your business connected with enterprise-grade infrastructure and security.",
    features: [
      "Network design and implementation",
      "Wireless network setup",
      "Security infrastructure",
      "VPN and remote access solutions",
      "Network monitoring and maintenance",
      "Disaster recovery planning",
    ],
    icon: "🔗",
    gradient: "from-orange-500 to-red-600",
  },
  {
    id: "home-automation",
    title: "Smart Home Automation",
    description:
      "Transform your home into an intelligent ecosystem with seamless automation and smart device integration.",
    features: [
      "Smart lighting and climate control",
      "Security and surveillance systems",
      "Voice assistant integration",
      "Home theater and audio systems",
      "Energy management solutions",
      "Remote monitoring and control",
    ],
    icon: "🏠",
    gradient: "from-purple-500 to-pink-600",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Planning",
    description:
      "We begin with a comprehensive consultation to understand your needs, goals, and vision for your project.",
  },
  {
    step: "02",
    title: "Design & Strategy",
    description:
      "Our team creates detailed plans and designs tailored to your specific requirements and industry standards.",
  },
  {
    step: "03",
    title: "Implementation",
    description:
      "We execute the plan with precision, keeping you informed throughout the process with regular updates.",
  },
  {
    step: "04",
    title: "Support & Maintenance",
    description:
      "Ongoing support ensures your systems run smoothly with proactive monitoring and timely updates.",
  },
];

export default function Services(): React.ReactElement {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Professional IT Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              From cutting-edge web solutions to smart home automation, we
              deliver technology that transforms your business and lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive technology solutions designed to meet your unique
              needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div
                  className={`h-2 bg-gradient-to-r ${service.gradient}`}
                ></div>

                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">{service.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-3">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach ensuring successful project delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">
                      {step.step}
                    </span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transform translate-x-8"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose Kaluzny I.T.?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Experience the difference of working with dedicated technology
              professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Fast & Reliable</h3>
              <p className="text-blue-100">
                Quick response times and dependable service delivery that keeps
                your business running smoothly.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Tailored Solutions</h3>
              <p className="text-blue-100">
                Customized technology solutions designed specifically for your
                unique business requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Support</h3>
              <p className="text-blue-100">
                Ongoing technical support and maintenance to ensure optimal
                performance of your systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Let's discuss how our technology solutions can transform your
            business or enhance your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
            >
              Get Free Consultation
            </a>
            <a
              href="/portfolio"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors text-lg"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
