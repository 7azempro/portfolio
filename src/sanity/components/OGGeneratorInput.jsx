import { useState } from 'react';
import { Stack, Button, Flex, Text, Card, Spinner, Code } from '@sanity/ui';
import { useFormValue, useClient } from 'sanity';
import { PimagicWand } from 'react-icons/pi';

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
            const title = document.title_en || document.title;
            const subtitle = document.category || 'ARTICLE';
            const titleAr = document.title; // Arabic title

            if (!title) {
                setStatus('Error: Title is required');
                setIsLoading(false);
                return;
            }

            setStatus('Fetching Global Settings...');

            // 2. Fetch Settings for Author Data
            const settings = await client.fetch(`*[_type == "settings"][0]{ 
                "imageId": profileImage.asset._ref,
                "name": authorName,
                "role": authorRole
            }`);

            const authorImageId = settings?.imageId;
            const authorName = settings?.name;
            const authorRole = settings?.role;

            setStatus('Generating OG Image from API...');

            // 3. Call Local OG API
            const params = new URLSearchParams({
                title: title,
                type: 'ARTICLE',
                subtitle: subtitle.toUpperCase(),
            });

            if (titleAr && titleAr !== title) {
                params.append('title_ar', titleAr);
            }

            if (authorImageId) params.append('authorImageId', authorImageId);
            if (authorName) params.append('authorName', authorName);
            if (authorRole) params.append('authorRole', authorRole);

            const apiUrl = `/api/og?${params.toString()}`;
            console.log("Fetching OG from:", apiUrl);

            // Fetch Blob
            const response = await fetch(apiUrl);

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`API Error ${response.status}: ${text.substring(0, 100)}`);
            }

            const blob = await response.blob();

            setStatus('Uploading to Sanity...');

            // 4. Upload to Sanity Assets
            const asset = await client.assets.upload('image', blob, {
                filename: `og-${title.substring(0, 20)}.png`
            });

            setStatus('Patching Document...');

            // 5. Update the Field (Patch)
            await client
                .patch(document._id)
                .set({
                    thumbnail: {
                        _type: 'image',
                        asset: {
                            _type: 'reference',
                            _ref: asset._id
                        }
                    }
                })
                .commit();

            setStatus('Success! Image Updated.');

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
                    icon={PimagicWand}
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
