import capitalizeFirstLetter from "./capitalizeFirstLetter";

export default function formatEnumToString(enumString: string) {
    return enumString.split("_").map(word => capitalizeFirstLetter(word)).join(" ");
}