'use server'
import { revalidatePath } from 'next/cache';
import { db } from '@/src/db';
import { note, user } from '@/src/db/schema/schema';
import { signIn, signOut } from '@/src/auth';

export async function doSocialLogin(formData) {
    const action = formData.get('action');
    await signIn(action, { redirectTo: "/home" });
};

export async function doLogout() {
    await signOut({ redirectTo: "/" });
};

export async function doCredentialLogin(formData) {
    try {
        const response = await signIn("credentials", {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        });
        return response;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

export const addNoteAction = async (formData) => {
    const description = formData.get('description');
    const title = formData.get('title');

    //insert the new note
    db.insert(note)
        .values({
            description: description,
            id: crypto.randomUUID(),
            title: title,
        })
        .run();

    //to apply the changes without reloading the page
    revalidatePath('/');
};

export const addUserAction = async (formData) => {
    const email = formData.get('email');
    const password = formData.get('password');
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');

    //insert the new note
    db.insert(user)
        .values({
            email: email,
            id: crypto.randomUUID(),
            firstName: firstName,
            lastName: lastName,
            password: password,
        })
        .run();

    //to apply the changes without reloading the page
    revalidatePath('/');
};