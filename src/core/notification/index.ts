import toast from "react-hot-toast";

export const successNotify = (message: string) => toast.success(message);

export const errorNotify = (message: string) => toast.error(message);
