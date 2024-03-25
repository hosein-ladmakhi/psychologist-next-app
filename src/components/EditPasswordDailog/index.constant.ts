import zod from 'zod'

export const editPasswordFormValidation = zod.object({
    currentPassword: zod.string({ required_error: 'گذرواژه فعلی خود را وارد کنید' }).min(8, 'گذرواژه فعلی باید حداقل 8 حرف داشته باشد'),
    password: zod.string({ required_error: 'گذرواژه جدید خود را وارد کنید' }).min(8, 'گذرواژه جدید باید حداقل 8 حرف داشته باشد')
})