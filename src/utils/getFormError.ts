export const getFormError = (formState: any, name: string) => formState.errors?.[name]?.message;
