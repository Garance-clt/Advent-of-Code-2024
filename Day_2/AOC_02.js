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
        .split("\n") // Divise par ligne
        .map(line => line.trim().split(/\s+/).map(Number)); // Divise par espaces et convertit en nombres

    // Fonction pour vérifier si une ligne est "safe"
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

    console.log(`Nombre de rapports sûrs : ${safeCount}`);
});
