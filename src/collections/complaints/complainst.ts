import {
    buildCollection
} from "ppramesi-firecms";
import { Complaint } from "@/types/complaints";

export const tagsCollection = buildCollection<Complaint>({
    name: "Complaints",
    path: "complaints",
    properties: {
        complaint_type: {
            name: "Complaint Type",
            dataType: "string"
        },
        email: {
            name: "Email",
            dataType: "string"
        },
        name: {
            name: "Name",
            dataType: "string"
        },
        status: {
            name: "Status",
            dataType: "string"
        },
        subject: {
            name: "Subject",
            dataType: "string"
        },
        text: {
            name: "Text",
            dataType: "string"
        },
    }
})