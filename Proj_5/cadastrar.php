<html>
<body>

Bem vindo <?php echo $_GET["nome"]; ?><br>
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
  $nome = $_GET["nome"];
  $senha = sha1($_GET["senha"]);
  $email = $_GET["email"];
  $data_nasc = $_GET["data_nasc"];

  $sql = "INSERT INTO CLIENTES (NOME, EMAIL, SENHA, DATA_NASCIMENTO)
VALUES ('".$nome."', '".$email."', '".$senha."', '".$data_nasc."')";

if ($conn->query($sql) === TRUE) {
    echo "<script>alert('Cadastrado com sucesso!')</script>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

  ?>

</body>
</html>
