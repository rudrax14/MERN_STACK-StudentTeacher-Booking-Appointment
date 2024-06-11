export default function capitalizeName(name) {
    // Split the name into an array of words
    const words = name.split(' ');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

    // Join the capitalized words back into a single string
    return capitalizedWords.join(' ');
}