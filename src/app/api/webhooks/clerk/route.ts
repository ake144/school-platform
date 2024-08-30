import { createUser, UpdateUser } from '@/lib/actions/create/user';
import prisma from '@/lib/prisma';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    console.log('Webhook received');
    const evt = (await req.json()) as WebhookEvent;
    const userData = evt.data as any;

    if (evt.type === 'user.created') {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;

      if (!id || !email_addresses) {
        return new Response('Invalid data', { status: 400 });
      }

      const user = {
        clerkUserId: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        image: image_url,
      };

      await createUser(user as any);
    } else if (evt.type === 'user.updated') {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;

      if (!id) {
        return new Response('Invalid data', { status: 400 });
      }

      const data = {
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        image: image_url,
      };
      await UpdateUser({ id, data } as any);
    } else if (evt.type === 'user.deleted') {
      const { id } = evt.data;
      if (!id) {
        return new Response('Invalid data', { status: 400 });
      }

      await prisma.user.delete({
        where: {
          clerkUserId: id,
        },
      });
    }

    return new Response('Webhook received', { status: 200 });
  } catch (error) {
    console.error('Error syncing user data:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
