from PIL import Image
import os

# Créer un nouveau dossier nommé "webp" dans le répertoire actuel
if not os.path.exists('webp'):
    os.makedirs('webp')

# Parcourir tous les fichiers dans le répertoire actuel
for file_name in os.listdir('.'):
    if file_name == 'main.py':
        continue
    try:
        # Ouvrir le fichier avec Pillow
        with Image.open(file_name) as im:
            # Vérifier si l'extension du fichier est .webp, si oui passer au fichier suivant
            if im.format == 'WEBP':
                continue
            # Récupérer le nom du fichier et remplacer l'extension par .webp
            webp_file_name = os.path.splitext(file_name)[0] + '.webp'
            # Enregistrer le fichier en format WebP dans le dossier "webp" avec une qualité de 80%
            webp_file_path = os.path.join('webp', webp_file_name)
            im.save(webp_file_path, 'webp', quality=80)
            print(f"Le fichier {file_name} a été converti en {webp_file_name} ✅")
    except IOError:
        print(f"Impossible de convertir {file_name} ❌")
