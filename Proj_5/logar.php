<html>
<body>
Tome cuidado, agora sei seu e-mail: <?php echo $_GET["email"]; ?>
  <?php
  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "teste";

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "<br>Sistema conectado ao sgbd";
  $email = $_GET["email"];
  $senha = sha1($_GET["senha"]);

  $sql = "SELECT EMAIL,SENHA FROM CLIENTES WHERE EMAIL='$email' AND SENHA='$senha';";
if ($conn->query($sql) === TRUE) {
    echo "<script>alert('Cliente encontrado!')</script>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

  ?>

</body>
</html>
