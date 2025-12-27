import React, { useState } from 'react';
import { Button, Card, Flex, Text, useToast, Grid, Stack, Spinner } from '@sanity/ui';
import { useFormValue, useClient } from 'sanity';
import { v4 as uuidv4 } from 'uuid';
import { PiImageSquare, PiImagesSquare, PiLightning } from 'react-icons/pi';

const ScreenshotGenerator = (props) => {
    const doc = useFormValue([]);
    const client = useClient({ apiVersion: '2024-01-01' });
    const toast = useToast();

    const [loadingMode, setLoadingMode] = useState(null); // 'cover' | 'gallery' | null

    const generateScreenshot = async (mode) => {
        const url = doc?.link;

        if (!url) {
            toast.push({
                status: 'error',
                title: 'Missing URL',
                description: 'Please add a Link to the project before generating a screenshot.',
            });
            return;
        }

        setLoadingMode(mode);

        try {
            // 1. Fetch Screenshot Buffer from Microlink
            const microlinkUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1600&viewport.height=900`;

            const response = await fetch(microlinkUrl);
            if (!response.ok) throw new Error('Failed to fetch screenshot');

            const blob = await response.blob();

            if (!blob.type.startsWith('image/')) {
                throw new Error(`Invalid response type: ${blob.type}. Expected image.`);
            }

            const file = new File([blob], `${mode}-${doc.slug?.current || 'project'}.png`, { type: 'image/png' });

            // 2. Upload to Sanity
            const asset = await client.assets.upload('image', file, {
                filename: file.name,
            });

            // 3. Patch the document
            const patch = client.patch(doc._id.replace('drafts.', ''));

            if (mode === 'cover') {
                // Set Main Thumbnail
                patch.set({
                    thumbnail: {
                        _type: 'image',
                        asset: {
                            _type: 'reference',
                            _ref: asset._id
                        }
                    }
                });
            } else if (mode === 'gallery') {
                // Append to Gallery
                patch.setIfMissing({ gallery: [] });
                patch.insert('after', 'gallery[-1]', [{
                    _key: uuidv4(),
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: asset._id
                    }
                }]);
            }

            await patch.commit();

            toast.push({
                status: 'success',
                title: mode === 'cover' ? 'Cover Updated' : 'Added to Gallery',
                description: `Generated from ${url}`,
            });

        } catch (error) {
            console.error(error);
            toast.push({
                status: 'error',
                title: 'Generation Failed',
                description: error.message,
            });
        } finally {
            setLoadingMode(null);
        }
    };

    return (
        <Card padding={4} radius={3} shadow={1} tone="primary" border>
            <Stack space={4}>
                <Flex align="center" gap={3}>
                    <div style={{ fontSize: '1.5rem', opacity: 0.5 }}>
                        <PiLightning />
                    </div>
                    <Box>
                        <Text size={1} weight="bold">Smart Screenshot Tool</Text>
                        <Text size={1} muted style={{ opacity: 0.7 }}>
                            Source: <code style={{ fontSize: '0.9em' }}>{doc?.link || 'No URL Set'}</code>
                        </Text>
                    </Box>
                </Flex>

                <Grid columns={[2]} gap={3}>
                    <Button
                        mode="ghost"
                        tone="primary"
                        icon={loadingMode === 'cover' ? Spinner : PiImageSquare}
                        text={loadingMode === 'cover' ? 'Syncing...' : 'Set as Cover'}
                        onClick={() => generateScreenshot('cover')}
                        disabled={!!loadingMode || !doc?.link}
                    />
                    <Button
                        mode="default"
                        tone="primary"
                        icon={loadingMode === 'gallery' ? Spinner : PiImagesSquare}
                        text={loadingMode === 'gallery' ? 'Adding...' : 'Add to Gallery'}
                        onClick={() => generateScreenshot('gallery')}
                        disabled={!!loadingMode || !doc?.link}
                    />
                </Grid>
            </Stack>
        </Card>
    );
};

const Box = ({ children }) => <div>{children}</div>;

export default ScreenshotGenerator;
