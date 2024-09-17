export interface IDesk {
    desk_id: number;
    desk_name: string;
    project_id: number;
    employee_id: number;
    status: 'available' | 'occupied';
    created_at: Date;
    updated_at: Date;
    category: string;
}
