import {
    buildCollection
} from "ppramesi-firecms";
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