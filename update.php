<?php
	if(isset($_REQUEST['roomId'])){
		$hash = hash('sha1', $_REQUEST['roomId']);
		$file = $hash.'.txt';
		if($_REQUEST['action'] === 'send'){
			file_put_contents($file, $_REQUEST['arr']);
		}
		if($_REQUEST['action'] === 'get'){
		    print(file_get_contents($file));
		}
	}
	