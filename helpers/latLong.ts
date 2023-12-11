function convertDMSToDecimal(
    degrees: number,
    minutes: number,
    seconds: number
) {
    return degrees + minutes / 60 + seconds / 3600;
}

interface NumeratorDenominator {
    numerator: number;
    denominator: number;
}

type LatLongArray = NumeratorDenominator[];

type LatitudeRef = string;
type LongitudeRef = string;

export default function getActualLatLong(
    latitudeArray: LatLongArray,
    latitudeRef: LatitudeRef,
    longitudeArray: LatLongArray,
    longitudeRef: LongitudeRef
): { latitude: string; longitude: string } | string {
    if (latitudeArray || longitudeArray) {
        const latitude = convertDMSToDecimal(
            latitudeArray[0]?.numerator / latitudeArray[0]?.denominator,
            latitudeArray[1]?.numerator / latitudeArray[1]?.denominator,
            latitudeArray[2]?.numerator / latitudeArray[2]?.denominator
        );
        const longitude = convertDMSToDecimal(
            longitudeArray[0]?.numerator / longitudeArray[0]?.denominator,
            longitudeArray[1]?.numerator / longitudeArray[1]?.denominator,
            longitudeArray[2]?.numerator / longitudeArray[2]?.denominator
        );
        const finalLatitude = latitudeRef === "S" ? -latitude : latitude;
        const finalLongitude = longitudeRef === "W" ? -longitude : longitude;
        return {
            latitude: `${finalLatitude.toFixed(6)}°`,
            longitude: `${finalLongitude.toFixed(6)}°`,
        };
    } else {
        return "n/A";
    }
}
// https://www.google.com/maps?q=37.819722,-122.478611
