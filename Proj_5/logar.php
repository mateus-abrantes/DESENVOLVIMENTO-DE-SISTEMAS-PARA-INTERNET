<?php
session_start();
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

  $login = $_POST['email'];
  $entrar = $_POST['logar'];
  $senha = md5($_POST['senha']);
    if (isset($entrar)) {
      $verifica = $conn->query("SELECT * FROM USUARIOS WHERE email = '$login' AND SENHA = '$senha'") or die("erro ao selecionar");
      //$row_cnt = $verifica->num_rows
        if (($verifica->num_rows)<=0){
          echo"<script language='javascript' type='text/javascript'>alert('Login e/ou senha incorretos');window.location.href='login.php';</script>";
          unset ($_SESSION['login']);
          unset ($_SESSION['senha']);
          die();
        }else{
          $_SESSION['login'] = $login;
          $_SESSION['senha'] = $senha;
          header('location:index.php');
        }
    }
?>
