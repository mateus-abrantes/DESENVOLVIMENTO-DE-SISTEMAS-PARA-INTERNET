<?php
  session_start();
  $sair = $_POST['sair'];
  if($sair==TRUE){
    unset ($_SESSION['login']);
    unset ($_SESSION['senha']);
    header('location:index.php');
  }else{
    $sair = FALSE;
  }
?>
