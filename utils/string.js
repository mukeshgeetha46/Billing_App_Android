export function capitalizeFirstLetter(string) {
    if (typeof string !== 'string' || string.length === 0) {
        return ''; // Handle empty or non-string inputs gracefully
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}