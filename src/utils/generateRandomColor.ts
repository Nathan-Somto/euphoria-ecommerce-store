// function that generates a six digit hex color
export function generateRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}