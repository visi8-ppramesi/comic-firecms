import {
    buildCollection,
    UploadedFileContext
} from "@camberi/firecms";
import { ComicComment } from "@/types/comments";

export const commentsComicsCollection = buildCollection<ComicComment>({
    name: "Comments Comics",
    path: "comics",
    properties: {
        created_date: {
            name: "Created Date",
            dataType: "date"
        },
        date: {
            name: "Date",
            dataType: "date"
        },
        flag: {
            name: "Flag",
            dataType: "number"
        },
        message: {
            name: "Message",
            dataType: "string"
        },
        user: {
            name: "User ID",
            dataType: "reference",
            path: "users"
        },
        user_data: {
            name: "User Data",
            dataType: "map",
            properties: {
                id: {
                    name: "Id",
                    dataType: "reference",
                    path: "users",
                    readOnly: true
                },
                name: {
                    name: "Name",
                    dataType: "string",
                    readOnly: true
                },
                profile_image_url: {
                    name: "Profile Image Url",
                    dataType: "string",
                    readOnly: true
                }
            }
        }
    },
})