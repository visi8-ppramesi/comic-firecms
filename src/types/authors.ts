import { EntityReference } from "@camberi/firecms"

export type SocialMediaLinks = {
    [name in string]: string
}

export type Author = {
    name: string,
    description: string,
    email: string,
    social_media_links: SocialMediaLinks,
    user_id: EntityReference
}