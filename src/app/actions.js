'use server';

import { updateLocalData, getLocalData } from '../lib/data.server';
import { revalidatePath } from 'next/cache';

export async function saveContent(key, data) {
    try {
        await updateLocalData(key, data);
        revalidatePath('/');
        return { success: true };
    } catch (e) {
        console.error(e);
        return { success: false, error: e.message };
    }
}

export async function fetchContent(key) {
    return await getLocalData(key);
}
