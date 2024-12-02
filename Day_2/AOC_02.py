def is_safe(line):
    is_ascending = True
    is_descending = True

    # Parcourt chaque élément de la ligne sauf le dernier
    for i in range(len(line) - 1):
        diff = line[i + 1] - line[i]

        if abs(diff) < 1 or abs(diff) > 3:
            return False

        if diff < 0:
            is_ascending = False

        if diff > 0:
            is_descending = False

    return is_ascending or is_descending


# Vérifie si une ligne peut devenir "safe" en supprimant un seul élément
def can_be_made_safe(line):
    # Teste chaque élément en l'enlevant de la ligne
    for i in range(len(line)):
        # Crée une nouvelle ligne sans l'élément à la position i
        new_line = line[:i] + line[i + 1:]

        if is_safe(new_line):
            return True 

    return False 


# Ouvre le fichier en mode lecture
with open("AOC_ENTRY.txt", "r") as file:
    data = file.read()

lines = []

for line in data.strip().split("\n"):
    # Divise chaque ligne en nombres et les convertit en entiers
    if line.strip(): 
        numbers = list(map(int, line.strip().split()))
        lines.append(numbers)

safe_count = 0

# Parcourt chaque ligne pour vérifier si elle est "safe"
for line in lines:
    if is_safe(line): 
        safe_count += 1
    elif can_be_made_safe(line):
        safe_count += 1

print("Nombre de rapports sûrs:", safe_count)
