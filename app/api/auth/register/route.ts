import { connectToDatabase } from "@/lib/db";
import User from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Email and password are required",
        },
        {
          status: 400,
        }
      );
    }
		await connectToDatabase()
		const existingUser = await User.findOne({email})
		
		if(existingUser){
			return NextResponse.json({
				error: "User already exists"
			},{
				status: 400
			})
		}

		await User.create({
			email,
			password
		})
  } catch (error) {
		console.error("Registration error", error);
		return NextResponse.json(
			{error: "Failed to register the user"},
			{status: 400}
		)
		
	}
}
