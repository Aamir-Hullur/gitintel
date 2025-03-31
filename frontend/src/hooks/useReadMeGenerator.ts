import { useState } from 'react';

export function useReadmeGenerator() {
    const [isLoading, setIsLoading] = useState(false);
    const [generatedReadme, setGeneratedReadme] = useState("");
    const [error, setError] = useState("");

    const generateReadme = async (repoUrl: string) => {
        if (!repoUrl || !repoUrl.startsWith('https://github.com/')) {
            setError("Please enter a valid GitHub repository URL (e.g., https://github.com/owner/repo)");
            setGeneratedReadme(""); 
            setIsLoading(false); 
            return;
        }

        setIsLoading(true);
        setError("");
        setGeneratedReadme("");

        try {
            const response = await fetch('http://localhost:3001/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ repoUrl }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setGeneratedReadme(data.readme);

        } catch (err: any) {
            console.error("API call failed:", err);
            setError(err.message || "Failed to generate README. Check the console.");
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, generatedReadme, error, generateReadme };
}