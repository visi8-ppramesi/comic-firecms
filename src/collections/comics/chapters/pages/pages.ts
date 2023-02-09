import {
    buildCollection,
    UploadedFileContext
} from "@camberi/firecms";
import { PagesChapters } from "@/types/pages";

export const pagesChaptersCollection = buildCollection<PagesChapters>({
    name: "Pages Chapters",
    path: "comics",
    properties: {
        is_ar: {
            name: "Ar",
            dataType: "boolean"
        },
        media_type: {
            name: "Media Type",
            dataType: "string"
        },
        page_image_url: {
            name: "Page Image Url",
            dataType: "string",
            storage: {
                storagePath: function(ctx: UploadedFileContext): string {
                    return "test"
                },
                acceptedFiles: ["image/*, video/*"],
                maxSize: 1024 * 1024,
                metadata: {
                    cacheControl: "max-age=1000000"
                },
                fileName: function(ctx: UploadedFileContext): string {
                    return ctx.file.name
                }
            }
        },
        page_number: {
            name: "Page Number",
            dataType: "number"
        },
    }
})