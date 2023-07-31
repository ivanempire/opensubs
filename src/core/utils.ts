export const encodeObject = (data: Object): string => {
    const params: string[] = [];
    for (const key in data) {
        if (data.hasOwnProperty(key) && data[key] !== null && data[key] !== undefined) {
            params.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
        }
    }
    return params.join("&");
}