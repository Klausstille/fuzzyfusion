export const getLastName = (name: string) => name.split(" ").pop();
export const emailRegex = /^\S+@\S+\.\S+$/;
export const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
export function toSnakeCase(str: string): string {
    return str
        .replace(/\.?([A-Z])/g, (x, y) => "_" + y.toLowerCase())
        .replace(/[\s-]+/g, "_")
        .replace(/^_+/, "")
        .replace(/_+$/, "");
}

export const calculateDynamicGap = (width: number) => {
    const minWidth = 100;
    const maxWidth = 800;
    const dynamicGap =
        40 - Math.pow((width - minWidth) / (maxWidth - minWidth), 2) * 35;
    return Math.max(5, Math.min(40, dynamicGap));
};

export function removeTrailingSlash(str: string) {
    return str.replace(/\/$/, "");
}

export const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export function formatDateLabel(date: Date, lang: string) {
    const formatter = new Intl.DateTimeFormat(lang, {
        timeZone: "CET",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const formattedDate = formatter.format(date);
    return formattedDate;
}

export function formatDateValue(date: Date) {
    const formatter = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "CET",
    });

    return formatter.format(date).split("/").reverse().join("-");
}

export function formatBlogDate(date: Date) {
    const optionsEnglish: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "CET",
    };
    return new Intl.DateTimeFormat("en-US", optionsEnglish).format(date);
}

export function getCenteredClasses(centered?: boolean) {
    const defaultCenteredClasses = "text-center desktop:text-left";
    const centeredClasses =
        centered === undefined
            ? defaultCenteredClasses
            : centered
            ? "text-center"
            : "text-left";
    return centeredClasses;
}

export function getRandomNumbers(nrOfNumbers: number, length: number) {
    if (length < nrOfNumbers) {
        nrOfNumbers = length;
    }

    let numbers = [];
    while (numbers.length < nrOfNumbers) {
        var num = Math.floor(Math.random() * length); // generate a random number between 0 and and the provided length - 1
        if (numbers.indexOf(num) === -1) numbers.push(num); // check if the number is unique and then push it
    }
    return numbers;
}

export const NULL_START_DATE = "1970-01-01";
