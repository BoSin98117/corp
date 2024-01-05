'use client';
// Error file MUST be a CLIENT COMPONENT!!!


interface ErrorPageProps {
    error: Error;
    reset: () => void;
}

export default function ErrorPage({ error }: ErrorPageProps) {
    return (
        <div>{error.message}</div>
    )
}