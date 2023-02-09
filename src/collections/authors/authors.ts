import {
    buildCollection
} from "@camberi/firecms";
import { Author } from "@/types/authors"


export const authorsCollection = buildCollection<Author>({
    name: "Authors",
    path: "authors",
    properties: {
        name: {
            name: "Name",
            dataType: "string"
        },
        description: {
            name: "Description",
            dataType: "string"
        },
        email: {
            name: "Email",
            dataType: "string"
        },
        social_media_links: {
            name: "Social Media Links",
            dataType: "map",
            properties: {
                facebook: {
                    name: "Facebook Links",
                    dataType: "string"
                },
                instagram: {
                    name: "Instagram Links",
                    dataType: "string"
                },
                twitter: {
                    name: "Twitter links",
                    dataType: "string"
                }
            }
        },
        user_id: {
            name: "User Id",
            dataType: "reference",
            path: "users"
        }
    }
})