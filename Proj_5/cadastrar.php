  <?php
  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "site";

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
  $nome = $_POST["nome"];
  $senha = MD5($_POST["senha"]);
  $email = $_POST["email"];
  $data_nasc = $_POST["data_nasc"];

  $query_select = "SELECT email FROM USUARIOS WHERE email = '$email'";
  $select =$conn->query($query_select);
  $array = $select->fetch_array();
  $logarray = $array['email'];

    if($email == "" || $email == null){
      echo"<script language='javascript' type='text/javascript'>alert('O campo login deve ser preenchido');window.location.href='cadastro.php';</script>";

      }else{
        if($logarray == $email){
          echo"<script language='javascript' type='text/javascript'>alert('Esse login já existe');window.location.href='cadastro.php';</script>";
          die();

        }else{
          $sql = "INSERT INTO USUARIOS (NOME, EMAIL, SENHA, DATA_NASCIMENTO) VALUES ('".$nome."', '".$email."', '".$senha."', '".$data_nasc."')";
          $insert = $conn->query($sql);

          if($insert){
            echo"<script language='javascript' type='text/javascript'>alert('Usuário cadastrado com sucesso!');window.location.href='cadastro.php'</script>";
          }else{
            echo"<script language='javascript' type='text/javascript'>alert('Não foi possível cadastrar esse usuário');window.location.href='cadastro.php'</script>";
          }
        }
      }
      $conn->close();
  ?>
