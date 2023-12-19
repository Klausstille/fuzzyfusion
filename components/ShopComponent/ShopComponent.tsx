import { ImagesCollectionItem } from "@/types";
import { useState, useEffect, use } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useColorThemeStore, DarkTheme } from "@/stores/colorTheme";

interface ShopComponentProps {
    projectItem: ImagesCollectionItem;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY || "");

export default function ShopComponent({ projectItem }: ShopComponentProps) {
    const formats = [
        { label: "Select a format", value: "" },
        { label: "15 x 10", value: "15 x 10" },
        { label: "30 x 20", value: "30 x 20" },
        { label: "45 x 30", value: "45 x 30" },
        { label: "60 x 40", value: "60 x 40" },
        { label: "75 x 50", value: "75 x 50" },
        { label: "90 x 60", value: "90 x 60" },
        { label: "105 x 70", value: "105 x 70" },
        { label: "120 x 80", value: "120 x 80" },
        { label: "150 x 100", value: "150 x 100" },
        { label: "180 x 120", value: "180 x 120" },
    ];

    const [selectedFormat, setSelectedFormat] = useState(formats[0].value);
    const { darkTheme } = useColorThemeStore() as DarkTheme;
    const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFormat(e.target.value);
    };

    const [clientSecret, setClientSecret] = useState("");
    const [keyForRerender, setKeyForRerender] = useState(0);

    useEffect(() => {
        fetch("/api/checkout_sessions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId: `Photo print Fujiflex glossy, ${selectedFormat}`,
                productTitle: projectItem?.title,
                selectedFormat: selectedFormat,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret);
                setKeyForRerender((prevKey) => prevKey + 1);
            });
    }, [projectItem, selectedFormat]);

    useEffect(() => {
        setSelectedFormat("");
    }, [projectItem]);

    return (
        <div className="text-s">
            <aside className="flex justify-between py-4">
                <h1>Buy this print</h1>
                <select
                    className={`focus:outline-none ${
                        darkTheme ? "bg-real-black text-white" : "text-black"
                    }`}
                    value={selectedFormat}
                    onChange={handleFormatChange}
                >
                    {formats.map((format) => (
                        <option key={format.value} value={format.value}>
                            {format.label}
                        </option>
                    ))}
                </select>
            </aside>
            {clientSecret && selectedFormat && (
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{
                        clientSecret,
                    }}
                    key={keyForRerender}
                >
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            )}
            <aside className={`text-dark-gray py-4`}>
                <p>
                    To ensure the highest standards, we partner with WhiteWall,
                    a renowned printing service known for its excellence in
                    craftsmanship. <br></br> <br></br>Fuji Crystal DP II –
                    Gallery-Quality Print<br></br>We exclusively print on Fuji
                    Crystal DP II, a high-quality photo paper known for its
                    exceptional characteristics. This premium paper ensures
                    stunning, vibrant colors and remarkable image clarity,
                    adding a touch of sophistication to your prints with its
                    unique matte/light structure that minimizes reflections and
                    enhances overall visual appeal. <br></br>
                    <br></br>Why WhiteWall?<br></br>WhiteWall is a trusted name
                    in the printing industry, known for its commitment to
                    precision and quality. With state-of-the-art technology and
                    attention to detail, WhiteWall ensures that each print meets
                    the highest standards. We are dedicated to bringing your
                    images to life with the utmost care and professionalism. If
                    you have any questions or special requests, feel free to
                    contact us.<br></br>
                    <br></br>Swift Printing Process<br></br>Once you place your
                    order, we swing into action. Within a day, your file is sent
                    to our trusted printing partner, WhiteWall. Their
                    cutting-edge printing technology ensures that your images
                    are reproduced with the utmost precision and clarity.
                    <br></br>
                    <br></br>Direct Shipping to Your Doorstep<br></br>Your
                    finished prints are then expertly packaged and shipped
                    directly to your preferred address. Whether it`s a single
                    print or a bulk order, we handle the logistics, so you can
                    sit back and await the arrival of your carefully crafted
                    pieces.
                </p>
            </aside>
        </div>
    );
}
