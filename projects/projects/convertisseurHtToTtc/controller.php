<?php

require 'model.inc.php';
require 'view.inc.php';
require 'dao.inc.php';

function checkInputValues() {
    return (isset($_POST["ht"]) && is_numeric($_POST["ht"]));
}

if (!checkInputValues()){
    exit("Error in Form");
} else {
    $ht = $_POST["ht"];          // get input data
    $ttc = htToTtc($ht);       // compute (uses Model)
    echo render($ht, $ttc);    // display (uses View)
    writeInFile([$ht => $ttc]);
}


exit();
?>



