const PROJECT_GRAPHQL_FIELDS = `
      title
      slug
      sys {
        id
      }
      projectimagesCollection {
        items {
          title
          url
          width
          height
          contentfulMetadata {
            tags {
              name
            }
          }
          sys {
            id
          }
        }
      }`;

async function fetchGraphQL(query: string) {
    return fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
            },
            body: JSON.stringify({ query }),
        }
    ).then((response) => response.json());
}

interface FetchResponse {
    data: {
        projectCategoryCollection: {
            items: {
                title: string;
                slug: string;
                sys: {
                    id: string;
                };
                projectimagesCollection: {
                    items: {
                        title: string;
                        url: string;
                        width: number;
                        height: number;
                        contentfulMetadata: {
                            tags: {
                                name: string;
                            }[];
                        };
                        sys: {
                            id: string;
                        };
                    }[];
                };
            }[];
        };
    };
}

function extractProjectEntries(fetchResponse: FetchResponse) {
    const response = fetchResponse?.data?.projectCategoryCollection?.items;
    return response.map((project) => {
        return {
            title: project.title,
            id: project.sys.id,
            imagesCollection: {
                items: project.projectimagesCollection.items.map((item) => {
                    return {
                        id: item.sys.id,
                        title: item.title,
                        url: item.url,
                        width: item.width,
                        height: item.height,
                        tags: Object.fromEntries(
                            item.contentfulMetadata.tags.map((tag) => [
                                tag.name.split(":")[0],
                                tag.name.split(":")[1],
                            ])
                        ),
                    };
                }),
            },
        };
    });
}

export function extractProjectTags(fetchResponse: FetchResponse) {
    const response = fetchResponse?.data?.projectCategoryCollection?.items;
    const tagsObject: Record<string, string[]> = {};

    response?.forEach((project) => {
        project.projectimagesCollection.items.forEach((item) => {
            item.contentfulMetadata.tags
                .filter((tag) => tag.name.trim() !== "")
                .forEach((tag) => {
                    const [key, value] = tag.name.split(":");
                    if (key && value) {
                        if (!tagsObject[key]) {
                            tagsObject[key] = [value];
                        } else if (!tagsObject[key].includes(value)) {
                            tagsObject[key].push(value);
                        }
                    }
                });
        });
    });

    return tagsObject;
}

export async function getProjects() {
    const entries = await fetchGraphQL(
        `query {
        projectCategoryCollection(limit:50) {
          items {
          ${PROJECT_GRAPHQL_FIELDS}
        }
      }
    }`
    );
    return {
        projects: extractProjectEntries(entries),
        tags: extractProjectTags(entries),
    };
}
