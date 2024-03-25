import { ITableColumn } from "@/components/Table/index.type";

export const adminsColumns: ITableColumn[] = [
    {
        label: 'سریال ادمین',
        name: 'id',
        width: 200
    },
    {
        label: 'نام ادمین',
        name: 'firstName',
        width: 200
    },
    {
        label: 'نام خانوادگی ادمین',
        name: 'lastName',
        width: 200
    },
    {
        label: 'شماره تماس',
        name: 'phone',
        width: 200
    },
    {
        label: 'وضعیت حساب',
        name: 'transformedIsActive',
        width: 200
    },
]