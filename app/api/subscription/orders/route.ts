
import { auth } from "@/lib/db/auth";
import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, {status: 401});
        }

    // Get users subscription orders data 
    const orders = await prisma.subscriptionOrder.findMany({
        where: {
            userId: session.user.id, 
        },
        orderBy: {
            createdAt: "desc",
        },        
    }); 
    
    return NextResponse.json(orders);  

    } catch (error) {
        console.error("Error fetching subscripton orders", error);
        return NextResponse.json(
            {error: "Failed to fetch subscripton orders"},
            {status: 500}
        );
    }
}