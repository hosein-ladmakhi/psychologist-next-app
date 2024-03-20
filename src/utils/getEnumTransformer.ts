import { EOrderStatus } from "@/types/order.model";
import { EDegtreeOfEducation, EGender, ETherapistScheduleType } from "@/types/therapist.model";
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


export const getScheduleTypeEnum = (data: ETherapistScheduleType) => {
    switch (data) {
        case ETherapistScheduleType.onsite:
            return 'حضوری';
        case ETherapistScheduleType.both:
            return 'حضوری و آنلاین';
        case ETherapistScheduleType.online:
            return 'آنلاین'
    }
}


export const getOrderStatusEnum = (data: EOrderStatus) => {
    switch (data) {
        case EOrderStatus.Cancel:
            return 'کنسل شده';
        case EOrderStatus.Done:
            return 'به اتمام رسیده';
        case EOrderStatus.Pending:
            return 'در انتظار برگزاری'
    }
}