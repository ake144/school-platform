import prisma from '@/lib/prisma';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const evt = (await req.json()) as WebhookEvent;

    // Extract necessary data from the event
    const { type, data  } = evt;
    const {id:clerkUserId}  = evt.data

    if (!clerkUserId) {
      return NextResponse.json(
        { error: 'No user ID provided' },
        { status: 400 },
      );
    }

    let user = null;

    switch (type) {
      case 'user.created': {
        // Extract the user's name and email from the event data
        const { email_addresses, first_name, last_name } = data;
        const email = email_addresses?.[0]?.email_address || '';

        user = await prisma.user.upsert({
          where: {
            clerkUserId,
          },
          update: {
            name: `${first_name || ''} ${last_name || ''}`.trim(),
            email,
          },
          create: {
            clerkUserId,
            name: `${first_name || ''} ${last_name || ''}`.trim(),
            email,
            // Add additional fields if needed, like default roles, etc.
          },
        });
        break;
      }

      case 'user.deleted': {
        user = await prisma.user.delete({
          where: {
            clerkUserId,
          },
        });
        break;
      }

      default:
        // Ignore other events
        return NextResponse.json({ message: 'Event ignored' });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
