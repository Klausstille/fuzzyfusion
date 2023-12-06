import Image from "next/image";

export default function ProjectListImageDetail() {
    return (
        <aside className="col-span-5">
            <Image
                src="/DSCF5143.JPG"
                width={5000}
                height={5000}
                alt="/DSCF5143.JPG"
                className="h-[calc(100vh-60px)] object-cover object-left"
            />
        </aside>
    );
}
