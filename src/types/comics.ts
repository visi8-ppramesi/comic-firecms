import {
    EntityReference
} from "ppramesi-firecms";

export type ChapterData = {
    chapter_number: number,
    chapter_preview_url: string,
    id: string,
    price: number,
    release_date: Date,
    view_count: number
}

export type AuthorData = {
    id: string,
    name: string
}

export type Comic = {
    title: string,
    description: string,
    price: number,
    view_count: number,
    release_date: Date,
    last_update: Date,
    favorite_count: number,
    is_draft: boolean,
    cover_image_url: string,
    age_gate: boolean,
    authors: EntityReference[],
    authors_data: AuthorData[],
    categories: string[],
    chapters_data: ChapterData[],
    keywords: string[],
    tags: string[]
}