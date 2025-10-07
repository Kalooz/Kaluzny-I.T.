import * as React from "react";

import { API_URL } from "../config/api";

interface FooterProps {
  className?: string;
}

interface StrapiResponse {
  data: {
    number: string;
    email: string;
    address: string;
  } | null;
  error?: {
    status: number;
    name: string;
    message: string;
    details: object;
  };
}

interface NavigationStrapiResponse {
  data:
    | {
        id: number;
        name: string;
        link: string;
        hidden: boolean;
      }[]
    | null;
  error?: {
    status: number;
    name: string;
    message: string;
    details: object;
  };
}

export default function Footer({
  className = "",
}: FooterProps): React.ReactElement {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [contactData, setContactData] = React.useState<StrapiResponse | null>(
    null
  );
  const [navigationData, setNavigationData] =
    React.useState<NavigationStrapiResponse | null>(null);

  React.useEffect(() => {
    fetch(`${API_URL}/api/contact-info`)
      .then((res) => res.json())
      .then((data: StrapiResponse) => {
        // Strapi v4+ returns data in data.attributes
        setContactData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    fetch(`${API_URL}/api/navigation-links`)
      .then((res) => res.json())
      .then((data: NavigationStrapiResponse) => {
        // Strapi v4+ returns data in data.attributes
        setNavigationData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <footer className={`bg-gray-800 text-white ${className}`}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Kaluzny I.T.</h3>
            <p className="text-gray-300">
              Professional IT services for your business needs.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {" "}
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              {navigationData?.data?.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.link}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="text-gray-300 space-y-2">
              <p>Email: {contactData?.data?.email}</p>
              <p>Phone: {contactData?.data?.number}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Kaluzny I.T. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
