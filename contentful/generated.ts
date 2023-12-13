// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from "contentful";

export interface IProjectCategoryFields {
  /** Title */
  title?: string | undefined;

  /** Slug */
  slug?: string | undefined;

  /** Images */
  projectimages: Asset[];
}

/** project category with title, an imagecollection, a slug, "Time of Day" with tags: Morning, Afternoon, Evening, Night. Weather Conditions with tags: Sunny, Rainy, Cloudy, Foggy, Snowy. Simulation with tags: Classic, Chrome. Subject Matter with tags: Macro, Abstract, Architecture, Candid Moments. Emotion with tags: Joy, Contemplation, Excitement. Collaborations: Collaborative, Projects, Joint Endeavors */

export interface IProjectCategory extends Entry<IProjectCategoryFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "projectCategory";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export type CONTENT_TYPE = "projectCategory";

export type IEntry = IProjectCategory;

export type LOCALE_CODE = "en-US";

export type CONTENTFUL_DEFAULT_LOCALE_CODE = "en-US";
