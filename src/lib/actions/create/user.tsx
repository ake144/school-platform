import prisma from "@/lib/prisma";
import { UserSchema } from "@/lib/types";

export async function getUsers() {
  return prisma.user.findMany();
}

export async function getByClerkId(clerkUserId: string) {
  return prisma.user.findUnique({
    where: { clerkUserId },
  });
}

export async function createUser(data: UserSchema) {
  try {
    const user = await prisma.user.create({ data });
    return { user };
  } catch (error) {
    console.error('Error creating user:', error);
    return { error };
  }
}

export async function UpdateUser({ id, data }: { id: string, data: UserSchema }) {
  try {
    return prisma.user.update({
      where: {
        clerkUserId: id, // Use clerkUserId instead of id
      },
      data: {
        ...data,
      },
    });
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}
