<?php
function htToTtc($ht) {
    define ("TVA", 0.2);    // constant declaration
    return $ht*(1+TVA);
}
?>