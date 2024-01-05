'use client'

import { useFormState } from "react-dom";
import * as actions from '@/actions';


export default function SnippetCreatePage() {
    // 1st argument is the server action function we intend to call whenever the form is submitted
    // 2nd argument is some initial state object whish is an object with an empty message.
    // Whenever we call useFormState, we will get back an array with 2 elements inside it.  1st is the formState.  2nd element is an updated version of the server action.  We will take that 'action' and pass it into our form in the jsx.
    const [formState, action] = useFormState(actions.createSnippet, { message: ''});

    return (
        <form action={action}>
            <h3 className="font-bold m-3">Create a Snippet</h3>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <label className="w-12" htmlFor="title">Title</label>
                    <input
                        name="title"
                        className="border rounded p-2 w-full"
                        id="title"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <label className="w-12" htmlFor="code">Code</label>
                    <textarea
                        name="code"
                        className="border rounded p-2 w-full"
                        id="code"
                    />
                </div>

                {
                    formState.message ? <div className="my-2 p-2 bg-red-200 border rounded border-red-400">{formState.message}</div> : null
                }

                <button type="submit" className="rounded p-2 bg-blue-200">
                    Create
                </button>
            </div>
        </form>
    )
}