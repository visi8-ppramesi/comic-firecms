import {
    buildCollection
} from "@camberi/firecms";
import { Tags } from "@/types/tags";

export const tagsCollection = buildCollection<Tags>({
    name: "Tags",
    path: "tags",
    properties: {
        name: {
            name: "Name",
            dataType: "string"
        },
    }
})