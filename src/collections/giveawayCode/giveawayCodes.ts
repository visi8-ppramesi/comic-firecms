import {
    buildCollection
} from "ppramesi-firecms";
import { GiveawayCode } from "@/types/giveawayCode"
import { CreateGiveawayCodeButton } from "@/actions/CreateGiveawayCodeButton";

export const giveawayCodesCollection = buildCollection<GiveawayCode>({
    name: "Giveaway Codes",
    path: "giveaway_codes",
    permissions: {
        read: true,
        create: false,
        edit: true,
        delete: true
    },
    Actions: CreateGiveawayCodeButton,
    properties: {
        claimed_date: {
            name: "Claimed Date",
            dataType: "date"
        },
        code: {
            name: "Code",
            dataType: "string"
        },
        comic: {
            name: "Giveaway Chapter",
            dataType: "reference",
            path: "comics"
        },
        chapter: {
            name: "Giveaway Chapter",
            dataType: "reference",
            path: "comics/chapters"
        },
        created_by: {
            name: "Created By",
            dataType: "reference",
            path: "user"
        },
        claimed_by: {
            name: "Created By",
            dataType: "reference",
            path: "user"
        },
        expiration_date: {
            name: "Expiration Date",
            dataType: "date"
        },
        filepath: {
            name: "QR Code File Location",
            dataType: "string"
        },
        salt: {
            name: "Salt",
            dataType: "string",
            readOnly: true
        },
        status: {
            name: "Code Status",
            dataType: "string"
        },
        timestamp: {
            name: "Timestamp",
            dataType: "date"
        }
    }   
})