# Minta Services : mintaservices.com

Site principal de **Minta Services**, African Technology Solution (Missira, Ségou, Mali).

Le dossier `site/` contient tout ce qui va dans le dossier du site sur le serveur : la page d'accueil, les styles, le script et les logos de chaque marque.

| Marque | Logo | Adresse | E-mail |
|---|---|---|---|
| Minta Services | `site/assets/logos/minta-services.webp` | mintaservices.com | contact@mintaservices.com |
| Mande-IA | `site/assets/logos/mande-ia.webp` | ia.mintaservices.com | ia@mintaservices.com |
| Minta Academy | `site/assets/logos/minta-academy.webp` | mintaservices.com/academy | academy@mintaservices.com |
| Data-Collections | `site/assets/logos/data-collections.webp` | data.mintaservices.com | data@mintaservices.com |
| Minta Entrepreneurship | `site/assets/logos/entrepreneurship.webp` | mintaservices.com/entrepreneurship.html | entrepreneuriat@mintaservices.com |

Fondateur : Professeur Issa Minta, professorminta@gmail.com.

## Mettre le site en ligne (aaPanel)

Dans le **Terminal** d'aaPanel. La première commande garde une copie des anciennes pages, hors du site.

```bash
cd /www/wwwroot/mintaservices.com
mkdir -p /root/sauvegarde-site && cp -n index.html academy.html paiement.html video.html /root/sauvegarde-site/ 2>/dev/null
cd /www/wwwroot && git clone https://github.com/Professor-minta/minta-services.git minta-services-site
cp -a minta-services-site/site/. /www/wwwroot/mintaservices.com/
```

Seuls `index.html` et le dossier `assets/` sont remplacés ou ajoutés. Le cours `academy/`, `entrepreneurship.html` et les autres fichiers restent en place.

Mettre à jour plus tard :

```bash
cd /www/wwwroot/minta-services-site && git pull && cp -a site/. /www/wwwroot/mintaservices.com/
```

## Ajouter une vidéo YouTube

Dans `site/index.html`, chaque vidéo a un attribut `data-youtube=""`. Mets-y l'identifiant de la vidéo : pour `https://www.youtube.com/watch?v=AbCdEfGhIjK`, c'est `AbCdEfGhIjK`. La vidéo se lance alors dans la page, et ne se charge qu'au clic, pour économiser les données mobiles. Sans identifiant, le bouton ouvre la chaîne YouTube @mintaservices.

## Les e-mails à créer

Dans aaPanel, **Mail Server**, vérifie que ces boîtes existent sur le domaine `mintaservices.com` : `contact`, `academy`, `ia`, `data` et `entrepreneuriat`. Une boîte qui n'existe pas renvoie les messages à l'expéditeur.
