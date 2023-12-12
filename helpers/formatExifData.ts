import { ExifTags, FilteredExifTags } from "@/types";
import getActualLatLong from "./latLong";

interface DateTimeParts {
    year: string;
    month: string;
    day: string;
    hours: string;
    minutes: string;
}

function parseDateTime(dateTime: string): DateTimeParts {
    const dateTimeString = dateTime.replace(/:/g, "-");
    const [datePart, timePart] = dateTimeString.split(" ");
    const [year, month, day] = datePart.split("-");
    const [hours, minutes] = timePart.split("-");
    return { year, month, day, hours, minutes };
}

function formatDateTime(dateTime: string): string {
    const { year, month, day, hours, minutes } = parseDateTime(dateTime);
    const originalDate = new Date(
        parseInt(year, 10),
        parseInt(month, 10) - 1,
        parseInt(day, 10),
        parseInt(hours, 10),
        parseInt(minutes, 10)
    );

    return originalDate
        .toLocaleString("en-GB", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        })
        .toUpperCase();
}

export default function formatExifData(exifData: ExifTags): FilteredExifTags {
    const formattedExifData: any = {} as FilteredExifTags;

    if (exifData?.DateTime) {
        formattedExifData["Created"] = formatDateTime(exifData.DateTime);
        formattedExifData["Dimensions"] = exifData.PixelXDimension
            ? `${exifData.PixelXDimension} x ${
                  exifData.PixelYDimension || "n/A"
              }`
            : "n/A";
        formattedExifData["Color Space"] =
            exifData.ColorSpace === 1 ? "sRGB" : "Uncalibrated";
        formattedExifData["Device Make"] = exifData.Make || "n/A";
        formattedExifData["Device Model"] = exifData.Model || "n/A";
        formattedExifData["Exposure Time"] = exifData.ExposureTime
            ? `1/${
                  exifData.ExposureTime.denominator /
                  exifData.ExposureTime.numerator
              } sec`
            : "n/A";
        formattedExifData["Exposure Prgm."] = exifData.ExposureProgram || "n/A";
        formattedExifData["Focal Length"] = exifData.FocalLength
            ? `${
                  exifData.FocalLength.numerator /
                  exifData.FocalLength.denominator
              } mm`
            : "n/A";
        formattedExifData["ISO Speed"] = exifData.ISOSpeedRatings || "n/A";
        formattedExifData["Aperture Value"] = exifData.ApertureValue
            ? `f${
                  exifData.ApertureValue.numerator /
                  exifData.ApertureValue.denominator
              }`
            : "n/A";
        formattedExifData["Flash"] = exifData.Flash || "n/A";
        formattedExifData["White Balance"] = exifData.WhiteBalance || "n/A";
        formattedExifData["Scene Type"] = exifData.SceneCaptureType || "n/A";

        const { latitude, longitude } = getActualLatLong(
            exifData.GPSLatitude,
            exifData.GPSLatitudeRef,
            exifData.GPSLongitude,
            exifData.GPSLongitudeRef
        ) as { latitude: string; longitude: string };

        formattedExifData["Orientation"] = exifData.thumbnail.Orientation
            ? exifData.thumbnail.Orientation === 6 ||
              exifData.thumbnail.Orientation === 8
                ? "Portrait"
                : "Landscape"
            : "n/A";
        formattedExifData["Latitude"] = latitude || "n/A";
        formattedExifData["Longitude"] = longitude || "n/A";
    }

    return formattedExifData;
}
