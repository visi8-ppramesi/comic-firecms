export type SocialMediaLinks = {
    [name in string]: string
}

export type Authors = {
    name: string,
    description: string,
    email: string,
    social_media_links: SocialMediaLinks,
    user_id: string
}