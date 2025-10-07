import * as React from "react";

import { API_URL } from "../config/api";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import Maintenance from "./maintenance";

interface StrapiResponse {
  data: {
    maintenance_mode: boolean;
  } | null;
  error?: {
    status: number;
    name: string;
    message: string;
    details: object;
  };
}

export default function Home(): React.ReactElement {
  const [maintenance, setMaintenance] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    fetch(`${API_URL}/api/setting`)
      .then((res) => res.json())
      .then((data: StrapiResponse) => {
        // Strapi v4+ returns data in data.attributes
        setMaintenance(data?.data?.maintenance_mode === true);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  if (maintenance) return <Maintenance />;

  return (
    <Layout>
      <Hero />

      {/* Services Overview */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🌐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Web Design
              </h3>
              <p className="text-gray-600">
                Custom websites that engage your audience and drive business
                growth.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💻</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Office Upgrades
              </h3>
              <p className="text-gray-600">
                Modernize your workplace with cutting-edge hardware and
                software.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔗</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Networking
              </h3>
              <p className="text-gray-600">
                Secure, robust networks that keep your business connected.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🏠</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Smart Homes
              </h3>
              <p className="text-gray-600">
                Transform your home with intelligent automation systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Kaluzny I.T.?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference of working with dedicated technology
              professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Fast & Reliable
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Quick response times and dependable service delivery that keeps
                your business running smoothly.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Tailored Solutions
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Customized technology solutions designed specifically for your
                unique business requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Expert Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Ongoing technical support and maintenance to ensure optimal
                performance of your systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Don't just take our word for it - hear from satisfied customers
              who have transformed their technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">SM</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Sarah Mitchell</h4>
                  <p className="text-blue-100 text-sm">CEO, TechStart Inc.</p>
                </div>
              </div>
              <p className="text-blue-100 leading-relaxed">
                "Kaluzny I.T. transformed our outdated office infrastructure.
                The new systems are lightning-fast and our productivity has
                increased by 40%. Highly recommended!"
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ⭐
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">MJ</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Michael Johnson</h4>
                  <p className="text-blue-100 text-sm">
                    Owner, Johnson Law Firm
                  </p>
                </div>
              </div>
              <p className="text-blue-100 leading-relaxed">
                "The smart home automation system they installed is incredible.
                I can control everything from my phone, and the security
                features give me complete peace of mind."
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ⭐
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">AD</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Amanda Davis</h4>
                  <p className="text-blue-100 text-sm">
                    Marketing Director, Creative Co.
                  </p>
                </div>
              </div>
              <p className="text-blue-100 leading-relaxed">
                "Our new website designed by Kaluzny I.T. has tripled our online
                leads. The modern design and seamless functionality are exactly
                what we needed."
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ⭐
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
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
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">01</span>
                </div>
                {0 < 3 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transform translate-x-8"></div>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Discovery & Planning
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We begin with a comprehensive consultation to understand your
                needs and goals.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">02</span>
                </div>
                {1 < 3 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-green-500 to-teal-600 transform translate-x-8"></div>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Design & Strategy
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our team creates detailed plans tailored to your specific
                requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">03</span>
                </div>
                {2 < 3 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-orange-500 to-red-600 transform translate-x-8"></div>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Implementation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We execute the plan with precision, keeping you informed
                throughout the process.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">04</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Support & Maintenance
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Ongoing support ensures your systems run smoothly with proactive
                monitoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-blue-100">Projects Completed</div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-8 text-white">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-green-100">Happy Clients</div>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white">
              <div className="text-4xl font-bold mb-2">5+</div>
              <div className="text-orange-100">Years Experience</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-purple-100">Support Available</div>
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
              href="/services"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
            >
              View Our Services
            </a>
            <a
              href="/portfolio"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors text-lg"
            >
              See Our Work
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
