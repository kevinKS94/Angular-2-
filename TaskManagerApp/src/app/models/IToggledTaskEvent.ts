import { Task } from './Task';

export interface IToggledTaskEvent{
    task : Task;
    toggleValue : boolean;
}