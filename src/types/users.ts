import { EntityReference } from "@camberi/firecms"

export type User = {
    name: string,
    full_name: string,
    email: string,
    date_of_birth: Date,
    email_verified_at: Date,
    profile_img_url: string,
    bookmarks: string[],
    comic_subscriptions: EntityReference[],
    favorites: EntityReference[],
}