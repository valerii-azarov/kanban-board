export type BoardCardStatus = 'todo' | 'inprogress' | 'done'

export interface BoardCard {
    id: string;
    title: string;
    description: string;
    username?: string;
    status: BoardCardStatus;
}
