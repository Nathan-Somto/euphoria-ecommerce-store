export function pluralize(text:string, len: number){
    return `${text}${len > 1 ? 's': ''}`
}