import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate Google Calendar API delay
  await new Promise(resolve => setTimeout(resolve, 150));

  const availableTimeSlots = [
    { id: '1', date: 'Nov 5', time: '10:00 AM', available: true },
    { id: '2', date: 'Nov 5', time: '2:00 PM', available: false },
    { id: '3', date: 'Nov 6', time: '11:00 AM', available: true },
    { id: '4', date: 'Nov 6', time: '3:00 PM', available: true },
    { id: '5', date: 'Nov 7', time: '9:00 AM', available: false },
    { id: '6', date: 'Nov 7', time: '1:00 PM', available: true },
    { id: '7', date: 'Nov 8', time: '10:00 AM', available: true },
    { id: '8', date: 'Nov 8', time: '4:00 PM', available: false },
  ];

  return NextResponse.json(availableTimeSlots);
}
