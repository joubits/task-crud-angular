export interface Task {
    id?: number;
    title: string,
    body: string,
    author: string,
    category_id: number,
    category_name?: string,
    cretated_at?:string
}