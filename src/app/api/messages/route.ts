import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Message } from '@/entities/Message';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, body: msgBody } = body;

    if (!name || !email || !subject || !msgBody) {
      return NextResponse.json(
        { error: 'All fields are required: name, email, subject, body' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const ds = await getDataSource();
    const repo = ds.getRepository(Message);
    const message = repo.create({ name, email, subject, body: msgBody });
    await repo.save(message);

    return NextResponse.json(
      { success: true, message: 'Message sent successfully', id: message.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Message);
    const messages = await repo.find({ order: { createdAt: 'DESC' } });
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
