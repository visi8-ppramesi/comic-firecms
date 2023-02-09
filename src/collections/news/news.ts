import {
    buildCollection
} from "@camberi/firecms";
import { News } from "@/types/news";

export const newsCollection = buildCollection<News>({
    name: "News",
    path: "news",
    properties: {
        title: {
            name: "Title",
            dataType: "string"
        },
        category: {
            name: "Category",
            dataType: "string"
        },
        date: {
            name: "Date",
            dataType: "date"
        },
        image: {
            name: "Image",
            dataType: "string"
        },
        url: {
            name: "Url",
            dataType: "string"
        }
    }
})