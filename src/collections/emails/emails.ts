import {
    buildCollection
} from "ppramesi-firecms";
import { Email } from "@/types/emails";

export const tagsCollection = buildCollection<Email>({
    name: "Emails",
    path: "complaints",
    properties: {
        from: { //string
            name: "From",
            dataType: "string"
        },
        reply_to: { //string
            name: "Reply To",
            dataType: "string"
        },
        to: { //string
            name: "To",
            dataType: "string"
        },
        type: { //string
            name: "Email Type",
            dataType: "string"
        },
        message: { //EmailMessage
            name: "Message",
            dataType: "map",
            properties: {
                subject: {
                    name: "Subject",
                    dataType: "string"
                },
                text: {
                    name: "Text",
                    dataType: "string"
                }
            }
        },
        delivery: { //DeliveryData
            name: "Delivery Status",
            dataType: "map",
            properties: {
                info: {
                    name: "Delivery Info",
                    dataType: "map",
                    properties: {
                        accepted: {
                            name: "Accepted",
                            dataType: "array",
                            of: {
                                dataType: "string"
                            }
                        },
                        pending: {
                            name: "Pending",
                            dataType: "array",
                            of: {
                                dataType: "string"
                            }
                        },
                        rejected: {
                            name: "Rejected",
                            dataType: "array",
                            of: {
                                dataType: "string"
                            }
                        },
                        message_id: {
                            name: "Message ID",
                            dataType: "string"
                        },
                        response: {
                            name: "Response",
                            dataType: "string"
                        },
                        state: {
                            name: "Current State",
                            dataType: "string"
                        },
                    }
                },
                attempts: {
                    name: "Number of Attempts",
                    dataType: "number"
                },
                end_time: {
                    name: "End Time",
                    dataType: "date"
                },
                expire_at: {
                    name: "Expire At",
                    dataType: "date"
                },
                error: {
                    name: "Error",
                    dataType: "string"
                },
            }
        },
    }
})