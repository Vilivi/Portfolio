<?php

function render ($ht, $ttc) {
    $render = <<<EOD
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="utf-8">
        <title>PHP Adrar34 TD1 </title>
        <link rel="stylesheet" href="css/style.css">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Imbue:wght@300&display=swap" rel="stylesheet"> 
    </head>
    <body>
        <header>
            <h1>Convertisseur</h1>
        </header>
        <main>
            <div>
                <p>Pour un montant hors taxe de $ht euros, le total est de $ttc TVA comprise.</p>
            </div>
        </main>
    </body>
    </html>
    EOD;
    return $render;
}

?>