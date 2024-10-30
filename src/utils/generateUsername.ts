export function generateUsername(name: string){
    const [firstName] = name.split(' ');
    // randomize the characters of first name
    const randomIzedFirstName = firstName.split('').sort(() => Math.random() - 0.5).join('');
    // return a random number from 1 - 1000
    return randomIzedFirstName + Math.floor(Math.random() * 1000)
}