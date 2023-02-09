import {
    buildCollection,
    UploadedFileContext
} from "@camberi/firecms";
import { chaptersComicsCollection } from "./chapters/chapters"
import { commentsComicsCollection } from "./comments/comments"
import { Comics } from "@/types/comics";

export const comicsCollection = buildCollection<Comics>({
    name: "Comics",
    path: "comics",
    properties: {
        title: {
            name: "Title",
            dataType: "string"
        },
        description: {
            name: "Description",
            dataType: "string"
        },
        price: {
            name: "Price",
            dataType: "number"
        }, 
        view_count: {
            name: "View Count",
            dataType: "number"
        },
        release_date: {
            name: "Release Date",
            dataType: "date"
        },
        last_update: {
            name: "Last Update",
            dataType: "date"
        },
        favorite_count: {
            name: "Favorite Count",
            dataType: "number"  
        },
        is_draft: {
            name: "Is Draft",
            dataType: "boolean"
        },
        cover_image_url: {
            name: "Cover Image",
            dataType: "string",
            storage: {
                storagePath: function(ctx: UploadedFileContext): string {
                    return "test"
                },
                acceptedFiles: ["image/*"],
                maxSize: 1024 * 1024,
                metadata: {
                    cacheControl: "max-age=1000000"
                },
                fileName: function(ctx: UploadedFileContext): string {
                    return ctx.file.name
                }
            }
        },
        age_gate: {
            name: "Age Gate",
            dataType: "boolean"
        },
        authors: {
            name: "Authors",
            dataType: "array",
            of: {
                dataType: "reference",
                path: "authors"
            }
        },
        authors_data: {
            name: "Authors Data",
            dataType: "array",
            of: {
                dataType: "map",
                properties: {
                    id: {
                        name: "Id",
                        dataType: "reference",
                        path: "authors"
                    },
                    name: {
                        name: "Name",
                        dataType: "string"
                    }
                }
            }
        },
        categories: {
            name: "Categories",
            dataType: "array",
            of: {
                dataType: "string"
            }
        },
        chapters_data: {
            name: "Chapters Data",
            dataType: "array",
            of: {
                dataType: "map",
                properties: {
                    chapter_number: {
                        name: "Chapter Number",
                        dataType: "number"
                    },
                    chapter_preview_url: {
                        name: "Chapter Preview Url",
                        dataType: "string"
                    },
                    id: {
                        name: "Id",
                        dataType: "string"
                    },
                    price: {
                        name: "Price",
                        dataType: "number"
                    },
                    release_date: {
                        name: "Release Date",
                        dataType: "date"
                    },
                    view_count: {
                        name: "View Count",
                        dataType: "number"
                    }
                }
            }
        },
        keywords: {
            name: "Keywords",
            dataType: "array",
            of: {
                dataType: "string"
            }
        },
        tags: {
            name: "Tags",
            dataType: "array",
            of: {
                dataType: "string"
            }
        }
    },
    subcollections: [
        chaptersComicsCollection,
        commentsComicsCollection
    ]
});