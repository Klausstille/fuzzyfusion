"use client";
import React, { useEffect, useState } from "react";
import Button from "./Button";

export default function Hero() {
    return (
        <>
            <section className="absolute flex flex-col aspect-[6/3] justify-center z-10 w-full h-full">
                <div className="self-center align-middle text-center">
                    <h1 className="text-xl-heading font-bold">Title Page</h1>
                    <p className="font-light">Short | Project | Description</p>
                    <Button text={"Action"} />
                </div>
            </section>
        </>
    );
}
