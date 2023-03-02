export type EmailInfo = {
    accepted: string[],
    pending: string[],
    rejected: string[],
    message_id: string | null,
    response: string,
    state: string
}

export type EmailMessage = {
    subject: string,
    text: string
}

export type DeliveryData = {
    attempts: number,
    info: EmailInfo,
    end_time: Date,
    error?: string | null,
    expire_at: Date
}

export type Email = {
    delivery: DeliveryData,
    from: string,
    message: EmailMessage,
    reply_to: string,
    to: string,
    type: string
}