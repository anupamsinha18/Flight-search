
import { NextResponse } from 'next/server';
import flightsData from '@/data/flights.json';

export async function GET() {
    return NextResponse.json(flightsData);
}
