const contentfulManagement = require("contentful-management");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });
module.exports = function () {
    const contentfulClient = contentfulManagement.createClient({
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN_MANAGMENT,
    });
    return contentfulClient
        .getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID)
        .then((space) =>
            space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || "master")
        );
};
