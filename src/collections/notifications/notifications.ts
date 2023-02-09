import {
    buildCollection
} from "@camberi/firecms";

type Notifications = {
    unread_count: number
}

// export const notificationsCollection = buildCollection<Notifications>({
//     name: "Notifications",
//     path: "notifications",
//     properties: {
//         unread_count: {
//             name: "Unread Count",
//             dataType: "number"
//         },
//     }
// })