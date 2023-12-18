import Stripe from "stripe";

export default async function getProducts(productId) {
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_API_KEY);
    const prices = await stripe.prices.list({
        limit: 10,
    });
    const foundProductId = prices.data.find((price) => {
        return price.nickname === productId;
    });
    return foundProductId.id;
}
