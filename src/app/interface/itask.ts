export interface ITask {
    task_id: number;
    task_name: string;
    task_description: string;
    employee_id: number;
    status: 'progress' | 'complete' | 'pending';
    category: string;
}
