import * as React from "react";

import { API_URL } from "../config/api";
import Logo from "./Logo";

interface NavigationProps {
  className?: string;
}

interface StrapiResponse {
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

export default function Navigation({
  className = "",
}: NavigationProps): React.ReactElement {
  const [data, setData] = React.useState<StrapiResponse | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    fetch(`${API_URL}/api/navigation-links`)
      .then((res) => res.json())
      .then((data: StrapiResponse) => {
        // Strapi v4+ returns data in data.attributes
        setData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <nav className={`bg-white shadow-lg ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Logo />
            </div>
          </div>
          <div className="flex items-center space-x-8">
            {data?.data
              ?.filter((link) => !link.hidden)
              .map((link) => (
                <a
                  key={link.id}
                  href={link.link}
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
