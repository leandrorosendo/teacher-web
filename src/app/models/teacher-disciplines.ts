import { Disciplines } from "./discipline";
import { Teachers } from "./teacher";

export interface TeacherDisciplines {
    id: number;
    teacher_id: number;
    discipline_id: number;
    teachers : Teachers;
    disciplines : Disciplines;
}