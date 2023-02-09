import {
    EntityReference
} from "@camberi/firecms";

export type userData = {
    id: EntityReference,
    name: string,
    profile_image_url: string
}

export type CommentsComics = {
    created_date: Date,
    date: Date,
    flag: number,
    message: string,
    user: EntityReference,
    user_data: userData
}