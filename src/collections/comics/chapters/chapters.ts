import {
    buildCollection
} from "@camberi/firecms";
import { pagesChaptersCollection } from "./pages/pages"
import { ChaptersComics } from "@/types/chapters";

export const chaptersComicsCollection = buildCollection<ChaptersComics>({
    name: "Comic Chapters",
    path: "comics",
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
            dataType: "string"
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
        pagesChaptersCollection
    ]
})