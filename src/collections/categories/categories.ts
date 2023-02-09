import {
    buildCollection
} from "@camberi/firecms";
import { Category } from "@/types/categories";

export const categoriesCollection = buildCollection<Category>({
    name: "Categories",
    path: "categories",
    properties: {
        name: {
            name: "Name",
            dataType: "string"
        },
    }
})