/**
 * Helper function that converts an object into a URL encoded string of key value pairs.
 * @param data The object which should be converted into the URL encoded key value pair string.
 * @return A URL-encoded key value pair string of the input object.
 */
export const encodeObject = (data: Object): string => {
    const params: string[] = [];
    for (const key in data) {
        if (data.hasOwnProperty(key) && data[key] !== null && data[key] !== undefined) {
            params.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
        }
    }
    return params.join("&");
}