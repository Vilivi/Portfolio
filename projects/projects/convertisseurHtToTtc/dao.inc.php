<?php 
function writeInFile($arrayHtToTtc){
    
    define("FILE", "data.txt");
    $header = (file_exists(FILE) ? 
    "" :
        "Création date: " . date ("Y-m-d H:i:s") . "\n");
    $handle = @fopen(FILE, "a");
    if($handle == null){
        exit("Cannot write into: " . FILE);
    } else {
        fwrite ($handle, $header);
        foreach ($arrayHtToTtc as $element) {
            fwrite ($handle, $element);
            fwrite($handle, " ");
        }
        fwrite($handle, "\t");
        fclose($handle);
    }
};
?>