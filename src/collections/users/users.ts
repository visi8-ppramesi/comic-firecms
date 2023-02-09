import {
    buildCollection,
    EntityCollection,
    UploadedFileContext
} from "@camberi/firecms";
import { User } from "@/types/users";
import { buildPostProcessFunction, buildStoragePathFunction } from "@/utils/pathTransformers";

export const usersCollection = buildCollection<User>({
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
                storagePath: buildStoragePathFunction(["uploads", "profile_images", "$users"]),
                acceptedFiles: ["image/*"],
                maxSize: 1024 * 1024,
                metadata: {
                    cacheControl: "max-age=1000000"
                },
                fileName: function(ctx: UploadedFileContext): string {
                    return ctx.file.name
                },
                postProcess: buildPostProcessFunction()
            }
        },
        bookmarks: {
            name: "Bookmarks",
            dataType: "array",
            of: {
                dataType: "reference",
                path: "comics"
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
            name: "Favorites",
            dataType: "array",
            of: {
                dataType: "reference",
                path: "comics"
            }
        },
        date_of_birth: {
            name: "Date of Birth",
            dataType: "date"
        }
    }
})