import prisma from '@/lib/prisma';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    console.log('Webhook received');
    const evt = (await req.json()) as WebhookEvent;

    console.log('Parsed event:', evt);

    const userData = evt.data as any;
    console.log('User data:', userData);

    const { id: clerkUserId, email, name, photo } = userData;

    let user = null;

    switch (evt.type) {
      case 'user.created': {
        console.log('Handling user.created event');
        try {
          user = await prisma.user.upsert({
            where: {
              clerkUserId,
            },
            update: {
              name,
              email,
              photo,
            },
            create: {
              clerkUserId,
              name,
              email,
              role: 'Student',
              photo,
            },
          });
          console.log('User upserted:', user);
        } catch (prismaError) {
          console.error('Prisma error:', prismaError);
          return NextResponse.json(
            { error: 'Failed to create or update user in the database' },
            { status: 500 }
          );
        }
        break;
      }

      case 'user.deleted': {
        console.log('Handling user.deleted event');
        try {
          user = await prisma.user.delete({
            where: {
              clerkUserId,
            },
          });
          console.log('User deleted:', user);
        } catch (prismaError) {
          console.error('Prisma error:', prismaError);
          return NextResponse.json(
            { error: 'Failed to delete user from the database' },
            { status: 500 }
          );
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${evt.type}`);
        return NextResponse.json({ message: 'Event ignored' });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please check the logs.' },
      { status: 500 }
    );
  }
}
