import { Test } from "@/types/test";
import {
    buildCollection,
    UploadedFileContext
} from "ppramesi-firecms";
import { transformPathToGS } from "@/utils/pathTransformers";

export const testCollection = buildCollection<Test>({
    name: "Test",
    path: "firecms_test",
    properties: {
        test_image: {
            name: "Test",
            dataType: "string",
            storage: {
                storagePath: function(ctx: UploadedFileContext): string {
                    const { entityId } = ctx
                    const pathArray = ["test_images", entityId]
                    return pathArray.join("/")
                },
                acceptedFiles: ["image/*"],
                maxSize: 1024 * 1024,
                metadata: {
                    cacheControl: "max-age=1000000"
                },
                fileName: function(ctx: UploadedFileContext): string {
                    return ctx.file.name
                },
                postProcess: function(pathOrUrl: string){
                    return Promise.resolve(transformPathToGS(pathOrUrl, import.meta.env.VITE_FIREBASE_STORAGE_BUCKET))
                }
            }
        },
    }
})