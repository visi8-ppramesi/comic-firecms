import {
    EntityReference
} from "@camberi/firecms";

export type UserData = {
    id: EntityReference,
    name: string,
    profile_image_url: string
}

export type ComicComment = {
    created_date: Date,
    date: Date,
    flag: number,
    message: string,
    user: EntityReference,
    user_data: UserData
}