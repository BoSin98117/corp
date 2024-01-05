'use server';

import { redirect } from "next/navigation";
import { db } from "@/db";

export async function editSnippet(id: number, code: string) {
    await db.snippet.update({
        where: { id },
        data: { code }
    })

    redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
    await db.snippet.delete({
        where: { id }
    })

    redirect('/');
}

// FORMSTATE will always be the 1st argument
export async function createSnippet(formState: { message: string }, formData: FormData) {
    try {
        // Check the user's inputs and make sure they are valid
        const title = formData.get('title'); // From the Name attribute of form in return statement below.
        const code = formData.get('code');  // From the NAME attribute of form in the return statement below.

        if (typeof title !== 'string' || title.length < 3) {
            return {
                message: 'Title must be at least 3 characters!'
            }
        }

        if (typeof code !== 'string' || code.length < 10) {
            return {
                message: 'Code must be at least 10 characters!'
            }
        }

        // Createa new record in the database
        await db.snippet.create({
            data: {
                title: title,
                code: code
            }
        })
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                message: err.message,
            }
        } else {
            return {
                message: 'Something went wrong...',
            }
        }
    }

    // Redirect the user back to the root route
    redirect('/');  // Redirect back to the HOME screen.
}