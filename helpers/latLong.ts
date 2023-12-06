export interface latLongProps {
    numerator: number;
}
export default function ConvertDMSToDD(
    exifdata: latLongProps[],
    GPSRef: string
): number {
    let degrees = 0;
    let minutes = 0;
    let seconds = 0;
    let dd;

    degrees = exifdata[0].numerator;
    minutes = exifdata[1].numerator;
    seconds = exifdata[2].numerator;

    dd = degrees + minutes / 60 + seconds / 3600;
    if (GPSRef == "S" || GPSRef == "W") {
        dd = dd * -1;
    }
    return dd;
}
