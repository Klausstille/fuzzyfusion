import { NextResponse, NextRequest } from "next/server";
import getProducts from "@/stripe/getProducts";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const { productId, productTitle, selectedFormat } = await req.json();
        const productPrice = await getProducts(productId);
        const session = await stripe.checkout.sessions.create({
            ui_mode: "embedded",
            submit_type: "pay",
            billing_address_collection: "auto",
            shipping_address_collection: {
                allowed_countries: ["DE", "AT", "CH", "IT", "FR", "ES", "GB"],
            },

            custom_fields: [
                {
                    key: "product_id",
                    label: {
                        type: "custom",
                        custom: "Product ID",
                    },
                    type: "dropdown",
                    dropdown: {
                        options: [{ label: productTitle, value: 1 }],
                    },
                },
                {
                    key: "format",
                    label: {
                        type: "custom",
                        custom: "Format",
                    },
                    type: "dropdown",
                    dropdown: {
                        options: [{ label: selectedFormat, value: 1 }],
                    },
                },
            ],
            custom_text: {
                shipping_address: {
                    message:
                        "Please note that we can't guarantee 2-day delivery for PO boxes at this time.",
                },
            },
            line_items: [
                {
                    price: productPrice,
                    quantity: 1,
                },
            ],

            mode: "payment",
            return_url: `${req.headers.get(
                "origin"
            )}/return?session_id={CHECKOUT_SESSION_ID}`,
            automatic_tax: { enabled: true },
        });
        return NextResponse.json({ clientSecret: session.client_secret });
    } catch (err: any) {
        return NextResponse.json({
            err: err.statusCode || 500,
            message: err.message,
        });
    }
}

export async function GET(req: NextRequest) {
    try {
        const sessionId = new URL(req.url).searchParams.get("session_id");
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        return NextResponse.json({
            status: session.status,
            customer_email: session.customer_details.email,
            customer_firstName: session.customer_details.name.split(" ")[0],
        });
    } catch (err: any) {
        return NextResponse.json({
            err: err.statusCode || 500,
            message: err.message,
        });
    }
}
