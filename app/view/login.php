<?php

include_once('../model/_header.php');

echo '

<link rel="stylesheet" href="../../public/styles/Anmelden.css">

</head>

<body>
    <header>
        <img class="LogoCircular" src="../../public/assets/Logo_Circular.png" alt="Logo">
    </header>
    
    <main>
        <div id="form">
            <h1>Anmelden</h1>

            <form>
                <div class="row g-2 mb-3">
                  <div class="form-floating col-md">
                    <input type="email" class="form-control" id="emailInput" placeholder="E-Mail">
                    <label for="fromInput">E-Mail</label>
                  </div>
                </div>
                <div class="row g-2 mb-3">
                  <div class="form-floating col-md">
                    <input type="password" class="form-control" id="passwordInput" placeholder="Passwort">
                    <label for="toInput">Passwort</label>
                  </div>
                  
                  <button type="submit" class="btn btn-primary">Anmelden</button>
                </div>
              </form>
        </div>
    </main>';

    include_once('../model/_footer.php');

?>