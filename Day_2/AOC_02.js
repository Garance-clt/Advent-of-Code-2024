const fs = require('fs'); // Import du module fs

// Lire le fichier
fs.readFile('AOC_ENTRY.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Erreur lors de la lecture du fichier :", err);
        return;
    }

    // Convertir les données en tableau de lignes
    const levels = data
        .trim()
        .split("\n") 
        .map(line => line.trim().split(/\s+/).map(Number)); 

    const isSafe = (line) => {
        let isAscending = true;
        let isDescending = true;

        for (let i = 0; i < line.length - 1; i++) {
            const diff = line[i + 1] - line[i];

            if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
                return false;
            }

            if (diff < 0) isAscending = false;
            if (diff > 0) isDescending = false;
        }

        return isAscending || isDescending;
    };

    const safeCount = levels.filter(isSafe).length;


    //partie 2
    const canBeMadeSafe = (line) => {
        for (let i = 0; i < line.length; i++) {
            const newLine = line.slice(0, i).concat(line.slice(i + 1));
            if (isSafe(newLine)) {
                return true;
            }
        }
        return false;
    };

    let safeCount2 = 0; 
    levels.forEach(line => {
        if (isSafe(line) || canBeMadeSafe(line)) {
            safeCount2++;
        }
    });

    console.log(`Nombre de rapports sûrs avec le Problem Dampener : ${safeCount2}`);
});
