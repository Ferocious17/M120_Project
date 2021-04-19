<?php

include_once('../app/model/_header.php');

echo '
<link rel="stylesheet" href="styles/main.css">
<link rel="stylesheet" href="styles/VerbindungSuchen.css">

</head>

<body>
    <header>
        <img class="LogoCircular" src="assets/Logo_Circular.png" alt="Logo">
        <a class="LoginRef" href="../app/view/login.php">Anmelden</a>
    </header>
    
    <main>
        <div id="form">
            <h1>Verbindung suchen</h1>

            <form>
                <div class="row g-2 mb-3">
                  <div class="form-floating col-md">
                    <input type="text" class="form-control" id="fromInput" placeholder="Von">
                    <label for="fromInput">Von</label>
                  </div>
                  <div class="form-floating col-md">
                    <input type="text" class="form-control" id="toInput" placeholder="Nach">
                    <label for="toInput">Nach</label>
                  </div>
                </div>

                <div class="row g-2 mb-3">
                  <div class="form-floating col">
                    <input type="date" class="form-control" id="fromInput">
                    <label for="fromInput">Datum</label>
                  </div>
                  <div class="form-floating col">
                    <input type="time" class="form-control" id="toInput">
                    <label for="toInput">Uhrzeit</label>
                  </div>
                  <button type="submit" class="btn btn-primary">Suchen</button>
                </div>
              </form>
        </div>
    </main>';

include_once('../app/model/_footer.php');

?>