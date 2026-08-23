
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    const {otp} = await request.json()

    const validOtp = '123456'

    if(validOtp === otp){
        return NextResponse.json({
            success: true,
            message: "OTP verified successfully"
        })
    }

    return NextResponse.json({
        success: false,
        message: "OTP not verified"
    },
{
        status: 400
})
}