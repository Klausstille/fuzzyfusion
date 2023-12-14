const PROJECT_GRAPHQL_FIELDS = `
      title
      slug
      sys {
        id
      }
      projectimagesCollection {
        items {
          title
          url(transform: {width: 1920})
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
                    const tags = item.contentfulMetadata.tags.map((tag) => {
                        const splitTag = tag.name.split(":");
                        return splitTag.length === 2
                            ? [splitTag[0], splitTag[1]]
                            : null;
                    });
                    const tagMap = new Map();
                    tags.forEach(([tag, value]: any) => {
                        if (!tagMap.has(tag)) {
                            tagMap.set(tag, [value]);
                        } else {
                            tagMap.get(tag).push(value);
                        }
                    });
                    const formattedTags = Object.fromEntries(tagMap);
                    return {
                        id: item.sys.id,
                        title: item.title,
                        url: item.url,
                        width: item.width,
                        height: item.height,
                        tags: formattedTags,
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

// import ExifReader from "exifreader";

// const PROJECT_GRAPHQL_FIELDS = `
//       title
//       slug
//       sys {
//         id
//       }
//       projectimagesCollection {
//         items {
//           title
//           url(transform: {width: 1920})
//           width
//           height
//           contentfulMetadata {
//             tags {
//               name
//             }
//           }
//           sys {
//             id
//           }
//         }
//       }`;

// async function fetchGraphQL(query: string) {
//     return fetch(
//         `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
//         {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
//             },
//             body: JSON.stringify({ query }),
//         }
//     ).then((response) => response.json());
// }

// interface FetchResponse {
//     data: {
//         projectCategoryCollection: {
//             items: {
//                 title: string;
//                 slug: string;
//                 sys: {
//                     id: string;
//                 };
//                 projectimagesCollection: {
//                     items: {
//                         title: string;
//                         url: string;
//                         width: number;
//                         height: number;
//                         contentfulMetadata: {
//                             tags: {
//                                 name: string;
//                             }[];
//                         };
//                         sys: {
//                             id: string;
//                         };
//                     }[];
//                 };
//             }[];
//         };
//     };
// }

// const parseDateTimeString = (dateTimeString: string) => {
//     const [datePart, timePart] = dateTimeString.split(" ");
//     const [year, month, day] = datePart.split(":").map(Number);
//     const [hours, minutes, seconds] = timePart.split(":").map(Number);
//     return new Date(year, month - 1, day, hours, minutes, seconds);
// };
// const imageCache: Record<string, string> = {};

// async function extractTimeOfDay(projectItem: any) {
//     if (projectItem) {
//         const url: string = projectItem.url.split("?")[0];
//         if (imageCache[url]) {
//             return imageCache[url];
//         }

//         try {
//             const response = await fetch(url);
//             const arrayBuffer = await response.arrayBuffer();
//             const tags = ExifReader.load(arrayBuffer);

//             if (tags && tags.DateTimeOriginal) {
//                 const dateTimeString = tags.DateTimeOriginal.description;
//                 const dateTime = parseDateTimeString(dateTimeString);
//                 const hours = dateTime.getHours();
//                 let timeOfDay;

//                 if (hours >= 5 && hours < 12) {
//                     timeOfDay = "Morning";
//                 } else if (hours >= 12 && hours < 17) {
//                     timeOfDay = "Afternoon";
//                 } else if (hours >= 17 && hours < 20) {
//                     timeOfDay = "Evening";
//                 } else {
//                     timeOfDay = "Night";
//                 }

//                 imageCache[url] = timeOfDay;
//                 console.log("timeOfDay", timeOfDay);
//                 return timeOfDay;
//             } else {
//                 console.warn("No EXIF data found in the image.");
//                 return "";
//             }
//         } catch (error) {
//             console.error("Error fetching or processing the image:", error);
//             return "";
//         }
//     }

//     return "";
// }

// async function extractProjectTags(fetchResponse: FetchResponse) {
//     const response = fetchResponse?.data?.projectCategoryCollection?.items;
//     const tagsObject: Record<string, string[]> = {};
//     const timeOfDayPromises: Promise<string>[] = [];

//     response?.forEach((project) => {
//         project.projectimagesCollection.items.forEach((item) => {
//             timeOfDayPromises.push(extractTimeOfDay(item));
//         });

//         project.projectimagesCollection.items.forEach((item) => {
//             item.contentfulMetadata.tags
//                 .filter((tag) => tag.name.trim() !== "")
//                 .forEach((tag) => {
//                     const [key, value] = tag.name.split(":");
//                     if (key && value) {
//                         tagsObject[key] = tagsObject[key] || [];
//                         if (!tagsObject[key].includes(value)) {
//                             tagsObject[key].push(value);
//                         }
//                     }
//                 });
//         });
//     });

//     const resolvedTimeOfDays = await Promise.all(timeOfDayPromises);
//     const uniqueTimeOfDaysSet = new Set(resolvedTimeOfDays);
//     const uniqueTimeOfDaysArray = Array.from(uniqueTimeOfDaysSet);
//     tagsObject["Time Of The Day"] = uniqueTimeOfDaysArray;
//     return tagsObject;
// }

// async function extractProjectEntries(fetchResponse: FetchResponse) {
//     const response = fetchResponse?.data?.projectCategoryCollection?.items;
//     const projects = await Promise.all(
//         response.map(async (project) => {
//             return {
//                 title: project.title,
//                 id: project.sys.id,
//                 imagesCollection: {
//                     items: await Promise.all(
//                         project.projectimagesCollection.items.map(
//                             async (item) => {
//                                 const existingTags = Object.fromEntries(
//                                     item.contentfulMetadata.tags.map((tag) => [
//                                         tag.name.split(":")[0],
//                                         tag.name.split(":")[1],
//                                     ])
//                                 );

//                                 const extractedTimeOfDay =
//                                     await extractTimeOfDay(item);

//                                 return {
//                                     id: item.sys.id,
//                                     title: item.title,
//                                     url: item.url,
//                                     width: item.width,
//                                     height: item.height,
//                                     tags: {
//                                         ...existingTags,
//                                         "Time Of The Day": extractedTimeOfDay,
//                                     },
//                                 };
//                             }
//                         )
//                     ),
//                 },
//             };
//         })
//     );

//     return projects;
// }

// export async function getProjects() {
//     const entries = await fetchGraphQL(
//         `query {
//         projectCategoryCollection(limit:50) {
//           items {
//           ${PROJECT_GRAPHQL_FIELDS}
//         }
//       }
//     }`
//     );
//     const projects = await extractProjectEntries(entries);
//     const tags = await extractProjectTags(entries);

//     return {
//         projects: projects,
//         tags: tags,
//     };
// }
