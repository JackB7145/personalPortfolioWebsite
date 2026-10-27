import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "./emailService";
import { logRouteError, withRequestLogging } from '@/src/lib/requestLog';

export const dynamic = "force-dynamic";

export const POST = withRequestLogging('sendEmail', async (req: NextRequest) => {
    try{
        const {name, email, message} = await req.json();
        if (!name || !email || !message) {
            return NextResponse.json({ status: 400, message: 'Missing required fields' }, { status: 400 })
        }

        await sendEmail({name, email, message})

        return NextResponse.json({
            status: 200
        })
    } catch (err){
        // Log the real error server-side; return a real 500 (the contact form
        // checks res.ok) without leaking internals to the browser.
        logRouteError('sendEmail', err)
        return NextResponse.json({ status: 500, message: 'Failed to send message' }, { status: 500 })
    }
});
