import { useState } from 'react';
import { Stack, Button, Flex, Text, Card, Spinner, Code } from '@sanity/ui';
import { useFormValue, useClient } from 'sanity';
import { PiMagicWand } from 'react-icons/pi';

export default function OGGeneratorInput(props) {
    const { onChange } = props;
    const document = useFormValue([]); // Get entire document
    const client = useClient({ apiVersion: '2024-01-01' });
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('');

    const generateImage = async () => {
        setIsLoading(true);
        setStatus('Initializing Generator...');

        try {
            // 1. Gather Data
            const documentId = document._id;
            const title = document.title_en || document.title;
            const subtitle = document.category || 'ARTICLE';
            const titleAr = document.title;

            // Handle Drafts (remove 'drafts.' prefix if present for API, though API probably needs actual ID to patch)
            // Actually, we pass the raw ID. The API client token has write access.
            const targetId = documentId.replace('drafts.', '');

            if (!title) {
                setStatus('Error: Title is required');
                setIsLoading(false);
                return;
            }

            setStatus('Delegating to Server API...');

            // 2. Build URL Params
            const params = new URLSearchParams({
                title: title,
                type: 'ARTICLE',
                subtitle: subtitle.toUpperCase(),
                id: documentId, // Pass full ID (draft/pub)
                save: 'true'   // Trigger Server-Side Save
            });

            if (titleAr && titleAr !== title) {
                params.append('title_ar', titleAr);
            }

            // We let the API fetch the author settings itself to avoid passing too much param data,
            // or we can pass overrides if needed. The API code I viewed fetches defaults if not provided.
            // But to be safe and consistent with UI, let's keep passing author data if we have it?
            // Actually, the API logic fetches 'settings' document itself if needed. 
            // Let's rely on the API's internal logic for consistency.

            const apiUrl = `/api/og?${params.toString()}`;
            console.log("Triggering OG Generation:", apiUrl);

            // 3. Call API
            const response = await fetch(apiUrl);

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`API Error ${response.status}: ${text}`);
            }

            const result = await response.json();

            if (result.success) {
                setStatus('Success! Image Generated & Saved.');
                // Optional: Trigger a client-side reload or toast? 
                // The Studio subscription should auto-update the thumbnail field.
            } else {
                throw new Error(result.error || 'Unknown Error');
            }

        } catch (error) {
            console.error(error);
            setStatus(`Err: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card padding={4} border radius={3} tone="primary">
            <Flex direction="column" gap={3}>
                <Flex align="center" justify="space-between">
                    <Text weight="bold" size={2}>Smart OG Generator</Text>
                    {isLoading && <Spinner size={2} />}
                </Flex>

                <Text size={1} muted>
                    This will auto-generate a brand-aligned social cover image based on the article's titles and category. It fetches your **Profile Picture** from Global Settings and includes it in the design.
                </Text>

                {status && (
                    <Code size={1} style={{ color: status.includes('Error') || status.includes('Err') ? 'red' : 'green' }}>
                        {status}
                    </Code>
                )}

                <Button
                    icon={PiMagicWand}
                    fontSize={2}
                    padding={3}
                    tone="primary"
                    text={isLoading ? "Processing..." : "Generate AI Cover Image"}
                    onClick={generateImage}
                    disabled={isLoading}
                />
            </Flex>
        </Card>
    );
}
