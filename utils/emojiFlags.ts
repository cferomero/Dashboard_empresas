// Validar y generar emojis por cada pais
export const EmojiFlags = (countryCode: string): string => {
    // Verificamos que el codigo ISO del pais sea de 2
    if(countryCode.length !== 2) {
        return '';
    }

    // Convertimos la letra añ emoji correspondiente
    const codePoint = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));

    
    return String.fromCodePoint(...codePoint);
}