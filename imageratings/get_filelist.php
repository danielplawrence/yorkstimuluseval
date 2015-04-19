<?php
$dir    = 'images/Candidates';
$files1 = scandir($dir);

print_r(json_encode($files1));
?>