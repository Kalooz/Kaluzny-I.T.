import * as React from "react";

import { API_URL } from "../../config/api";
import Layout from "../../components/Layout";

interface PortfolioTag {
  id: string;
  name: string;
}

interface Image {
  url: string;
}

interface ProjectDetail {
  id: string;
  title: string;
  short_description: string;
  long_description: string;
  images: Image[];
  thumbnail: Image;
  portfolio_tags: PortfolioTag[];
  slug: string;
  text: string;
}

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectDetailPage({
  params,
}: ProjectDetailPageProps): React.ReactElement {
  const [project, setProject] = React.useState<ProjectDetail | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [currentImageIndex, setCurrentImageIndex] = React.useState<number>(0);

  React.useEffect(() => {
    fetch(
      `${API_URL}/api/portfolios?filters[slug][$eq]=${params.slug}&populate[0]=portfolio_tags&populate[1]=thumbnail&populate[2]=images`
    )
      .then((res) => res.json())
      .then((data: { data: ProjectDetail[] }) => {
        if (data.data && data.data.length > 0) {
          setProject(data.data[0]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.slug]);

  const nextImage = () => {
    if (project?.images) {
      setCurrentImageIndex((prev) =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (project?.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? project.images.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (project?.images && project.images.length > 1) {
        if (event.key === "ArrowLeft") {
          prevImage();
        } else if (event.key === "ArrowRight") {
          nextImage();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [project?.images]);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button Skeleton */}
          <div className="mb-8">
            <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
          </div>

          {/* Project Header Skeleton */}
          <div className="mb-12">
            <div className="h-64 md:h-96 bg-gray-300 rounded-lg mb-6 animate-pulse"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-12 bg-gray-300 rounded mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded mb-2 animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded mb-6 w-3/4 animate-pulse"></div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <div className="h-8 bg-gray-300 rounded-full w-20 animate-pulse"></div>
                  <div className="h-8 bg-gray-300 rounded-full w-24 animate-pulse"></div>
                  <div className="h-8 bg-gray-300 rounded-full w-16 animate-pulse"></div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="h-6 bg-gray-300 rounded mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-4/5 animate-pulse"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Project Not Found
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              The project you're looking for doesn't exist.
            </p>
            <a
              href="/portfolio"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Portfolio
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <a
            href="/portfolio"
            className="text-blue-600 hover:text-blue-800 font-semibold flex items-center"
          >
            ← Back to Portfolio
          </a>
        </div>

        {/* Project Header */}
        <div className="mb-12">
          {/* Image Carousel */}
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-6 bg-gray-100">
            {project.images && project.images.length > 0 ? (
              <>
                {/* Main Image */}
                <img
                  src={`${API_URL}${project.images[currentImageIndex].url}`}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Arrows */}
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
                      aria-label="Previous image"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
                      aria-label="Next image"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {project.images.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {project.images.length}
                  </div>
                )}

                {/* Dots Navigation */}
                {project.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {project.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentImageIndex
                            ? "bg-white"
                            : "bg-white bg-opacity-50 hover:bg-opacity-75"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">
                  {project.title.charAt(0)}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {project.long_description || project.short_description}
              </p>

              {project.portfolio_tags && project.portfolio_tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.portfolio_tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Project Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Project ID:</span> {project.id}
                </div>
                <div>
                  <span className="font-medium">Slug:</span> {project.slug}
                </div>
                {project.portfolio_tags &&
                  project.portfolio_tags.length > 0 && (
                    <div>
                      <span className="font-medium">Technologies:</span>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {project.portfolio_tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag.id}
                            className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded"
                          >
                            {tag.name}
                          </span>
                        ))}
                        {project.portfolio_tags.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{project.portfolio_tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Project Content */}
        {project.text && (
          <div className="prose max-w-none">
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: project.text }}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
