<!DOCTYPE html>
<html lang="pt-BR" dir="ltr">
<head>
  <meta charset="utf-8">
  <title>Home</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="canonical" href="https://getbootstrap.com/docs/4.3/examples/sign-in/">
</head>
<body>
  <body>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a class="navbar-brand" href="index.php">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="index.php">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class='nav-item'>
            <a class='nav-link' href='cadastro.php'>Cadastro</a>
          </li>
          <?php
          session_start();
          if((isset ($_SESSION['login'])) && (isset ($_SESSION['senha'])))
          {
            $logado = $_SESSION['login'];
            echo "<li class='nav-item active'>
                    <a class='nav-link' href='#'>$logado</a>
                  </li>
                <form action='logout.php' method='POST'>
                    <button type='submit' class='btn btn-primary' name='sair' value ='TRUE'>Sair</button>
                </form>";
          }else{
            echo "<li class='nav-item'>
                    <a class='nav-link' href='login.php'>Login</a>
                  </li>";
            unset ($_SESSION['login']);
            unset ($_SESSION['senha']);
        }
          ?>
    </td>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>

    <div class="container mt-5">
      <div class="row">
        <div class="col-sm">
        </div>
        <div class="col-sm mt-5 jumbotron">
          <form action="cadastrar.php" method="POST">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" id="email" name="email" placeholder="Seu email" required>
            </div>
            <div class="form-group">
              <label for="nome">nome</label>
              <input type="text" class="form-control" id="nome" name="nome" placeholder="Seu nome" required>
            </div>
            <div class="form-group">
              <label for="senha">Senha</label>
              <input type="password" class="form-control" id="senha" name="senha" placeholder="Senha" required>
            </div>
            <div class="form-group">
              <label for="data_nasc">Data de nascimento</label>
              <input type="date" class="form-control" id="data_nasc" name="data_nasc" placeholder="01/01/1111" required>
            </div>
            <button type="submit" class="btn btn-primary">Enviar</button>
          </form>
        </div>
        <div class="col-sm">
        </div>
      </div>
    </div>

    <footer class="container text-center mt-5">
      <p>© 2019</p>
    </footer>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  </body>
  </html>
