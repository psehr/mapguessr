import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Osu, { OsuProfile } from "next-auth/providers/osu";
import Google from 'next-auth/providers/google'
import db from '@/lib/db';

const config = {
    providers: [Osu],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({ profile }) {
            let osuProfile = profile as OsuProfile;
            let dbUser = await db.collection('users').doc(osuProfile.id.toString()).get();
            if (!dbUser.exists) {
                await db.collection('users').doc(osuProfile.id.toString()).create({
                    id: osuProfile.id,
                    created: Date.now(),
                    last_logged: Date.now(),
                    username: osuProfile.username,
                    image: osuProfile.avatar_url
                })
            } else {
                await db.collection('users').doc(osuProfile.id.toString()).update({
                    last_logged: Date.now()
                })
            }
            return true
        },



    },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)

