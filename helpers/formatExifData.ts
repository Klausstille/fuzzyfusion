import { ExifTags, FilteredExifTags } from "@/types";

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
        formattedExifData["Created"] = formatDateTime(
            exifData.DateTime.description
        );
        formattedExifData["Dimensions"] = exifData.PixelXDimension.description
            ? `${exifData.PixelXDimension.description} x ${
                  exifData.PixelYDimension.description || "n/A"
              }`
            : "n/A";
        formattedExifData["Color Space"] =
            exifData.ColorSpace.description || "n/A";
        formattedExifData["Device Make"] = exifData.Make.description || "n/A";
        formattedExifData["Device Model"] = exifData.Model.description || "n/A";
        formattedExifData["Exposure Time"] = exifData.ExposureTime.description
            ? `${exifData.ExposureTime.description} sec`
            : "n/A";
        formattedExifData["Exposure Prgm."] =
            exifData.ExposureProgram.description || "n/A";
        formattedExifData["Focal Length"] = exifData.FocalLength
            ? `${exifData.FocalLength.description}`
            : "n/A";
        formattedExifData["ISO Speed"] =
            exifData.ISOSpeedRatings.description || "n/A";
        formattedExifData["Aperture Value"] = exifData.ApertureValue
            ? `f${exifData.ApertureValue.description}`
            : "n/A";
        formattedExifData["Flash"] = exifData.Flash.description || "n/A";
        formattedExifData["White Balance"] =
            exifData.WhiteBalance.description || "n/A";
        formattedExifData["Scene Type"] =
            exifData.SceneCaptureType.description || "n/A";
        formattedExifData["Orientation"] = exifData.Orientation
            ? exifData.Orientation.value === 6 ||
              exifData.Orientation.value === 8
                ? "Portrait"
                : "Landscape"
            : "n/A";
        formattedExifData["Latitude"] = exifData.GPSLatitude
            ? `${exifData.GPSLatitude.description.toFixed(6)}°`
            : "n/A";
        formattedExifData["Longitude"] = exifData.GPSLongitude
            ? `${exifData.GPSLongitude.description.toFixed(6)}°`
            : "n/A";
    }

    return formattedExifData;
}
