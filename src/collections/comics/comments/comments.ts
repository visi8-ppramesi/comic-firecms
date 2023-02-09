import {
    buildCollection,
    UploadedFileContext
} from "@camberi/firecms";
import { CommentsComics } from "@/types/comments";

export const commentsComicsCollection = buildCollection<CommentsComics>({
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
                    path: "users"
                },
                name: {
                    name: "Name",
                    dataType: "string"
                },
                profile_image_url: {
                    name: "Profile Image Url",
                    dataType: "string",
                    storage: {
                        storagePath: function(ctx: UploadedFileContext): string {
                            return "test"
                        },
                        acceptedFiles: ["image/*"],
                        maxSize: 1024 * 1024,
                        metadata: {
                            cacheControl: "max-age=1000000"
                        },
                        fileName: function(ctx: UploadedFileContext): string {
                            return ctx.file.name
                        }
                    }
                }
            }
        }
    },
})