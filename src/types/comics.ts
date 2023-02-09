import {
    EntityReference
} from "@camberi/firecms";

export type chaptersData = {
    chapter_number: number,
    chapter_preview_url: string,
    id: string,
    price: number,
    release_date: Date,
    view_count: number
}

export type authorsData = {
    id: EntityReference,
    name: string
}

export type Comics = {
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
    authors: string[],
    authors_data: authorsData[],
    categories: string[],
    chapters_data: chaptersData[],
    keywords: string[],
    tags: string[]
}