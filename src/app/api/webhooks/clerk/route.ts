import prisma from '@/lib/prisma';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    console.log('Webhook received');
    const evt = (await req.json()) as WebhookEvent;

    
    const userData = evt.data as any; // Typecast to any to access properties directly
    const { id: clerkUserId, email_addresses, first_name, last_name, photo:image_url } = userData;
    const email = email_addresses?.[0]?.email_address || "";

    if (!clerkUserId) {
      console.error('No user ID provided');
      return NextResponse.json({ error: 'No user ID provided' }, { status: 400 });
    }

    let user = null

    switch (evt.type) {
      case 'user.created':

        user = await prisma.user.upsert({
          where: {
            clerkUserId,
          },
          update: {
            name: `${first_name} ${last_name}`,
            email,
            role: 'Student',
            photo:image_url,
          },
          create: {
            clerkUserId,
            name: `${first_name} ${last_name}`,
            email,
            role: 'Student',
            photo:image_url,
          },
        });
        console.log('User created:', user);
        break;
      case 'user.deleted':
       user = await prisma.user.delete({
            where: {
              clerkUserId,
            },
          });
        console.log('User deleted:', user);
        break;
      default:
        console.warn('Unhandled event type:', evt.type);
        break;
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



