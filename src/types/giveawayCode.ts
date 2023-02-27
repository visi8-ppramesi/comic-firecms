import { EntityReference } from "ppramesi-firecms" 

export type GiveawayCode = {
    claimed_date: Date,
    code: string,
    comic: EntityReference,
    chapter?: EntityReference,
    created_by: EntityReference,
    claimed_by: EntityReference,
    expiration_date: Date,
    filepath: string,
    salt: string,
    status: string,
    timestamp: Date
}