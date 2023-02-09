export type OverlayDimension = {
    height: number,
    width: number,
    x: number,
    y: number
}

export type ViewerPoint = {
    x: number,
    y: number,
    overlay: OverlayDimension
}

export type ButtonShowtime = {
    start: number,
    end: number
}

export type ChapterPage = {
    is_ar: boolean,
    media_type: string,
    page_image_url: string,
    page_image_url_id?: string,
    page_number: number,
    video_poster?: string,
    ar_button_show_time?: ButtonShowtime,
    scenes_data?: string[],
    comic_viewer_points?: ViewerPoint[]
}