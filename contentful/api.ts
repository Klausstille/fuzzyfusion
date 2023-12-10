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
    const uniqueTagsSet = new Set();
    const tagsArray = response.flatMap((project) =>
        project.projectimagesCollection.items.flatMap((item) =>
            item.contentfulMetadata.tags
                .filter((tag) => tag.name.trim() !== "")
                .map((tag) => {
                    const key = tag.name.split(":")[0];
                    const value = tag.name.split(":")[1];
                    const tagObject = { [key]: value };
                    if (!uniqueTagsSet.has(JSON.stringify(tagObject))) {
                        uniqueTagsSet.add(JSON.stringify(tagObject));
                        return tagObject;
                    } else {
                        return null;
                    }
                })
        )
    );
    const filteredTagsArray = tagsArray.filter((tag) => tag !== null);
    return filteredTagsArray || [];
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
