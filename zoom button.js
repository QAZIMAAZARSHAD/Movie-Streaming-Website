<!DOCTYPE html>
<html>

<head>
	<title>
		How to zoom-in and zoom-out
		image using JavaScript.
	</title>
	
	<script src=
"https://code.jquery.com/jquery-1.12.4.min.js">
	</script>
</head>

<body style="text-align:center;">
	
	<h1 style = "color:green;" >
		GeeksForGeeks
	</h1>
	<hr>
	
	<div class="box">
		
		<img src=
"https://media.geeksforgeeks.org/wp-content/uploads/20190912174307/qwe1.png"
			id="geeks" GFG="250" alt="Geeksforgeeks">
	</div>
	<hr>
	
	<button type="button" onclick="zoomin()">
		Zoom-In
	</button>
	
	<button type="button" onclick="zoomout()">
		Zoom-Out
	</button>
	
	<script type="text/javascript">
		function zoomin() {
			var GFG = document.getElementById("geeks");
			var currWidth = GFG.clientWidth;
			GFG.style.width = (currWidth + 100) + "px";
		}
		
		function zoomout() {
			var GFG = document.getElementById("geeks");
			var currWidth = GFG.clientWidth;
			GFG.style.width = (currWidth - 100) + "px";
		}
	</script>
</body>

</html>		