'use server'


import prisma from "@/lib/prisma";
import { StudentSchema } from "@/lib/types";




export async function  createStudent({data}:{data:StudentSchema}){
    return prisma.student.create({
        data: {
            ...data
        }
    })
}



export async function UpdateStudent({data}:{data:StudentSchema}){
    return  prisma.student.updateMany({
        data:{
            ...data
        }
    })
}