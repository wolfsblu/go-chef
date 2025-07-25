import * as z from "zod";

export const formSchema = z.object({
    email: z.string().email(),
    password: z.string().nonempty(),
});

export type FormSchema = typeof formSchema;