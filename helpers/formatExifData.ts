import { ExifTags, FilteredExifTags } from "@/types";
import ConvertDMSToDD from "./latLong";

export default function formatExifData(exifData: ExifTags): FilteredExifTags {
    const formattedExifData: FilteredExifTags = {} as FilteredExifTags;
    if (exifData?.DateTime) {
        const dateTimeString = exifData.DateTime.replace(/:/g, "-");
        const [datePart, timePart] = dateTimeString.split(" ");
        const [year, month, day] = datePart.split("-");
        const [hours, minutes, seconds] = timePart.split("-");
        const originalDate = new Date(
            parseInt(year, 10),
            parseInt(month, 10) - 1,
            parseInt(day, 10),
            parseInt(hours, 10),
            parseInt(minutes, 10),
            parseInt(seconds, 10)
        );

        formattedExifData["Created"] = originalDate.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
        });

        formattedExifData[
            "Dimensions"
        ] = `${exifData.PixelXDimension} x ${exifData.PixelYDimension}`;

        formattedExifData["Color Space"] =
            exifData.ColorSpace === 1 ? "sRGB" : "Uncalibrated";
        formattedExifData["Device Make"] = exifData.Make;
        formattedExifData["Device Model"] = exifData.Model;
        formattedExifData["Exposure Time"] = `1/${
            exifData.ExposureTime?.denominator /
            exifData.ExposureTime?.numerator
        } sec`;
        formattedExifData["Focal Length"] = `${
            exifData.FocalLength?.numerator / exifData.FocalLength?.denominator
        } mm`;
        formattedExifData["ISO Speed"] = exifData.ISOSpeedRatings;
        formattedExifData["Aperture Value"] = `f${
            exifData.ApertureValue?.numerator /
            exifData.ApertureValue?.denominator
        }`;
        formattedExifData["Flash"] = exifData.Flash;

        const latDetails = ConvertDMSToDD(
            exifData.GPSLatitude,
            exifData.GPSLatitudeRef
        );
        const longDetails = ConvertDMSToDD(
            exifData.GPSLongitude,
            exifData.GPSLongitudeRef
        );

        formattedExifData["Latitude"] = latDetails;
        formattedExifData["Longitude"] = longDetails;
    }
    return formattedExifData;
}
