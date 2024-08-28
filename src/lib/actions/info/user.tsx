'use server'

import prisma from "@/lib/prisma";


export async function getUsers() {
    return prisma.user.findMany()
}


export async function getByClerkId(id:string){
    return prisma.user.findUnique({
        where: { clerkUserId: id },
    });
}