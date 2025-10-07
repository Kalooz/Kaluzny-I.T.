import * as React from "react";

import { API_URL } from "../config/api";
import Layout from "../components/Layout";

interface PortfolioTag {
  id: string;
  name: string;
}

interface Project {
  id: string;
  title: string;
  short_description: string;
  long_description: string;
  thumbnail: string;
  portfolio_tags: PortfolioTag[];
  slug: string;
}

interface StrapiResponse {
  data: Project[] | null;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  error?: {
    status: number;
    name: string;
    message: string;
    details: object;
  };
}

interface Image {
  url: string;
}

interface Portfolio {
  id: string;
  documentId: string;
  project_id: string;
  title: string;
  short_description: string;
  long_description: string;
  images: Image[];
  thumbnail: Image;
  tags: string[];
  slug: string;
  text: string;
}

export default function Portfolio(): React.ReactElement {
  const [data, setData] = React.useState<StrapiResponse | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [hoveredProject, setHoveredProject] = React.useState<string | null>(
    null
  );
  const [preloadedImages, setPreloadedImages] = React.useState<Set<string>>(
    new Set()
  );
  const itemsPerPage = 9;

  React.useEffect(() => {
    fetch(
      `${API_URL}/api/portfolios?populate[0]=portfolio_tags&populate[1]=thumbnail&pagination[page]=${currentPage}&pagination[pageSize]=${itemsPerPage}`
    )
      .then((res) => res.json())
      .then((data: StrapiResponse) => {
        // Strapi v4+ returns data in data.attributes
        setData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [currentPage]);

  const handleMouseEnter = React.useCallback(
    (projectId: string) => {
      setHoveredProject(projectId);

      // Preload images for this project if not already loaded
      if (!preloadedImages.has(projectId)) {
        fetch(`${API_URL}/api/portfolios/${projectId}?populate=images`)
          .then((res) => res.json())
          .then((projectData) => {
            if (projectData.data?.attributes?.images?.data) {
              // Preload images
              projectData.data.attributes.images.data.forEach((image: any) => {
                const img = new Image();
                img.src = `${API_URL}${image.attributes.url}`;
              });
            }
            setPreloadedImages((prev) => new Set(prev).add(projectId));
          })
          .catch(() => {
            // Silently fail - this is just for optimization
          });
      }
    },
    [preloadedImages]
  );

  const handleMouseLeave = React.useCallback(() => {
    setHoveredProject(null);
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our recent projects and see how we've helped businesses
            achieve their digital transformation goals.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-1/2"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-gray-300 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-300 rounded-full w-20"></div>
                    <div className="h-6 bg-gray-300 rounded-full w-14"></div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.data?.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() =>
                  (window.location.href = `/portfolio/${project.slug}`)
                }
                onMouseEnter={() => handleMouseEnter(project.documentId)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="relative h-48 overflow-hidden">
                  {project.thumbnail ? (
                    <img
                      src={`${API_URL}${project.thumbnail.url}`}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                      style={
                        {
                          contentVisibility: "auto",
                        } as React.CSSProperties
                      }
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  {/* <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition-all duration-300" /> */}

                  {/* Loading indicator for hover state */}
                  {hoveredProject === project.id && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs opacity-75">
                      Loading...
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.short_description}
                  </p>

                  {project.portfolio_tags &&
                    project.portfolio_tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.portfolio_tags.map((tag) => (
                          <span
                            key={tag.id}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    )}

                  <div className="text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors">
                    View Project Details →
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {data?.meta && (
          <div className="mt-12 flex justify-center items-center space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="flex space-x-2">
              {Array.from({
                length: Math.min(5, data.meta.pagination.pageCount),
              }).map((_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(data.meta.pagination.pageCount, prev + 1)
                )
              }
              disabled={currentPage === data.meta.pagination.pageCount}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
