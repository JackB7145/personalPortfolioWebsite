import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "./emailService";

export async function POST(req: NextRequest){
    try{
        const {name, email, message} = await req.json();

        sendEmail({name, email, message})

        return NextResponse.json({
            status: 200
        })
    } catch (err){
        return NextResponse.json({
            status:500,
            message:err
        })
    }
}