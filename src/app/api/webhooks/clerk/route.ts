import prisma from '@/lib/prisma';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Parse incoming request

    console.log('webhook  received');
    const evt = (await req.json()) as WebhookEvent;



    const userData = evt.data as any;


     const {id:clerkUserId,email_addresses,last_name , first_name , image_url, } = userData;  
   
    let user = null;

    switch (evt.type) {
      case 'user.created': {
        const email = email_addresses?.[0]?.email_address || '';

        try {
          user = await prisma.user.upsert({
            where: {
              clerkUserId,
            },
            update: {
              name: `${first_name || ''} ${last_name || ''}`.trim(),
              email,
              photo: image_url,
            },
            create: {
              clerkUserId,
              name: `${first_name || ''} ${last_name || ''}`.trim(),
              email,
              role: 'Student',
              photo: image_url,
            },
          });
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
        try {
          user = await prisma.user.delete({
            where: {
              clerkUserId,
            },
          });
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
        // Log and return ignored event types
        console.log(`Unhandled event type: ${evt.type}`);
        return NextResponse.json({ message: 'Event ignored' });
    }

    return NextResponse.json({ user });
  } catch (error) {
    // Log detailed error info for troubleshooting
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please check the logs.' },
      { status: 500 }
    );
  }
}
