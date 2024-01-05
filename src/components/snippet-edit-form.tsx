'use client';

import type { Snippet } from "@prisma/client";
import Editor from '@monaco-editor/react';
import { useState } from "react";
import * as actions from "@/actions";

interface SnippetEditFormProps {
    snippet: Snippet
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
    const [code, setCode] = useState(snippet.code);

    const handleEditorChange = (value: string = '') => {
        setCode(value);
    }

    // 1st argument to BIND is NULL
    // 2nd argument to BIND is the 1st argument in our SERVER ACTION.  Our SERVER ACTION = editSnippet which has a 1st argument of ID: NUMBER = snippet.id
    // 3rd argument to BIND is the 2nd argument in our SERVER ACTION.  our SERVER ACTION = editSnippet which has a 2nd argument of CODE: STRING = snippet.code
    const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);
    // Next we need to create a FORM in our JSX

    return (
        <div>
            <Editor
                height="40vh"
                theme="vs-dark"
                language="javascript"
                defaultValue={snippet.code}
                options={{ minimap: { enabled: false } }}
                onChange={handleEditorChange}
            />

            <form action={editSnippetAction}>
                <button type="submit" className="p-2 border rounded">Save</button>
            </form>
        </div>
    )
}