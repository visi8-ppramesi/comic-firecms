import {
    buildCollection
} from "@camberi/firecms";
import { Categories } from "@/types/categories";

export const categoriesCollection = buildCollection<Categories>({
    name: "Categories",
    path: "categories",
    properties: {
        name: {
            name: "Name",
            dataType: "string"
        },
    }
})