import { EDegtreeOfEducation, EGender } from "@/types/therapist.model";
import { ETicketStatus } from "@/types/ticket.model";

export const getTicketStatusEnum = (data: ETicketStatus) => {
    switch (data) {
        case ETicketStatus.Close:
            return 'بسته شده';
        case ETicketStatus.Open:
            return 'درانتظار';
        case ETicketStatus.Report:
            return 'گزارش شده'
    }
}


export const getGenderEnum = (data: EGender) => {
    switch (data) {
        case EGender.female:
            return 'پزشک خانوم';
        case EGender.male:
            return 'پزشک آقا';
        default:
            return 'نامشخص'
    }
}


export const getDegreeOfEducationEnum = (data: EDegtreeOfEducation) => {
    switch (data) {
        case EDegtreeOfEducation.diploma:
            return 'دیپلم'
        case EDegtreeOfEducation.associate:
            return 'فوق دیپلم';
        case EDegtreeOfEducation.bachelor:
            return 'لیسانس';
        case EDegtreeOfEducation.master:
            return 'فوق لیسانس';
        case EDegtreeOfEducation.doctorate:
            return 'دکترا'
    }
}


export const getGendersEnumSelection = () => {
    return Object.entries(EGender).map(([key, value]) => ({ key: getGenderEnum(key as EGender), value }))
}