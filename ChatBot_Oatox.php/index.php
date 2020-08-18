<!DOCTYPE html>
<html>
<head>
	<title>Chatbot</title>
	<link rel="stylesheet" type="text/css" href="style.css">
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="fontawesome/css/all.css">
</head>
<body>

	<div class="container">
		<div class="chat">
		<div class="msg">
			<img src="assets/google.png">
			<h3>Bienvenue sur le chatbot !</h2>
		</div>
		<?php


			ini_set('display_errors','off');



			$question = $_GET['question'];

			$url = file_get_contents('http://103.best:5005/api/v2/ask?question='.$question);

			$parse = json_decode($url, true);
			//var_dump($parse);


			foreach($parse as $result) {

				if (substr( $parse['answer'], 0, 4 ) === "http"){
					$tags = file_get_contents('http://api.linkpreview.net/?key=09a789755ce1bfb5a43fe386a7fe3d9a&q='.$parse["answer"]);

					$parsee = json_decode($tags, true);

					if(isset($parsee)){

						echo '<div class="msg">
						<img src="assets/google.png">
						<a href="'.$parse['answer'].'" target="_blank"><h3>'.$parse['answer'].'</h3></a>
						<p>Titre : '.$parsee['title'].'</p>
						</div>';
					}else{
						echo '<div class="msg">
						<img src="assets/google.png">
						<a href="'.$parse['answer'].'" target="_blank"><h3>'.$parse['answer'].'</h3></a>
						</div>';
					}
				} else{
				echo '<div class="msg">
					<img src="assets/google.png">
					<h3>'.$parse['answer'].'</h3>
				</div>';
				//echo "<h2>".$parse['answer']."</h2>";
				}
			}

		?>
		<div class="form">
			<form method="get">
				<input type="text" name="question" placeholder="Question" required>
				<button type="submit"><i class="far fa-paper-plane 15px"></i></button>
			</form>
		</div>
	</div>

</body>
</html>