<?php
	/* $file = fopen("testFile.txt", "w");
	$text = "hello world.\n";
	fwrite($file, $text);
	echo file_get_contents("testFile.txt");
	fclose($file); */
	if(isset($_REQUEST['roomId'])){
		$hash = hash('shal', $_REQUEST['roomId']);
		$file = $hash.'.txt';
		if($_REQUEST['action'] === 'send'){
			file_put_contents($file, $_REQUEST['arr']);
		}
		if($_REQUEST['action'] === 'get'){
		    print(file_get_contents($file));
		}
	}
?>

