"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import BackIcon from "@/components/ProjectIcon/BackIcon";
import { useColorThemeStore, DarkTheme } from "@/stores/colorTheme";
import { useRouter } from "next/navigation";
export default function Return() {
    const { darkTheme } = useColorThemeStore() as DarkTheme;
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerFirstName, setCustomerFirstName] = useState("");
    const router = useRouter();

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get("session_id");

        fetch(`/api/checkout_sessions?session_id=${sessionId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("data::::", data);
                setStatus(data.status);
                setCustomerEmail(data.customer_email);
                setCustomerFirstName(data.customer_firstName);
            });
    }, []);

    if (status === "open") {
        return redirect("/");
    }

    if (status === "complete") {
        return (
            <section
                id="success"
                className="flex justify-center items-center h-screen"
            >
                <div
                    className="fixed top-2 right-2 flex gap-2 items-center font-bold cursor-pointer max-tablet:hidden"
                    onClick={() => router.push("/")}
                >
                    <BackIcon darkTheme={darkTheme} /> BACK
                </div>
                <p className="text-xs-heading w-1/2 text-center">
                    Thanks, {customerFirstName}! <br></br> A confirmation email
                    will be sent to {customerEmail}. If you have any questions,
                    please email us at{" "}
                    <a href="mailto:love@fuzzyfusion.world">
                        love@fuzzyfusion.world
                    </a>
                    .
                </p>
            </section>
        );
    }

    return null;
}
