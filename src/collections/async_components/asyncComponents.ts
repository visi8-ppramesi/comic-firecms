import {
    buildCollection
} from "@camberi/firecms";

type AsyncComponents = {
    data: string,
    name: string,
    template: string
}

export const asyncComponentsCollection = buildCollection<AsyncComponents>({
    name: "Async Components",
    path: "async_components",
    properties: {
        data: {
            name: "Data",
            dataType: "string"
        },
        name: {
            name: "Name",
            dataType: "string"
        },
        template: {
            name: "Template",
            dataType: "string"
        },
    }
})