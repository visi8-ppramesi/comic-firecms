import {
    buildCollection,
} from "ppramesi-firecms";
import { GiveawayCode } from "@/types/giveawayCode"
import { CreateGiveawayCodeButton } from "@/actions/CreateGiveawayCodeButton";
import { buildInvalidateField } from "@/actions/CreateInvalidateCodeButton"

export const giveawayCodesCollection = buildCollection<GiveawayCode>({
    name: "Giveaway Codes",
    path: "giveaway_codes",
    permissions: {
        read: true,
        create: false,
        edit: true,
        delete: true
    },
    additionalFields: [buildInvalidateField],
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
            name: "Giveaway Comic",
            dataType: "reference",
            path: "comics"
        },
        chapter: {
            name: "Chapter",
            dataType: "reference",
            path: "comics/comicid/chapters"
        },
        // chapter: (param) => {
        //     console.log("chapter param", param)
        //     const { values } = param
        //     if(values.chapter){
        //         return {
        //             name: "Giveaway Chapter",
        //             dataType: "reference",
        //             path: values.chapter.path
        //         }
        //     }else{
        //         return {
        //             name: "Giveaway Chapter",
        //             dataType: "reference",
        //         }
        //     }
        // },
        // {
        //     name: "Giveaway Chapter",
        //     dataType: "reference",
        //     // path: "comics/chapters"
        // },
        created_by: {
            name: "Created By",
            dataType: "reference",
            path: "users"
        },
        claimed_by: {
            name: "Claimed By",
            dataType: "reference",
            path: "users"
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