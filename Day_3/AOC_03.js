const fs = require('fs');

// Lire le fichier
fs.readFile('AOC_ENTRY.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Erreur lors de la lecture du fichier :", err);
        return;
    }

    // Étape 1 : Somme des multiplications sans conditions
    const mulRegex = /mul\((\d+),(\d+)\)/g; 
    const matches = [...data.matchAll(mulRegex)]; 
    console.log(matches)

    let totalSum = matches.reduce((sum, match) => {
        const a = parseInt(match[1], 10);
        const b = parseInt(match[2], 10);
        return sum + a * b;
    }, 0);

    console.log("Étape 1 : Somme des multiplications (sans conditions) :", totalSum);

    // Étape 2 
    const doRegex = /do\(\)/; 
    const dontRegex = /don't\(\)/; 

    let enabled = true; // Les instructions de multiplactions sont activées par défaut
    let conditionalSum = 0;

    const instructions = data.split(/(?<=\))|(?=do\(\)|don't\(\))/); 

    instructions.forEach(instruction => {
        if (doRegex.test(instruction)) {
            enabled = true; 
        } else if (dontRegex.test(instruction)) {
            enabled = false;
        } else {
            // Vérifier les instructions `mul` uniquement si activées
            let match;
            while ((match = mulRegex.exec(instruction)) !== null) {
                const a = parseInt(match[1], 10);
                const b = parseInt(match[2], 10);
                if (enabled) {
                    conditionalSum += a * b; 
                }
            }
        }
    });

    console.log("Étape 2 : Somme des multiplications (avec conditions) :", conditionalSum);
});
