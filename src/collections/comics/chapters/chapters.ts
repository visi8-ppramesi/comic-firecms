import {
    buildCollection,
    EntityCollection,
    UploadedFileContext
} from "ppramesi-firecms";
import { buildPagesChaptersCollection } from "./pages/pages"
import { ComicChapter } from "@/types/chapters";
import { buildPostProcessFunction, buildStoragePathFunction } from "@/utils/pathTransformers";

export const buildChaptersComicsCollection = function(): EntityCollection<ComicChapter>{
    return buildCollection<ComicChapter>({
        name: "Comic Chapters",
        path: "chapters",
        alias: "comic_chapters",
        properties: {
            ar_price: {
                name: "Ar Price",
                dataType: "boolean"
            },
            chapter_number: {
                name: "Chapter Number",
                dataType: "number"
            },
            chapter_preview_url: {
                name: "Chapter Preview Url",
                dataType: "string",
                storage: {
                    //gs://comics-77200.appspot.com/previews/galeo_cpt1_preview.jpg
                    storagePath: buildStoragePathFunction(["previews", "$comics", "$chapters"]),
                    acceptedFiles: ["image/*, video/*"],
                    metadata: {
                        cacheControl: "max-age=1000000"
                    },
                    fileName: function(ctx: UploadedFileContext): string {
                        return ctx.file.name
                    },
                    postProcess: buildPostProcessFunction()
                }
            },
            price: {
                name: "Price",
                dataType: "number"
            },
            release_date: {
                name: "Release Date",
                dataType: "date"
            },
            view_count: {
                name: "View Count",
                dataType: "number"
            }
        },
        subcollections: [
            buildPagesChaptersCollection()
        ]
    })
}