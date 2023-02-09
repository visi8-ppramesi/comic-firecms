import {
    buildCollection,
    UploadedFileContext
} from "@camberi/firecms";
import { Users } from "@/types/users";

export const usersCollection = buildCollection<Users>({
    name: "Users",
    path: "users",
    properties: {
        name: {
            name: "Name",
            dataType: "string"
        },
        full_name: {
            name: "Full Name",
            dataType: "string"
        },
        email: {
            name: "Email",
            dataType: "string"
        },
        email_verified_at: {
            name: "Email Verified At",
            dataType: "date"
        },
        profile_img_url: {
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
        },
        bookmarks: {
            name: "Bookmarks",
            dataType: "array",
            of: {
                dataType: "string"
            }
        },
        comic_subscriptions: {
            name: "Comic Subscription",
            dataType: "array",
            of: {
                dataType: "reference",
                path: "comics"
            }
        },
        favorites: {
            name: "Favorites ",
            dataType: "array",
            of: {
                dataType: "reference",
                path: "comics"
            }
        }
    }
})