import {
    buildCollection
} from "@camberi/firecms";
import { Tag } from "@/types/tags";

export const tagsCollection = buildCollection<Tag>({
    name: "Tags",
    path: "tags",
    properties: {
        name: {
            name: "Name",
            dataType: "string"
        },
    }
})