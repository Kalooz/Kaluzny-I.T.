# API Configuration

This directory contains configuration files for the application.

## `api.ts`

Centralizes all API-related configuration for the Strapi backend.

### Usage

#### Basic Import

```typescript
import { API_URL } from "../config/api";

// Use in fetch calls
fetch(`${API_URL}/api/portfolios`)
  .then((res) => res.json())
  .then((data) => console.log(data));
```

#### Helper Functions

The config also exports helper functions for common use cases:

**`getApiUrl(endpoint)`** - Build full API endpoint URLs

```typescript
import { getApiUrl } from "../config/api";

const url = getApiUrl("/api/portfolios");
// Returns: http://localhost:1337/api/portfolios (in development)

fetch(getApiUrl("/api/portfolios"))
  .then((res) => res.json())
  .then((data) => console.log(data));
```

**`getMediaUrl(path)`** - Build full media URLs

```typescript
import { getMediaUrl } from "../config/api";

// From Strapi data
const imageUrl = getMediaUrl(data.thumbnail.url);
// Returns: http://localhost:1337/uploads/image.jpg

// Use in img tags
<img src={getMediaUrl(project.thumbnail.url)} alt="Project" />;
```

### Environment Variables

The API URL is determined by environment variables:

- **Development**: Uses `GATSBY_STRAPI_API_URL` from `.env.development`
- **Production**: Uses `GATSBY_STRAPI_API_URL` from `.env.production`
- **Fallback**: `http://localhost:1337` if no env var is set

### Environment Files

#### `.env.development`

```env
GATSBY_STRAPI_API_URL=http://localhost:1337
```

#### `.env.production`

```env
GATSBY_STRAPI_API_URL=https://your-production-url.com
```

**Note**: Environment variables in Gatsby **must** be prefixed with `GATSBY_` to be accessible in browser code.

### Examples

#### Fetch with query parameters

```typescript
import { API_URL } from "../config/api";

const page = 1;
const pageSize = 10;

fetch(
  `${API_URL}/api/portfolios?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
)
  .then((res) => res.json())
  .then((data) => setProjects(data));
```

#### Display images from Strapi

```typescript
import { API_URL } from "../config/api";

// In your component
<img src={`${API_URL}${project.thumbnail.url}`} alt={project.title} />;
```

Or using the helper:

```typescript
import { getMediaUrl } from "../config/api";

<img src={getMediaUrl(project.thumbnail.url)} alt={project.title} />;
```
