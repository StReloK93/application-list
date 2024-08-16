export interface Application {
    name: string,
    category_id: Number,
    icon: string,
    description: string,
    link: string,
    created_at: Date | null,
    update_at: Date | null,
}