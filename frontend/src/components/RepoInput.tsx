import { Input } from "@/components/ui/input";
import { ArrowUp, Divide, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useReadmeGenerator } from "@/hooks/useReadMeGenerator"; 
import { Skeleton } from "@/components/ui/skeleton"


export default function RepoInput() {
    const [repoUrl, setRepoUrl] = useState("");
    const { isLoading, generatedReadme, error, generateReadme } = useReadmeGenerator();

    const handleTriggerGeneration = () => {
        generateReadme(repoUrl); 
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleTriggerGeneration(); 
        }
    };

    return (
        <div className="w-full max-w-3xl flex flex-col gap-4">
            <div>
                <Label
                    htmlFor="url-link"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Repository URL
                </Label>
                <div className="relative flex items-center">
                    <Input
                        type="url"
                        id="url-link"
                        placeholder="Enter GitHub Repository URL (e.g., https://github.com/owner/repo)"
                        className="pr-10 bg-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-offset-0"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)} 
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        disabled={!repoUrl || isLoading}
                        onClick={handleTriggerGeneration} 
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <ArrowUp className="size-4" />
                        )}
                        <span className="sr-only">Generate README</span>
                    </Button>
                </div>
            </div>

            {isLoading && (
                <div>
                   <h3> <Skeleton className="mt-4 h-10 w-lg bg-gray-200 rounded-full " /></h3>
                    <Skeleton className="mt-2 h-10 w-xl bg-gray-200 rounded-full" />
                </div>
            )}
            
            {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    <p>Error: {error}</p>
                </div>
            )}
            {generatedReadme && !isLoading && !error && (
                <div className="mt-4 p-4 bg-gray-50 border rounded">
                    <h3 className="text-lg font-semibold mb-2">Generated README:</h3>
                    <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-3 rounded">{generatedReadme}</pre>
                </div>
            )}
        </div>
    );
}