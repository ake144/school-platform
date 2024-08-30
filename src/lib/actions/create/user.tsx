'use server'

import prisma from "@/lib/prisma";
import {UserSchema} from "@/lib/types";




export async function getUsers() {
    return prisma.user.findMany()
}


export async function getByClerkId(id:string){
    return prisma.user.findUnique({
        where: { clerkUserId: id },
    });
}


export async function createUser(data:UserSchema){
    try{
        const user = await prisma.user.create({data})
        return {user}

    }
    catch(error){
        return {error}
    }
}



export async function UpdateUser({id, data}:{id:string,data:UserSchema}){
    return  prisma.user.update({
        where:{
            id:id
        },
        data:{
            ...data
        }
    })
}