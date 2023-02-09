import {
    buildCollection
} from "@camberi/firecms";

type Settings = {
    
}

export const settingsCollection = buildCollection<Settings>({
    name: "Settings",
    path: "settings",
    properties: {
        
    }
})